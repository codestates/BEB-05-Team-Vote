import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import * as Sentry from '@sentry/react';
import { Courses } from '../';
import {
  Row,
  Col,
  PageHeader,
  Space,
  Typography,
  Divider,
  Image,
  Button,
  notification,
} from 'antd';
import { FolderOpenOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useRecoilState } from 'recoil';
import { loginInfoState } from '../../../states/loginInfoState';
import { useRouter } from 'next/router';

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

export default function Detail({ course }: { course: CourseDetail }) {
  const router = useRouter();
  const [isSubscribe, setIsSubscribe] = useState(false);
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoState);

  const onSubscribe = async () => {
    if (!loginInfo.user_id) {
      return notification['info']({
        message: '지갑 연동이 필요합니다.',
        description: '이 강의를 수강하시려면 먼저 지갑을 연동해주세요.',
      });
    }
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/userlecture`, {
        user_id: loginInfo.user_id,
        lecture_title: course.lecture_title,
      });
      if (res.status === 201) {
        setIsSubscribe(true);
      }
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  return (
    <section>
      <Head>
        <title>{course.lecture_title}</title>
      </Head>
      <Space style={{ width: '100%' }}>
        <PageHeader title="목록으로" style={{ paddingLeft: 0 }} onBack={() => router.back()} />
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
            {isSubscribe ? (
              <Link href={`/courses/class/1`}>
                <Button type="ghost" size={'large'} style={{ width: '100%' }} block>
                  계속 수강하기
                </Button>
              </Link>
            ) : (
              <Button
                onClick={onSubscribe}
                type="primary"
                size={'large'}
                style={{ width: '100%' }}
                block
              >
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
