import { AlignCenterOutlined } from '@ant-design/icons';
import { Col, PageHeader, Row, Radio } from 'antd';
import type { NextPage } from 'next';
import Head from 'next/head';
import PostList from '../components/community/PostList';
import UploadPost from '../components/community/UploadPost';
import RcmdCourse from '../components/RcmdCourse';

export interface Post {
  author: string;
  content: string;
  like: number;
  commentCount: number;
  createdDate: string;
}

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Havruta DAO</title>
        <meta name="description" content="Havruta DAO" />
      </Head>
      <Row>
        <Col span={14}>
          <PageHeader
            backIcon={<AlignCenterOutlined />}
            onBack={() => null}
            title="하브루타 커뮤니티"
            extra={
              <Radio.Group defaultValue="a">
                <Radio.Button value="a">최신</Radio.Button>
                <Radio.Button value="b">추천</Radio.Button>
              </Radio.Group>
            }
          />
          <UploadPost />
          <PostList />
        </Col>
        <Col span={8}>
          <PageHeader backIcon={<AlignCenterOutlined />} onBack={() => null} title="추천강의" />
          <RcmdCourse />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
