import { PageHeader, Row, Col, Space, Typography, Image, Skeleton } from 'antd';
import { CodepenOutlined, SearchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import Head from 'next/head';
import useSWR from 'swr';
import Paragraph from 'antd/lib/skeleton/Paragraph';

const { Title, Text } = Typography;

export interface Courses {
  lecture_id: number;
  lecture_image: string;
  lecture_price: number;
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
          <PageHeader
            backIcon={<SearchOutlined />}
            onBack={() => router.push('/courses')}
            title="강의탐색"
            subTitle={'함께 배우고, 나누고, 성장하세요.'}
          />
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
                <Text style={{ fontSize: '16px', overflow: 'hidden' }} type="secondary">
                  {course.user.user_nickname.length > 10
                    ? course.user.user_nickname.substr(0, 10) + '...'
                    : course.user.user_nickname}
                </Text>
                <Space>
                  {course.lecture_price === 0 ? (
                    <Text
                      style={{ fontSize: '20px', color: '#bae637', fontWeight: 500 }}
                      type="secondary"
                    >
                      무료
                    </Text>
                  ) : (
                    <>
                      <CodepenOutlined style={{ fontSize: '24px', color: '#bae637' }} />
                      <Text
                        style={{ fontSize: '20px', color: '#bae637', fontWeight: 500 }}
                        type="secondary"
                      >
                        {course.lecture_price}
                      </Text>
                    </>
                  )}
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
