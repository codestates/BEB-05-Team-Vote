import { CloudUploadOutlined, CodepenOutlined } from '@ant-design/icons';
import { PageHeader, Input, Button, Form, Row, Col, Space } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Sentry from '@sentry/react';
import { useRecoilState } from 'recoil';
import { loginInfoState } from '../../states/loginInfoState';

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
        .post(`http://localhost:8000/lecture`, { course })
        .then((res) => {
          console.log('RESPONSE', res);
        })
        .catch((err) => {
          Sentry.captureException(err);
        });
    }
  }, [course]);

  const changeValue = (values: UploadCourse) => {
    setCourse((course) => {
      return {
        ...course,
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
    changeValue(values);
  };
  return (
    <Row>
      <Col xl={16} xs={24}>
        <Space>
          <CloudUploadOutlined style={{ fontSize: '24px' }} />
          <PageHeader style={{ paddingLeft: 0 }} title="강의 만들기" />
        </Space>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="lecture_title" label="강의 제목">
            <Input />
          </Form.Item>

          <Form.Item name="lecture_summary" label="강의 내용 요약">
            <Input />
          </Form.Item>

          <Form.Item name="lecture_image" label="대표 이미지 업로드">
            <Input />
          </Form.Item>

          <Form.Item name="lecture_url" label="강의 유튜브 URL">
            <Input />
          </Form.Item>

          <Form.Item name="lecture_price" label="강의 가격">
            <Input
              addonBefore={<CodepenOutlined style={{ fontSize: '24px', color: '#9b4dea' }} />}
            />
          </Form.Item>

          <Form.Item name="lecture_introduction" label="강의 상세 소개">
            <TextArea rows={6} />
          </Form.Item>

          <Form.Item name="instructor_introduction" label="강사 소개">
            <TextArea rows={5} />
          </Form.Item>

          <Form.Item name="submitButton">
            <Button type="primary" block size={'large'} style={{ width: '100%' }} htmlType="submit">
              <span>
                강의 업로드하기&nbsp;
                <CodepenOutlined />
                &nbsp; 0.01
              </span>
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col xl={8} xs={0}></Col>
    </Row>
  );
}
