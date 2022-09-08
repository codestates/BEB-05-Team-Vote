import { CloudUploadOutlined, CodepenOutlined } from '@ant-design/icons';
import { PageHeader, Input, Button, Form, Row, Col } from 'antd';
import React from 'react';

export default function upload() {
  const { TextArea } = Input;
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log('Change:', e.target.value);
  };

  return (
    <Row>
      <Col xxl={12} lg={24}>
        <PageHeader
          backIcon={<CloudUploadOutlined style={{ fontSize: '24px' }} />}
          onBack={() => null}
          title="강의 만들기"
        />

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

          <Form.Item name="courseSummary" label="강의 상세 소개">
            <TextArea rows={8} onChange={onChange} />
          </Form.Item>

          <Form.Item name="courseSummary" label="강사 소개">
            <TextArea rows={8} onChange={onChange} />
          </Form.Item>

          <Form.Item name="courseTitle" label="강의 제목">
            <Button type="primary" block size={'large'} style={{ width: '100%' }}>
              강의 업로드하기
              <CodepenOutlined />
              0.01
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
