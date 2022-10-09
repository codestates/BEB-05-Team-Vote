import { PageHeader, Row, Col, Space, Typography, Image, Skeleton } from 'antd';
import { CodepenOutlined, SearchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const { Title, Text } = Typography;

export default function Details() {
  const router = useRouter();
  const { data: lectures } = useSWR(`${process.env.NEXT_PUBLIC_ENDPOINT}/lecture`);

  return (
    <section>
      <Space style={{ justifyContent: 'space-between', width: '100%' }}>
        <Space>
          <PageHeader
            backIcon={<SearchOutlined />}
            onBack={() => router.push('/lectures')}
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
        {lectures ? (
          lectures.map((lecture: Lecture) => (
            <Col span={8} key={lecture.lecture_id}>
              <Image
                width={'100%'}
                height={'auto'}
                style={{
                  objectFit: 'cover',
                  marginBottom: '8px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
                onClick={() => router.push(`/lectures/details/${lecture.lecture_id}`)}
                src={`${lecture.lecture_image}`}
                alt={lecture.lecture_title}
                preview={false}
                fallback="https://images.unsplash.com/photo-1534337621606-e3df5ee0e97f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80"
              />

              <Title
                ellipsis={{ rows: 1 }}
                level={4}
                style={{ lineHeight: '150%', cursor: 'pointer' }}
                onClick={() => router.push(`/lectures/details/${lecture.lecture_id}`)}
                title={lecture.lecture_title}
              >
                {lecture.lecture_title}
              </Title>

              <Space align="center" style={{ justifyContent: 'space-between', width: '100%' }}>
                <Text style={{ fontSize: '16px', overflow: 'hidden' }} type="secondary">
                  {lecture.user.user_nickname.length > 10
                    ? lecture.user.user_nickname.substr(0, 10) + '...'
                    : lecture.user.user_nickname}
                </Text>
                <Space>
                  {lecture.lecture_price === 0 ? (
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
                        {lecture.lecture_price}
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
