import {
  ArrowRightOutlined,
  CommentOutlined,
  FireOutlined,
  LikeOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import { Col, PageHeader, Row, Radio, Typography, Card, Space, Button, Skeleton } from 'antd';
import type { NextPage } from 'next';
import UploadPost from '../components/community/UploadPost';
import RcmdCourse from '../components/RcmdCourse';
import styled from 'styled-components';
import { loginInfoState } from '../states/loginInfoState';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import useSWR from 'swr';

export interface PostInterface {
  article_id: number;
  user_id: number;
  article_content: string;
  like_count: number;
  comment_count: number;
  comments: [];
  created_at: string;
  user: {
    user_id: number;
    user_address: string;
    user_network: string;
    user_nickname: string;
    user_introduction: string;
    created_at: string;
    updated_at: string;
  };
}

const { Text } = Typography;

const Home: NextPage = () => {
  const router = useRouter();
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoState);

  const { data: postList } = useSWR(`${process.env.NEXT_PUBLIC_ENDPOINT}/article/recent`);

  return (
    <div>
      <Row>
        <Col xl={16} xs={24}>
          <PageHeader
            backIcon={<CommentOutlined />}
            onBack={() => router.push('/')}
            title="하브루타 커뮤니티"
            extra={
              <Radio.Group defaultValue="a" size={'small'}>
                <Radio.Button onClick={() => {}} value="a">
                  최신
                </Radio.Button>
                <Radio.Button onClick={() => {}} value="b">
                  추천
                </Radio.Button>
              </Radio.Group>
            }
          />
          {loginInfo.user_id ? (
            <UploadPost />
          ) : (
            <Space
              align="center"
              style={{
                width: '100%',
                justifyContent: 'center',
                paddingTop: '20px',
                paddingBottom: '40px',
              }}
            >
              <Text style={{ fontSize: '20px' }}>
                지금 지갑을 연결하고
                <br />
                커뮤니티 활동을 시작하세요
              </Text>
            </Space>
          )}

          {postList ? (
            postList.map((post: PostInterface) => {
              return (
                <div
                  key={post.article_id}
                  onClick={() => router.push(`/community/details/${post.article_id}`)}
                >
                  <PostCard>
                    <Space direction="vertical" size={'large'}>
                      <Space>
                        <Text strong>{post.user.user_nickname}</Text>
                        <Text type="secondary">{post.created_at}</Text>
                      </Space>
                      {post.article_content}
                      <Space>
                        <Button
                          type="link"
                          icon={<LikeOutlined />}
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          {' '}
                          {post.like_count}
                        </Button>
                        <Button type="link" icon={<MessageOutlined />} size="small">
                          {' '}
                          {post.comment_count}
                        </Button>
                      </Space>
                    </Space>
                  </PostCard>
                </div>
              );
            })
          ) : (
            <Skeleton />
          )}
        </Col>
        <Col xl={8} xs={0}>
          <PageHeader
            backIcon={<FireOutlined />}
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

const PostCard = styled(Card)`
  width: 100%;
  margin-top: -1px;

  :hover {
    cursor: pointer;
    background-color: rgba(200, 200, 200, 0.1);
  }
`;

export default Home;
