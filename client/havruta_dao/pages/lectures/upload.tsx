import React, { useState, useEffect } from 'react';
import { CloudUploadOutlined, CodepenOutlined, EyeOutlined } from '@ant-design/icons';
import {
  PageHeader,
  Input,
  Button,
  Form,
  Row,
  Col,
  Space,
  InputNumber,
  Result,
  Typography,
  Image,
} from 'antd';
import axios from 'axios';
import * as Sentry from '@sentry/react';
import { useRecoilState } from 'recoil';
import { loginInfoState } from '../../states/loginInfoState';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import ReactPlayer from 'react-player';
import { noti } from '../../lib/notification';
import UploadNotiModal from '../../components/lectures/UploadNotiModal';
import TransferERC20Token from '../../lib/klaytn/transfer';

const { TextArea } = Input;
const { Paragraph, Title } = Typography;

export default function Upload() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoState);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [lecture, setLecture] = useState({
    user_id: loginInfo.user_id,
    lecture_title: '',
    lecture_summary: '',
    lecture_introduction: '',
    instructor_introduction: '',
    lecture_url: '',
    lecture_image: '',
    lecture_price: 0,
  });

  let uploadTokenPrice = 10;

  const onUpload = () => {
    TransferERC20Token(
      loginInfo.user_address,
      process.env.NEXT_PUBLIC_HADATOKEN,
      uploadTokenPrice,
      () => saveUploadToDB(),
      () => {
        setIsLoading(false);
        cancelUploadOnWallet();
      }
    );
  };

  const saveUploadToDB = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_ENDPOINT}/lecture`, { lecture })
      .then((res) => {
        if (res.status === 201) {
          setIsLoading(false);
          noti('success', '지식 공유에 성공하였습니다.', '지식을 공유해주셔서 감사드립니다!');
          router.push(`/lectures`);
        }
      })
      .catch((err) => {
        Sentry.captureException(err);
      });
  };

  const cancelUploadOnWallet = () => {
    noti('error', '강의 등록이 실패되었습니다.');
  };

  useEffect(() => {
    if (lecture.lecture_title) {
      onUpload();
    }
  }, [lecture]);

  const changeValue = (values: UploadLecture) => {
    setLecture(() => {
      return {
        user_id: loginInfo.user_id,
        lecture_title: values.lecture_title,
        lecture_summary: values.lecture_summary,
        lecture_introduction: values.lecture_introduction,
        instructor_introduction: values.instructor_introduction,
        lecture_url: values.lecture_url,
        lecture_image: values.lecture_image,
        lecture_price: values.lecture_price,
      };
    });
  };

  const onFinish = (values: UploadLecture) => {
    setIsLoading(true);
    changeValue(values);
  };

  const [form] = Form.useForm();
  const lecture_title = Form.useWatch('lecture_title', form);
  const lecture_summary = Form.useWatch('lecture_summary', form);
  const lecture_url = Form.useWatch('lecture_url', form);
  const lecture_image = Form.useWatch('lecture_image', form);
  const lecture_introduction = Form.useWatch('lecture_introduction', form);
  const instructor_introduction = Form.useWatch('instructor_introduction', form);
  if (String(lecture_url).includes('you')) {
    let imgUrl = '';
    let symbol = lecture_url.split('/');
    if (symbol[2] === 'youtu.be') {
      imgUrl = `http://img.youtube.com/vi/${symbol[3]}/maxresdefault.jpg`;
    } else if (symbol[2] === 'www.youtube.com') {
      symbol = symbol[3].split('=');
      imgUrl = `http://img.youtube.com/vi/${symbol[1]}/maxresdefault.jpg`;
    }
    form.setFieldsValue({
      lecture_image: imgUrl,
    });
  }

  return (
    <>
      {isModalOpen && session && <UploadNotiModal setIsModalOpen={setIsModalOpen} />}
      {session ? (
        <Row>
          <Col xl={12} xs={24}>
            <Space>
              <PageHeader onBack={() => {}} backIcon={<CloudUploadOutlined />} title="지식 공유" />
            </Space>

            <Form layout="vertical" onFinish={onFinish} form={form}>
              <Form.Item
                name="lecture_title"
                label="강의 제목"
                hasFeedback
                rules={[
                  { required: true, message: '강의 제목은 필수 입력 사항입니다!' },
                  { type: 'string', min: 6, message: '최소 6자 이상 입력해야합니다!' },
                ]}
              >
                <Input size="large" placeholder="강의 제목을 입력해주세요.." />
              </Form.Item>

              <Form.Item
                name="lecture_summary"
                label="강의 요약"
                hasFeedback
                rules={[
                  { required: true, message: '강의 요약은 필수 입력 사항입니다!' },
                  { type: 'string', min: 10, message: '최소 10자 이상 입력해야합니다!' },
                ]}
              >
                <Input size="large" placeholder="강의 요약을 입력해주세요.." />
              </Form.Item>

              <Form.Item
                name="lecture_url"
                label="강의 유튜브 URL"
                hasFeedback
                rules={[
                  { required: true, message: '강의 유튜브 URL은 필수 입력 사항입니다!' },
                  { type: 'url', warningOnly: true, message: 'URL 형식으로 입력해주세요!' },
                  { type: 'string', min: 6, message: '최소 6자 이상 입력해야합니다!' },
                ]}
              >
                <Input size="large" placeholder="강의 동영상 URL을 입력해주세요.." />
              </Form.Item>

              <Form.Item
                name="lecture_image"
                label="대표 이미지 업로드"
                hasFeedback
                rules={[
                  { required: true, message: '강의 이미지 URL은 필수 입력 사항입니다!' },
                  { type: 'url', warningOnly: true, message: 'URL 형식으로 입력해주세요!' },
                  { type: 'string', min: 6, message: '최소 6자 이상 입력해야합니다!' },
                ]}
              >
                <Input size="large" placeholder="대표 이미지를 업로드해주세요.." />
              </Form.Item>

              <Form.Item
                name="lecture_price"
                label="강의 가격"
                rules={[
                  { required: true, message: '강의 가격은 필수 입력 사항입니다!' },
                  { type: 'number', warningOnly: true, message: '숫자만 입력 가능 합니다!' },
                ]}
              >
                <InputNumber
                  size="large"
                  placeholder="강의 가격을 입력해주세요.."
                  value={0}
                  min={0}
                  addonBefore={<CodepenOutlined style={{ fontSize: '24px', color: '#bae637' }} />}
                />
              </Form.Item>

              <Form.Item
                name="lecture_introduction"
                label="강의 상세 소개"
                hasFeedback
                rules={[
                  { required: true, message: '강의 상세 소개는 필수 입력 사항입니다!' },
                  { type: 'string', min: 30, message: '최소 30자 이상 입력해야합니다!' },
                ]}
              >
                <TextArea
                  rows={6}
                  placeholder="강의 소개를 입력해주세요.."
                  size="large"
                  style={{ whiteSpace: 'pre-line' }}
                />
              </Form.Item>

              <Form.Item
                name="instructor_introduction"
                label="강사 소개"
                hasFeedback
                rules={[
                  { required: true, message: '강의 소개는 필수 입력 사항입니다!' },
                  { type: 'string', min: 30, message: '최소 30자 이상 입력해야합니다!' },
                ]}
              >
                <TextArea
                  rows={5}
                  placeholder="강사 소개를 입력해주세요.."
                  size="large"
                  style={{ whiteSpace: 'pre-line' }}
                />
              </Form.Item>

              {isLoading ? (
                <Button type="primary" block size={'large'} style={{ width: '100%' }} loading>
                  <span>강의 업로드 중..</span>
                </Button>
              ) : (
                <Button
                  type="primary"
                  block
                  size={'large'}
                  style={{ width: '100%' }}
                  htmlType="submit"
                >
                  <span>
                    강의 업로드하기&nbsp;
                    <CodepenOutlined />
                    &nbsp; {uploadTokenPrice}
                  </span>
                </Button>
              )}
            </Form>
          </Col>
          <Col xl={12} xs={0}>
            <Space style={{ width: '100%' }}>
              <PageHeader onBack={() => {}} backIcon={<EyeOutlined />} title="미리보기" />
            </Space>
            <Space style={{ width: '100%', padding: '30px' }} direction="vertical">
              <Title level={2}>{lecture_title}</Title>
              <Paragraph>{lecture_summary}</Paragraph>
              {lecture_url && (
                <ReactPlayer
                  className="react-player"
                  url={lecture_url}
                  controls={true}
                  width={'100%'}
                  height={'300px'}
                />
              )}
              {lecture_image && <Image width={200} src={lecture_image} alt={'previewImg'} />}
              {lecture_introduction && (
                <TextArea
                  rows={5}
                  placeholder="강사 소개를 입력해주세요.."
                  size="large"
                  style={{ whiteSpace: 'pre-line' }}
                  value={lecture_introduction}
                />
              )}
              {instructor_introduction && (
                <TextArea
                  rows={6}
                  placeholder="강의 소개를 입력해주세요.."
                  size="large"
                  style={{ whiteSpace: 'pre-line' }}
                  value={instructor_introduction}
                />
              )}
            </Space>
          </Col>
        </Row>
      ) : (
        <Space style={{ width: '100%', justifyContent: 'center', height: '100vh' }}>
          <Result
            status="403"
            title="403"
            subTitle="이 페이지에 접근할 권한이 없습니다."
            extra={
              <Button type="primary" onClick={() => router.push('/')}>
                홈으로
              </Button>
            }
          />
        </Space>
      )}
    </>
  );
}
