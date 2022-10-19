import { CommentOutlined, FireOutlined } from '@ant-design/icons';
import { Col, PageHeader, Row } from 'antd';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import UploadPostNotLogined from '../components/community/UploadPostNotLogined';
import UploadPostLogined from '../components/community/UploadPostLogined';
import Post from '../components/community/Post';
import RcmdLectures from '../components/RcmdLectures';

const Home: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: postList } = useSWR(`${process.env.NEXT_PUBLIC_ENDPOINT}/article/recent`);

  return (
    <div>
      <Row>
        <Col xl={16} xs={24}>
          <PageHeader
            backIcon={<CommentOutlined />}
            onBack={() => router.push('/')}
            title="하브루타 커뮤니티"
            subTitle={'어떤 이야기든 자유롭게 이야기를 나눠보세요.'}
          />
          {session?.user ? <UploadPostLogined /> : <UploadPostNotLogined />}
          {postList?.map((post: PostInterface) => {
            return <Post type="post" post={post} key={post.article_id} />;
          })}
        </Col>
        <Col xl={8} xs={0}>
          <PageHeader backIcon={<FireOutlined />} onBack={() => null} title="추천강의" />
          <RcmdLectures />
        </Col>
      </Row>
    </div>
  );
};
export default Home;
