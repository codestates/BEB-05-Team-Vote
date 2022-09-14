import { AlignCenterOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Col, PageHeader, Row, Radio } from 'antd';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Post from '../components/community/Post';
import UploadPost from '../components/community/UploadPost';
import RcmdCourse from '../components/RcmdCourse';
export interface PostInterface {
  id: number;
  author: string;
  content: string;
  like: number;
  commentCount: number;
  createdDate: string;
}

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <div>
      <Row>
        <Col xl={16} xs={24}>
          <PageHeader
            backIcon={<AlignCenterOutlined />}
            onBack={() => null}
            title="하브루타 커뮤니티"
            extra={
              <Radio.Group defaultValue="a" size={'small'}>
                <Radio.Button value="a">최신</Radio.Button>
                <Radio.Button value="b">추천</Radio.Button>
              </Radio.Group>
            }
          />
          <UploadPost />
          {Array(10)
            .fill(null)
            .map((_, idx) => (
              <Post key={idx} />
            ))}
        </Col>
        <Col xl={8} xs={0}>
          <PageHeader
            backIcon={<AlignCenterOutlined />}
            onBack={() => null}
            title="추천강의"
            extra={
              <div
                style={{ cursor: 'pointer' }}
                title="전체 강의 보기"
                onClick={() => router.push('/courses')}
                key={1}
              >
                <ArrowRightOutlined /> 더보기
              </div>
            }
          />
          <RcmdCourse />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
