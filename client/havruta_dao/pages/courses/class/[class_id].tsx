import { PageHeader, Space, Typography } from 'antd';
import { GetServerSideProps } from 'next';
import ReactPlayer from 'react-player/lazy';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Head from 'next/head';

const { Title, Text } = Typography;

type Course = {
  lecture_id: string;
  lecture_title: string;
  lecture_summary: string;
  lecture_url: string;
  class_id: string;
};
export default function ClassDetails({ course }: { course: Course }) {
  const router = useRouter();
  return (
    <section>
      <Head>
        <title>{course.lecture_title}</title>
      </Head>
      <Space style={{ justifyContent: 'space-between', width: '100%' }}>
        <PageHeader
          onBack={() => router.back()}
          style={{ paddingLeft: 0, width: '100%' }}
          title={course.lecture_title}
        />
      </Space>

      <PlayerWrapper>
        <ReactPlayer
          className="react-player"
          url={course.lecture_url}
          controls={true}
          width={'100%'}
          height={'100%'}
        />
      </PlayerWrapper>

      <Title level={3}>{course.lecture_title}</Title>
      <Text style={{ display: 'block', fontSize: '18px', marginBottom: '16px' }}>
        {course.lecture_summary}
      </Text>
    </section>
  );
}

const PlayerWrapper = styled.div`
  position: relative;
  padding-top: 25px;
  padding-bottom: 56.25% /* Player ratio: 100 / (1280 / 720) */;
  .react-player {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const course = ctx.query;
  return {
    props: { course },
  };
};
