import { QuestionCircleOutlined } from '@ant-design/icons';
import { Col, PageHeader, Row, Space } from 'antd';

export default function AmaDetails() {
  return (
    <>
      <Space style={{ justifyContent: 'space-between', width: '100%' }}>
        <PageHeader
          backIcon={<QuestionCircleOutlined />}
          style={{ paddingLeft: 0, width: '100%' }}
          title={'질의응답'}
          subTitle={'궁금했던 것을 자유롭게 질문해보세요.'}
        />
      </Space>
      <Row gutter={16}>
        <Col span={24}>aa</Col>
      </Row>
    </>
  );
}
