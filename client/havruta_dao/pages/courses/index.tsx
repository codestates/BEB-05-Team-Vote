import { PageHeader, Row, Col, Space, Typography, Radio, Image } from 'antd';
import { SearchOutlined, ThunderboltOutlined } from '@ant-design/icons';
import Link from 'next/link';

export type DummyCourses = {
  id: number;
  title: string;
  author: string;
  price: string;
  thumbnailURL: string;
};

const dummyCourses: DummyCourses = {
  id: 1,
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
        <Radio.Group style={{ marginBottom: 8 }} defaultValue="a" size={'small'}>
          <Radio.Button value="a">최신</Radio.Button>
          <Radio.Button value="b">추천</Radio.Button>
        </Radio.Group>
      </Space>

      <Link href={`/courses/details/${dummyCourses.id}`}>
        <Row gutter={[20, 24]} style={{ cursor: 'pointer' }}>
          <Col span={8}>
            <Image
              width={'100%'}
              height={'auto'}
              style={{ objectFit: 'cover', marginBottom: '8px', borderRadius: '8px' }}
              src={`${dummyCourses.thumbnailURL}`}
              alt={dummyCourses.title}
              preview={false}
            />
            <Title ellipsis={{ rows: 2 }} level={4} style={{ lineHeight: '150%' }}>
              {dummyCourses.title}
            </Title>
            <Space align="center" style={{ justifyContent: 'space-between', width: '100%' }}>
              <Text style={{ fontSize: '16px' }} type="secondary">
                {dummyCourses.author}
              </Text>
              <Space>
                <ThunderboltOutlined
                  style={{ fontSize: '16px', paddingTop: '6px', color: '#9b4dea' }}
                />
                <Text
                  style={{ fontSize: '16px', color: '#9b4dea', fontWeight: 500 }}
                  type="secondary"
                >
                  {dummyCourses.price}
                </Text>
              </Space>
            </Space>
          </Col>
        </Row>
      </Link>
    </section>
  );
}
