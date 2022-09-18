import { useEffect, useState } from 'react';
import { Image, Row, Col, Space, Typography, Skeleton } from 'antd';
import { CodepenOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import axios from 'axios';
import * as Sentry from '@sentry/react';
import React from 'react';

const { Paragraph } = Typography;

export default function RcmdCourse() {
  const router = useRouter();
  const [isLoding, setIsLoding] = useState(true);
  const [courses, setCourses] = useState([
    {
      lecture_id: 0,
      lecture_title: '',
      lecture_image: '',
      lecture_price: 0,
      user: {
        user_id: 0,
        user_address: '',
        user_network: '',
        user_nickname: '',
        user_introduction: '',
        created_at: '',
        updated_at: '',
      },
    },
  ]);

  const fetchLectureList = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT}/lecture/limit?limit=5`);
      const result = res.data;
      setCourses(result);
      setIsLoding(false);
    } catch (error) {
      Sentry.captureException(error);
    }
  };
  useEffect(() => {
    fetchLectureList();
  }, []);

  return (
    <Space wrap style={{ padding: '0 20px', width: '100%' }}>
      <Row justify="center" align="top" gutter={[8, 16]}>
        {isLoding
          ? 
                <React.Fragment>
                  <Col xxl={12} lg={24}>
                    <Skeleton.Image active style={{ width: '100%', minWidth: '150px' }} />
                  </Col>
                  <Col xxl={12} lg={24}>
                    <Skeleton active style={{ width: '100%' }} />
                  </Col>
                </React.Fragment>
          : courses.map((course) => (
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
            ))}
      </Row>
    </Space>
  );
}
