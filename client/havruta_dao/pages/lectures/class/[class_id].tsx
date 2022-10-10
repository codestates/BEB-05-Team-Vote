import { PageHeader, Space, Typography } from 'antd';
import { GetServerSideProps } from 'next';
import ReactPlayer from 'react-player/lazy';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Head from 'next/head';

const { Title, Text } = Typography;

export default function ClassDetails({ lecture }: { lecture: LectureDetail }) {
  const router = useRouter();
  return (
    <section>
      <Head>
        <title>{lecture.lecture_title}</title>
      </Head>
      <Space style={{ justifyContent: 'space-between', width: '100%' }}>
        <PageHeader
          onBack={() => router.back()}
          style={{ paddingLeft: 0, width: '100%' }}
          title={lecture.lecture_title}
        />
      </Space>

      <PlayerWrapper>
        <ReactPlayer
          className="react-player"
          url={lecture.lecture_url}
          controls={true}
          width={'100%'}
          height={'100%'}
        />
      </PlayerWrapper>

      <Title level={3}>{lecture.lecture_title}</Title>
      <Text style={{ display: 'block', fontSize: '18px', marginBottom: '16px' }}>
        {lecture.lecture_summary}
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
  const lecture = ctx.query;
  return {
    props: { lecture },
  };
};
