import { PageHeader, Space, Row, Col } from 'antd';

export default function Mypage() {
  return (
    <Space>
      <PageHeader></PageHeader>
      <Row>
        <Col span={12}></Col>
        <Col span={12}></Col>
      </Row>
      <Row>
        <Col span={12}></Col>
        <Col span={12}></Col>
      </Row>
      <Row>
        <Col span={24}></Col>
      </Row>
    </Space>
  );
}
