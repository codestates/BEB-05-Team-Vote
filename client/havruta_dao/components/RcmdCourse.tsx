import { Button, Image, Row, Col, Space, Typography } from 'antd';
import { CodepenOutlined, ArrowRightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { DummyCourses } from '../pages/courses';

const { Paragraph } = Typography;

export default function RcmdCourse() {
  const data: DummyCourses = {
    id: 133,
    title: 'CS지식의 정석 | CS면접 디자인 패턴 네트워크 운영체제 데이터베이스 자료구조 개발자',
    author: '니콜라스',
    price: '2',
    thumbnailURL: '/329248-eng2.png',
  };

  return (
    <Space wrap style={{ padding: '0 20px', width: '100%' }}>
      <Row justify="center" align="top" gutter={[8, 16]}>
        <Col xxl={12} lg={24} style={{ cursor: 'pointer' }}>
          <Link href={`/courses/details/${data.id}`}>
            <Image
              preview={false}
              width={'100%'}
              height={'auto'}
              alt="thumbnail"
              src={data.thumbnailURL}
            />
          </Link>
        </Col>

        <Col xxl={12} lg={24} style={{ cursor: 'pointer' }}>
          <Link href={`/courses/details/${data.id}`}>
            <div>
              <Paragraph style={{ color: 'grey', fontSize: '14px' }}> {data.author}</Paragraph>
              <Paragraph style={{ maxWidth: '100%' }} ellipsis={{ rows: 2 }}>
                {data.title}
              </Paragraph>
              <Paragraph>
                <CodepenOutlined />
                &nbsp;{data.price}
              </Paragraph>
            </div>
          </Link>
        </Col>
      </Row>
    </Space>
  );
}
