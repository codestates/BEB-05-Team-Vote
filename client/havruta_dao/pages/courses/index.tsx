import { PageHeader, Row, Col, Space, Typography, Radio, Image, Skeleton } from 'antd';
import { SearchOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import Head from 'next/head';
import useSWR from 'swr';

const { Title, Text } = Typography;

export interface Courses {
  lecture_id: number;
  lecture_image: string;
  lecture_price: string;
  lecture_title: string;
  user?: any;
}

export default function Details() {
  const router = useRouter();
  const { data: courses } = useSWR(`${process.env.NEXT_PUBLIC_ENDPOINT}/lecture`);

  return (
    <section>
      <Head>
        <title>강의탐색</title>
      </Head>
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

      <Row gutter={[20, 24]}>
        {courses ? (
          courses.map((course: Courses) => (
            <Col span={8} key={course.lecture_id}>
              <Image
                width={'100%'}
                height={'auto'}
                style={{
                  objectFit: 'cover',
                  marginBottom: '8px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
                onClick={() => router.push(`/courses/details/${course.lecture_id}`)}
                src={`${course.lecture_image}`}
                alt={course.lecture_title}
                preview={false}
                fallback="https://images.unsplash.com/photo-1534337621606-e3df5ee0e97f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80"
              />

              <Title
                ellipsis={{ rows: 2 }}
                level={4}
                style={{ lineHeight: '150%', cursor: 'pointer' }}
                onClick={() => router.push(`/courses/details/${course.lecture_id}`)}
              >
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
            </Col>
          ))
        ) : (
          <Skeleton active />
        )}
      </Row>
    </section>
  );
}
