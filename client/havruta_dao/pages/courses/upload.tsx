import { CloudUploadOutlined, CodepenOutlined } from '@ant-design/icons';
import { PageHeader, Input, Button, Form, Row, Col } from 'antd';
import React from 'react';

const { TextArea } = Input;

export default function upload() {
  return (
    <Row>
      <Col span={16}>
        <PageHeader backIcon={<CloudUploadOutlined />} title="강의 만들기" />
        <Form layout="vertical">
          <Form.Item name="courseSummary" label="강의 내용 요약">
            <Input />
          </Form.Item>

          <Form.Item name="imgUpload" label="대표 이미지 업로드">
            <Input />
          </Form.Item>

          <Form.Item name="courseURL" label="강의 유튜브 URL">
            <Input />
          </Form.Item>

          <Form.Item name="coursePrice" label="강의 가격">
            <Input
              addonBefore={<CodepenOutlined style={{ fontSize: '24px', color: '#9b4dea' }} />}
            />
          </Form.Item>

          <Form.Item name="courseDetail" label="강의 상세 소개">
            <TextArea rows={6} />
          </Form.Item>

          <Form.Item name="authorSummary" label="강사 소개">
            <TextArea rows={5} />
          </Form.Item>

          <Form.Item name="submitButton">
            <Button type="primary" block size={'large'} style={{ width: '100%' }}>
              <span>
                강의 업로드하기
                <CodepenOutlined />
                0.01
              </span>
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col span={8}></Col>
    </Row>
  );
}
