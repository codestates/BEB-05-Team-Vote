
import { PageHeader, Row, Col, Card, Space, Typography, Radio, Tabs, Image } from 'antd';
import { SearchOutlined, ThunderboltOutlined } from '@ant-design/icons';

const dummyCourses = {
  title: 'CS지식의 정석 | CS면접 디자인 패턴 네트워크 운영체제 데이터베이스 자료구조 개발자',
  author: '니콜라스',
  price: '2',
  thumbnailURL: '/329248-eng2.png',
};

export default function details() {
  const { Title, Text } = Typography;
  return (
    <section>
      <Space style={{ justifyContent: 'space-between', width: '100%' }}>
        <Space>
          <SearchOutlined style={{ fontSize: '24px' }} />
          <PageHeader style={{ paddingLeft: 0 }} title="강의탐색" backIcon={true} />
        </Space>
        <Radio.Group style={{ marginBottom: 8 }} size={'small'}>
          <Radio.Button value="top">최신</Radio.Button>
          <Radio.Button value="left">추천</Radio.Button>
        </Radio.Group>
      </Space>

      <Row gutter={[20, 24]}>
        <Col span={8}>
          <Image
            width={'100%'}
            height={'auto'}
            style={{ objectFit: 'cover', marginBottom: '8px', borderRadius:'8px' }}
            src={`${dummyCourses.thumbnailURL}`}
          />
          <Title ellipsis={{rows:2}} level={4} style={{lineHeight:'150%'}} >{dummyCourses.title}</Title>
          <Space align="center" style={{ justifyContent: 'space-between', width: '100%' }}>
            <Text style={{ fontSize: '16px' }} type="secondary">
              {dummyCourses.author}
            </Text>
            <Space>
              <ThunderboltOutlined style={{ fontSize: '16px', paddingTop:'6px', color:'#9b4dea' }} />
              <Text style={{ fontSize: '16px', color:'#9b4dea', fontWeight:500}} type="secondary">
                {dummyCourses.price}
              </Text>
            </Space>
          </Space>
        </Col>        
      </Row>
      {/* <Card
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
          </Card> */}
    </section>
  );
}
