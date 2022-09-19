import React, { useState, useEffect } from 'react';
import Head from 'next/head';
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
  Popconfirm,
} from 'antd';
import { CodepenOutlined, QuestionCircleOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useRecoilState } from 'recoil';
import { loginInfoState } from '../../../states/loginInfoState';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { useSWRConfig } from 'swr';

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

export default function Detail({
  course,
  subscribe,
}: {
  course: CourseDetail;
  subscribe: boolean;
}) {
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const [isSubscribe, setIsSubscribe] = useState(subscribe || false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoState);

  const onSubscribe = async () => {
    if (!loginInfo.user_id) {
      return notification['info']({
        message: '지갑 연동이 필요합니다.',
        description: '이 강의를 수강하시려면 먼저 지갑을 연동해주세요.',
      });
    }
    setIsLoading(true);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/userlecture`, {
        user_id: loginInfo.user_id,
        lecture_id: course.lecture_id,
      });
      if (res.status === 201) {
        setIsLoading(false);
        notification['success']({
          message: '강의 수강 등록이 완료되었습니다!',
        });
        setIsSubscribe(true);
      }
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  const onDelete = async (lecture_id: number) => {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_ENDPOINT}/lecture`, {
      data: {
        user_id: loginInfo.user_id,
        lecture_id: lecture_id,
      },
    });
    if (res.status === 201) {
      notification['success']({
        message: '강의가 성공적으로 삭제되었습니다.',
      });
      router.push('/courses');
      mutate(`${process.env.NEXT_PUBLIC_ENDPOINT}/lecture`);
    }
  };

  const onClick = () => {
    router.push({
      pathname: `/courses/class/${course.lecture_id}`,
      query: {
        lecture_id: course.lecture_id,
        lecture_title: course.lecture_title,
        lecture_summary: course.lecture_summary,
        lecture_url: course.lecture_url,
      },
    });
  };

  return (
    <section>
      <Head>
        <title>{course.lecture_title}</title>
      </Head>
      <Space style={{ width: '100%' }}>
        <PageHeader
          title="목록으로"
          style={{ paddingLeft: 0 }}
          onBack={() => router.push('/courses')}
        />
      </Space>
      <Row gutter={48}>
        <Col span={16}>
          <Image
            width={'100%'}
            src={course.lecture_image}
            style={{ marginBottom: '24px' }}
            preview={false}
            alt="강의 이미지"
            fallback="https://images.unsplash.com/photo-1534337621606-e3df5ee0e97f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80"
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
              <CodepenOutlined style={{ fontSize: '24px', color: '#bae637' }} />
              <Paragraph style={{ fontSize: '24px', fontWeight: 600, color: '#bae637', margin: 0 }}>
                {course.lecture_price}
              </Paragraph>
            </Space>
            {isSubscribe ? (
              <Button onClick={onClick} type="ghost" size={'large'} style={{ width: '100%' }} block>
                강의실로 이동하기
              </Button>
            ) : isLoading ? (
              <Button type="primary" size={'large'} style={{ width: '100%' }} block loading>
                <span>수강 신청 중..</span>
              </Button>
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
            {loginInfo.user_id === course.user_id ? (
              <Popconfirm
                placement="bottom"
                title={'정말 강의를 삭제하시겠습니까?'}
                onConfirm={() => onDelete(course.lecture_id)}
                okText={'삭제'}
                cancelText="취소"
                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              >
                <Button type={'text'} danger size={'large'} style={{ width: '100%' }} block>
                  강의 삭제하기
                </Button>
              </Popconfirm>
            ) : (
              <></>
            )}
          </Space>
        </Col>
      </Row>
    </section>
  );
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const resCourse = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/lecture/detail?lecture_id=${ctx.params?.id}`
    );
    const course = resCourse.data[0];

    const session = await getSession(ctx);

    if (session) {
      const resSubscribe = await axios.get(
        `${process.env.NEXT_PUBLIC_ENDPOINT}/userlecture?user_id=${session.user.user_id}&lecture_id=${ctx.params?.id}`
      );
      const subscribe = resSubscribe.data.length !== 0;

      return {
        props: {
          course,
          subscribe,
        },
      };
    }

    return {
      props: {
        course,
      },
    };
  } catch (error) {
    Sentry.captureException(error);
    return { props: {} };
  }
};
