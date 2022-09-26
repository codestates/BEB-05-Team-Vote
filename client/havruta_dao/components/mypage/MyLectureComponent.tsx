import { CodepenOutlined } from '@ant-design/icons';
import { Col, Image, Row, Space, Typography } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { Courses } from '../../pages/courses';

export default function MyLectureComponent({ data }: any) {
  const router = useRouter();
  const { Text, Title } = Typography;

  return (
    <Row justify="space-around" gutter={[16, 16]}>
      {data &&
        data.map((item: Courses, i: number) => {
          if (i < 4) {
            return (
              <Col
                xxl={5}
                lg={12}
                sm={24}
                key={item.lecture_id}
                onClick={() => {
                  router.push(`/courses/details/${item.lecture_id}`);
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
                    // onClick={() => router.push(`/courses/details/`)}
                    src={item.lecture_image}
                    alt={item.lecture_title}
                    preview={false}
                    fallback="https://images.unsplash.com/photo-1534337621606-e3df5ee0e97f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80"
                  />

                  <Space>
                    <Title
                      ellipsis={{ rows: 2 }}
                      level={4}
                      style={{ lineHeight: '150%', cursor: 'pointer' }}
                    >
                      {item.lecture_title}
                    </Title>
                    <Space style={{ width: '80px' }}>
                      <Text
                        style={{ fontSize: '16px', color: '#bae637', fontWeight: 500 }}
                        type="secondary"
                      >
                        <CodepenOutlined style={{ fontSize: '24px', color: '#bae637' }} />
                        &nbsp;
                        {item.lecture_price}
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
