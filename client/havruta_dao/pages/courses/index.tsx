import { PageHeader, Row, Col, Card, Space, Typography, Radio, Tabs } from 'antd';
import { ThunderboltOutlined } from '@ant-design/icons';
import Link from 'next/link';

export default function details() {
  const { Title } = Typography;
  return (
    <section>
      <Space style={{ justifyContent: 'space-between', width: '100%' }}>
        <PageHeader title="강의탐색" backIcon={true} />
        <Radio.Group style={{ marginBottom: 8 }} size={'small'}>
          <Radio.Button value="top">최신</Radio.Button>
          <Radio.Button value="left">추천</Radio.Button>
        </Radio.Group>
      </Space>

      <Row gutter={[16, 16]}>
        <Col style={{ overflow: 'hidden' }} span={8}>
          <Card
            hoverable
            style={{ width: '100%' }}
            cover={
              <img
                style={{ width: '100%', maxHeight: '230px', objectFit: 'cover' }}
                alt="example"
                src="/329248-eng2.png"
              />
            }
          >
            <Title ellipsis={{ rows: 2 }} level={5} style={{ marginBottom: '20px' }}>
              CS지식의 정석 | CS면접 디자인 패턴 네트워크 운영체제 데이터베이스 자료구조 개발자
            </Title>
            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
              <span className="author">니콜라스</span>
              <div>
                <ThunderboltOutlined style={{ marginRight: '8px' }} />
                <span>0.02</span>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    </section>
  );
}
