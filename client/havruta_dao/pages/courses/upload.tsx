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

export default function upload() {
  const router = useRouter();
  const [isLoding, setIsLoding] = useState(false);
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

  useEffect(() => {
    console.log(course);
    if (course.lecture_title) {
      axios
        .post(`${process.env.NEXT_PUBLIC_ENDPOINT}/lecture`, { course })
        .then((res) => {
          if (res.status === 201) {
            setIsLoding(false);
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
    setIsLoding(true);
    changeValue(values);
  };
  return (
    <>
      {loginInfo.user_id ? (
        <Row>
          <Col span={12}>
            <Space>
              <CloudUploadOutlined style={{ fontSize: '24px' }} />
              <PageHeader style={{ paddingLeft: 0 }} title="지식 공유" />
            </Space>

            <Form layout="vertical" onFinish={onFinish}>
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
                name="lecture_image"
                label="대표 이미지 업로드"
                hasFeedback
                rules={[
                  { required: true, message: '강의 유튜브 URL은 필수 입력 사항입니다!' },
                  { type: 'url', warningOnly: true, message: 'URL 형식으로 입력해주세요!' },
                  { type: 'string', min: 6, message: '최소 6자 이상 입력해야합니다!' },
                ]}
              >
                <Input size="large" placeholder="대표 이미지를 업로드해주세요.." />
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
                  addonBefore={<CodepenOutlined style={{ fontSize: '24px', color: '#9b4dea' }} />}
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

              <Form.Item name="submitButton">
                {isLoding ? (
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
                      &nbsp; 1
                    </span>
                  </Button>
                )}
              </Form.Item>
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
