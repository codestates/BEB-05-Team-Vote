import { PageHeader, Row, Col, Space, Typography, Radio, Image } from 'antd';
import { SearchOutlined, ThunderboltOutlined } from '@ant-design/icons';
import Link from 'next/link';
import axios from 'axios';
import * as Sentry from '@sentry/react';

export interface Courses {
  lecture_id: number;
  lecture_image: string;
  lecture_price: string;
  lecture_title: string;
  user: any;
}

export default function details({ courses }: { courses: Array<Courses> }) {
  const { Title, Text } = Typography;
  return (
    <section>
      <Space style={{ justifyContent: 'space-between', width: '100%' }}>
        <Space>
          <SearchOutlined style={{ fontSize: '24px' }} />
          <PageHeader style={{ paddingLeft: 0 }} title="강의탐색" backIcon={true} />
        </Space>
        {/* <Radio.Group style={{ marginBottom: 8 }} defaultValue="a" size={'small'}>
          <Radio.Button value="a">최신</Radio.Button>
          <Radio.Button value="b">추천</Radio.Button>
        </Radio.Group> */}
      </Space>

      <Row gutter={[20, 24]} style={{ cursor: 'pointer' }}>
        {courses.map((course) => (
          <Col span={8} key={course.lecture_id}>
            <Link href={`/courses/details/${course.lecture_id}`}>
              <>
                <Image
                  width={'100%'}
                  height={'auto'}
                  style={{ objectFit: 'cover', marginBottom: '8px', borderRadius: '8px' }}
                  src={`${course.lecture_image}`}
                  alt={course.lecture_title}
                  preview={false}
                />
                <Title ellipsis={{ rows: 2 }} level={4} style={{ lineHeight: '150%' }}>
                  {course.lecture_title}
                </Title>
                <Space align="center" style={{ justifyContent: 'space-between', width: '100%' }}>
                  <Text style={{ fontSize: '16px' }} type="secondary">
                    {course.user.user_nickname}
                  </Text>
                  <Space>
                    <ThunderboltOutlined
                      style={{ fontSize: '16px', paddingTop: '6px', color: '#9b4dea' }}
                    />
                    <Text
                      style={{ fontSize: '16px', color: '#9b4dea', fontWeight: 500 }}
                      type="secondary"
                    >
                      {course.lecture_price}
                    </Text>
                  </Space>
                </Space>
              </>
            </Link>
          </Col>
        ))}
      </Row>
    </section>
  );
}

export async function getServerSideProps() {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT}/lecture`);
    const courses = res.data;
    return {
      props: {
        courses,
      },
    };
  } catch (error) {
    Sentry.captureException(error);
    return { props: {} };
  }
}
