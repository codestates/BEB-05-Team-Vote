import React, { useState, useEffect } from 'react';
import { CloudUploadOutlined, CodepenOutlined } from '@ant-design/icons';
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
} from 'antd';
import axios from 'axios';
import * as Sentry from '@sentry/react';
import { useRecoilState } from 'recoil';
import { loginInfoState } from '../../states/loginInfoState';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

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

export default function Upload() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoState);
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
  const videoUrl = Form.useWatch('lecture_url', form);
  if (String(videoUrl).includes('you')) {
    let imgUrl = '';
    let symbol = videoUrl.split('/');
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
      {session ? (
        <Row>
          <Col span={12}>
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
                <TextArea rows={6} placeholder="강의 소개를 입력해주세요.." size="large" />
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
                <TextArea rows={5} placeholder="강사 소개를 입력해주세요.." size="large" />
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
