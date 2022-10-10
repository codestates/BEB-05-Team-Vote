import { CodepenOutlined } from '@ant-design/icons';
import { Col, Image, Row, Space, Typography } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';

const { Text, Title } = Typography;

export default function SubscribeLectureComponent({ data }: any) {
  const router = useRouter();

  return (
    <Row justify="space-around" gutter={[16, 16]}>
      {data &&
        data.map((item: any, i: number) => {
          if (i < 4) {
            return (
              <Col
                xxl={5}
                lg={12}
                xs={12}
                key={item.id}
                onClick={() => {
                  router.push(`/lectures/details/${item.lecture.lecture_id}`);
                }}
              >
                <Space direction="vertical">
                  <Image
                    width={'100%'}
                    height={'auto'}
                    style={{
                      objectFit: 'cover',
                      marginBottom: '8px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                    }}
                    src={item.lecture.lecture_image}
                    alt={item.lecture.lecture_title}
                    preview={false}
                    fallback="https://images.unsplash.com/photo-1534337621606-e3df5ee0e97f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80"
                  />

                  <Space>
                    <Title
                      ellipsis={{ rows: 2 }}
                      level={4}
                      style={{ lineHeight: '150%', cursor: 'pointer' }}
                    >
                      {item.lecture.lecture_title}
                    </Title>
                    <Space style={{ width: '80px' }}>
                      <Text
                        style={{ fontSize: '16px', color: '#bae637', fontWeight: 500 }}
                        type="secondary"
                      >
                        <CodepenOutlined style={{ fontSize: '24px', color: '#bae637' }} />
                        &nbsp;
                        {item.lecture.lecture_price}
                      </Text>
                    </Space>
                  </Space>
                </Space>
              </Col>
            );
          }
        })}
    </Row>
  );
}
