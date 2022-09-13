import { FolderOpenOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Row, Col, PageHeader, Space, Typography, Divider, Image, Button } from 'antd';
import axios from 'axios';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import * as Sentry from '@sentry/react';
import { Courses } from '../';

const { Title, Paragraph } = Typography;

interface CourseDetail extends Courses {
  user_id: number;
  lecture_summary: string;
  lecture_introduction: string;
  instructor_introduction: string;
  lecture_url: string;
  created_at: string;
  updated_at: string;
}

export default function details({ course }: { course: CourseDetail }) {
  const first = false;
  return (
    <section>
      <Head>
        <title>{course.lecture_title}</title>
      </Head>
      <Space style={{ width: '100%' }}>
        <FolderOpenOutlined style={{ fontSize: '24px' }} />
        <PageHeader title="강의 상세 내용" style={{ paddingLeft: 0 }} />
      </Space>
      <Row gutter={48}>
        <Col span={16}>
          <Image
            width={'100%'}
            src={course.lecture_image}
            style={{ marginBottom: '24px' }}
            preview={false}
            alt="강의 이미지"
          />
          <Title level={3}>강의 상세 소개</Title>
          <Paragraph style={{ fontSize: '16px', fontWeight: 400 }}>
            {course.lecture_introduction}
          </Paragraph>
          <Divider />
          <Title level={3}>강사 소개</Title>
          <Paragraph style={{ fontSize: '16px', fontWeight: 400 }}>
            {course.instructor_introduction}
          </Paragraph>
          <Divider />
        </Col>
        <Col span={8}>
          <Title level={3}>{course.lecture_title}</Title>
          <Paragraph style={{ fontSize: '16px', fontWeight: 400 }}>
            {course.lecture_summary}
          </Paragraph>

          <Space direction="vertical" style={{ width: '100%' }}>
            <Space>
              <ThunderboltOutlined style={{ fontSize: '32px', color: '#9B4DEA' }} />
              <Paragraph style={{ fontSize: '24px', fontWeight: 600, color: '#9B4DEA', margin: 0 }}>
                {course.lecture_price}
              </Paragraph>
            </Space>
            {first ? (
              <Link href={`/courses/class/1`}>
                <Button type="ghost" size={'large'} style={{ width: '100%' }} block>
                  계속 수강하기
                </Button>
              </Link>
            ) : (
              <Button type="primary" size={'large'} style={{ width: '100%' }} block>
                수강신청 하기
              </Button>
            )}
          </Space>
        </Col>
      </Row>
    </section>
  );
}
export async function getServerSideProps({ params: { id } }: { params: { id: number } }) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/lecture/detail?lecture_id=${id}`
    );
    const course = res.data[0];
    return {
      props: {
        course,
      },
    };
  } catch (error) {
    Sentry.captureException(error);
    return { props: {} };
  }
}
