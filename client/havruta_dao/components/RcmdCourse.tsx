import { Image, Row, Col, Space as _Space, Typography, Skeleton } from 'antd';
import { CodepenOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';
import styled from 'styled-components';

const { Paragraph, Text } = Typography;

export default function RcmdCourse() {
  const router = useRouter();

  const { data: courses } = useSWR(`${process.env.NEXT_PUBLIC_ENDPOINT}/lecture/limit?limit=5`);

  return (
    <Space style={{ padding: '0 20px', width: '100%' }}>
      <Row justify="center" align="top" gutter={[8, 16]} style={{ width: '100%' }}>
        {courses
          ? courses.map((course: any) => (
              <React.Fragment key={course.lecture_id}>
                <Col
                  xxl={12}
                  lg={24}
                  style={{ cursor: 'pointer' }}
                  key={course.lecture_id}
                  onClick={() => router.push(`/courses/details/${course.lecture_id}`)}
                >
                  <Image
                    preview={false}
                    width={'100%'}
                    height={'auto'}
                    alt="thumbnail"
                    src={course.lecture_image}
                    fallback="https://images.unsplash.com/photo-1534337621606-e3df5ee0e97f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80"
                  />
                </Col>

                <Col
                  xxl={12}
                  lg={24}
                  style={{ cursor: 'pointer' }}
                  onClick={() => router.push(`/courses/details/${course.lecture_id}`)}
                >
                  <Text
                    style={{ color: 'grey', fontSize: '14px' }}
                    title={course.user.user_nickname}
                  >
                    {course.user.user_nickname.length > 10
                      ? course.user.user_nickname.substr(0, 12) + '...'
                      : course.user.user_nickname}
                  </Text>
                  <Paragraph style={{ maxWidth: '100%', marginBottom: '0' }} ellipsis={{ rows: 2 }}>
                    {course.lecture_title}
                  </Paragraph>

                  {course.lecture_price === 0 ? (
                    <Text style={{ color: '#bae637', fontWeight: 500 }} type="secondary">
                      무료
                    </Text>
                  ) : (
                    <>
                      <CodepenOutlined style={{ color: '#bae637' }} />
                      &nbsp;
                      <Text style={{ color: '#bae637', fontWeight: 500 }} type="secondary">
                        {course.lecture_price}
                      </Text>
                    </>
                  )}
                </Col>
              </React.Fragment>
            ))
          : Array(3)
              .fill(null)
              .map((_, i) => (
                <React.Fragment key={i}>
                  <Col xxl={12} lg={24}>
                    <Skeleton.Image
                      active
                      style={{ width: '100%', minWidth: '140px', height: '80px' }}
                    />
                  </Col>
                  <Col xxl={12} lg={24}>
                    <Skeleton active style={{ width: '100%', height: '80px' }} />
                  </Col>
                </React.Fragment>
              ))}
      </Row>
    </Space>
  );
}

const Space = styled(_Space)`
  .ant-space-item {
    width: 100%;
  }
`;
