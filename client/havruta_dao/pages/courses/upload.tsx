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
  notification,
  Result,
  Modal,
  Typography,
  Card,
  Image,
} from 'antd';
import axios from 'axios';
import * as Sentry from '@sentry/react';
import { useRecoilState } from 'recoil';
import { loginInfoState } from '../../states/loginInfoState';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import ReactPlayer from 'react-player';

interface UploadCourse {
  user_id: number;
  lecture_title: string;
  lecture_summary: string;
  lecture_introduction: string;
  instructor_introduction: string;
  lecture_url: string;
  lecture_image: string;
  lecture_price: number;
}
const { TextArea } = Input;
const { Paragraph, Title, Text } = Typography;

export default function Upload() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoState);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [course, setCourse] = useState({
    user_id: loginInfo.user_id,
    lecture_title: '',
    lecture_summary: '',
    lecture_introduction: '',
    instructor_introduction: '',
    lecture_url: '',
    lecture_image: '',
    lecture_price: 0,
  });

  const onUpload = () => {
    const walletState = window.klaytn.publicConfigStore.getState();
    if (walletState.isUnlocked === false) {
      setIsLoading(false);
      window.klaytn.enable();
      return notification['info']({
        message: '지갑이 잠겨있습니다.',
        description: '강의를 생성하시려면 먼저 지갑의 잠금을 해제해주세요.',
      });
    }

    const data = window.caver.klay.abi.encodeFunctionCall(
      {
        name: 'transfer',
        type: 'function',
        inputs: [
          {
            type: 'address',
            name: 'recipient',
          },
          {
            type: 'uint256',
            name: 'amount',
          },
        ],
      },
      [
        process.env.NEXT_PUBLIC_HADATOKEN,
        window.caver.utils
          .toBN(50)
          .mul(window.caver.utils.toBN(Number(`1e18`)))
          .toString(),
      ]
    );

    window.caver.klay
      .sendTransaction({
        type: 'SMART_CONTRACT_EXECUTION',
        from: window.klaytn?.selectedAddress,
        to: process.env.NEXT_PUBLIC_HADATOKEN,
        data,
        gas: '3000000',
      })
      .on('transactionHash', (transactionHash: any) => {
        console.log('txHash', transactionHash);
      })
      .on('receipt', (receipt: any) => {
        console.log('receipt', receipt);
        saveUploadToDB();
      })
      .on('error', (error: any) => {
        setIsLoading(false);
        console.log('error', error.message);
        Sentry.captureException(error.message);
        cancelUploadOnWallet();
      });
  };

  const saveUploadToDB = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_ENDPOINT}/lecture`, { course })
      .then((res) => {
        if (res.status === 201) {
          setIsLoading(false);
          notification['success']({
            message: '지식 공유에 성공하였습니다.',
            description: '지식을 공유해주셔서 감사드립니다!',
          });
          router.push(`/courses`);
        }
      })
      .catch((err) => {
        Sentry.captureException(err);
      });
  };

  const cancelUploadOnWallet = () => {
    notification['error']({
      message: '강의 등록이 실패되었습니다.',
    });
  };

  useEffect(() => {
    if (course.lecture_title) {
      onUpload();
    }
  }, [course]);

  const changeValue = (values: UploadCourse) => {
    setCourse(() => {
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

  const onFinish = (values: UploadCourse) => {
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
      {isModalOpen && session && (
        <Modal
          visible={true}
          onCancel={() => setIsModalOpen(false)}
          footer={
            <Button
              type="primary"
              size="large"
              style={{ width: '100%' }}
              onClick={() => setIsModalOpen(false)}
            >
              확인했습니다 😀
            </Button>
          }
        >
          <Title level={4}>
            안녕하세요.
            <br />
            <Text underline>지식공유에 동참해 주셔서 감사합니다!</Text> <br />
            하브루타DAO의 이야기를 들어주세요!
          </Title>
          <Title level={5}>1. 하브루타DAO는 성장기회의 평등을 추구합니다.</Title>
          <Paragraph style={{ fontSize: '16px' }}>
            우리는 때로 무언가를 배워야만 합니다.
            <br /> 하지만 여러 이유로 당연하다고 생각되어 지는것들이 누군가에게는 사치가 되기도
            합니다.
            <br /> 하브루타DAO는 누구나, 경제적으로 시간적 제약없이 내가 원하는 것을 배우고, 지식을
            나눌 수 있는 공간입니다.
          </Paragraph>
          <Title level={5}>2. 전문 지식으로 수익이 가능한 유일한 곳.</Title>
          <Paragraph style={{ fontSize: '16px' }}>
            하브루타DAO는 기술 강의, 멘토링으로 의미 있는 보상을 가질 수 있는 유일한 플랫폼 입니다.
            수강생이 강의를 신청할 때마다 수익을 얻을 수 있어요!
            <br /> 지속가능한 수익과 명예를 가져가세요 :)
          </Paragraph>
          <Title level={5}>3. 하브루타DAO는 100% 의 비율의 높은 수익을 제공합니다.</Title>
          <Paragraph style={{ fontSize: '16px' }}>
            좋은 지식은 합당한 보상에서 나온다고 하브루타DAO는 생각합니다. 때문에 하브루타DAO는 다른
            학습 서비스에 비해 월등히 높은 수익을 드리고 있어요.
            <br /> 실제로 하브루타DAO엔 꾸준히 월 수백 ~ 수천 토큰 이상의 수익을 가져가는 많은
            지식공유자들이 계셔요.
          </Paragraph>
          <Title level={5}>4. 하브루타DAO의 강의는 지식공유자가 자유롭게 운영할 수 있습니다.</Title>
          <Paragraph style={{ fontSize: '16px' }}>
            강의에 필요한 토큰 설정 등 지식공유자는 자신의 강의를 자유롭게 운영할 수 있습니다.
            학습자들과 소식을 공유하고 자유롭게 운영해 주세요.
          </Paragraph>
        </Modal>
      )}
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
                    &nbsp; 50
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
              {/* eslint-disable-next-line jsx-a11y/alt-text*/}
              {lecture_image && <Image width={200} src={lecture_image} />}
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
