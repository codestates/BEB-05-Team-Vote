import { useEffect, useState } from 'react';
import { Image, Row, Col, Space, Typography, Skeleton } from 'antd';
import { CodepenOutlined } from '@ant-design/icons';
import Link from 'next/link';
import axios from 'axios';
import * as Sentry from '@sentry/react';

const { Paragraph } = Typography;

export default function RcmdCourse() {
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
          ? Array(5)
              .fill(null)
              .map((_) => (
                <>
                  <Col xxl={12} lg={24}>
                    <Skeleton.Image active style={{ width: '100%', minWidth: '150px' }} />
                  </Col>
                  <Col xxl={12} lg={24}>
                    <Skeleton active style={{ width: '100%' }} />
                  </Col>
                </>
              ))
          : courses.map((course) => (
              <>
                <Col xxl={12} lg={24} style={{ cursor: 'pointer' }} key={course.lecture_id}>
                  <Link href={`/courses/details/${course.lecture_id}`}>
                    <Image
                      preview={false}
                      width={'100%'}
                      height={'auto'}
                      alt="thumbnail"
                      src={course.lecture_image}
                    />
                  </Link>
                </Col>

                <Col xxl={12} lg={24} style={{ cursor: 'pointer' }}>
                  <Link href={`/courses/details/1`}>
                    <div>
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
                    </div>
                  </Link>
                </Col>
              </>
            ))}
      </Row>
    </Space>
  );
}
