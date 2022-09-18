import { Image, Row, Col, Space, Typography, Skeleton } from 'antd';
import { CodepenOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';

const { Paragraph } = Typography;

export default function RcmdCourse() {
  const router = useRouter();

  const { data: courses } = useSWR(`${process.env.NEXT_PUBLIC_ENDPOINT}/lecture`);

  return (
    <Space wrap style={{ padding: '0 20px', width: '100%' }}>
      <Row justify="center" align="top" gutter={[8, 16]}>
        {courses ? (
          courses.map((course: any) => (
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
                <Paragraph style={{ color: 'grey', fontSize: '14px' }}>
                  {course.user?.user_nickname}
                </Paragraph>
                <Paragraph style={{ maxWidth: '100%' }} ellipsis={{ rows: 2 }}>
                  {course.lecture_title}
                </Paragraph>
                <Paragraph>
                  <CodepenOutlined />
                  &nbsp;{course.lecture_price}
                </Paragraph>
              </Col>
            </React.Fragment>
          ))
        ) : (
          <React.Fragment>
            <Col xxl={12} lg={24}>
              <Skeleton.Image active style={{ width: '100%', minWidth: '150px' }} />
            </Col>
            <Col xxl={12} lg={24}>
              <Skeleton active style={{ width: '100%' }} />
            </Col>
          </React.Fragment>
        )}
      </Row>
    </Space>
  );
}
