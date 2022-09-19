import {
  ArrowRightOutlined,
  CommentOutlined,
  DeleteOutlined,
  FireOutlined,
  LikeOutlined,
  MessageOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Col,
  PageHeader,
  Row,
  Radio,
  Typography,
  Card,
  Space,
  Button,
  Skeleton,
  Popconfirm,
  notification,
  message,
} from 'antd';
import type { NextPage } from 'next';
import UploadPost from '../components/community/UploadPost';
import RcmdCourse from '../components/RcmdCourse';
import styled from 'styled-components';
import { loginInfoState } from '../states/loginInfoState';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import axios from 'axios';
import { useSWRConfig } from 'swr';
import { timeForToday } from '../lib/date';

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

const { Text, Paragraph } = Typography;

const Home: NextPage = () => {
  const router = useRouter();
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoState);
  const { mutate } = useSWRConfig();

  const { data: postList } = useSWR(`${process.env.NEXT_PUBLIC_ENDPOINT}/article/recent`, {
    refreshInterval: 10000,
  });

  const fetchLike = async (article_id: number) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/like`, {
      user_id: loginInfo.user_id,
      article_id: article_id,
    });
    if (res.status === 201) {
      mutate(`${process.env.NEXT_PUBLIC_ENDPOINT}/article/recent`);
    }
  };

  const onPostDelete = async (article_id: number) => {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_ENDPOINT}/article`, {
      data: {
        user_id: loginInfo.user_id,
        article_id: article_id,
      },
    });
    if (res.status === 201) {
      notification['success']({
        message: '게시글이 성공적으로 삭제되었습니다.',
      });
      mutate(`${process.env.NEXT_PUBLIC_ENDPOINT}/article/recent`);
    }
  };

  return (
    <div>
      <Row>
        <Col xl={16} xs={24}>
          <PageHeader
            backIcon={<CommentOutlined />}
            onBack={() => router.push('/')}
            title="하브루타 커뮤니티"
            subTitle={'어떤 이야기든 자유롭게 이야기를 나눠보세요.'}
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
                커뮤니티 활동을 시작해보세요.
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
                    <Space direction="vertical" size={'large'} style={{ width: '100%' }}>
                      <Space>
                        <Popconfirm
                          title={
                            <>
                              <Paragraph>{post.user.user_nickname}</Paragraph>
                              <Paragraph>{post.user.user_introduction}</Paragraph>
                              <Paragraph>{post.user.user_address}</Paragraph>
                            </>
                          }
                          icon={<UserOutlined style={{ color: '#bfbfbf' }} />}
                          okText="지갑 주소 복사"
                          cancelText="닫기"
                          onConfirm={(e) => {
                            e?.stopPropagation();
                            navigator.clipboard.writeText(post.user.user_address);
                            message.success('지갑 주소가 복사되었습니다!');
                          }}
                          onCancel={(e) => {
                            e?.stopPropagation();
                          }}
                        >
                          <Text type="secondary" strong onClick={(e) => e?.stopPropagation()}>
                            {post.user.user_nickname}
                          </Text>
                        </Popconfirm>
                        <Text type="secondary">{timeForToday(post.created_at)}</Text>
                      </Space>
                      <Paragraph ellipsis={{ rows: 4, expandable: true, symbol: 'more' }}>
                        {' '}
                        {post.article_content}
                      </Paragraph>
                      <Space style={{ justifyContent: 'space-between', width: '100%' }}>
                        <Space size={'large'}>
                          <Button
                            type="link"
                            icon={<LikeOutlined />}
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              fetchLike(post.article_id);
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
                        {post.user_id === loginInfo.user_id && (
                          <div onClick={(e) => e.stopPropagation()}>
                            <Popconfirm
                              title="정말 게시글을 삭제하시겠습니까?"
                              onConfirm={() => onPostDelete(post.article_id)}
                              okText="삭제"
                              cancelText="취소"
                            >
                              <DeleteOutlined style={{ color: '#ff7875' }} />
                            </Popconfirm>
                          </div>
                        )}
                      </Space>
                    </Space>
                  </PostCard>
                </div>
              );
            })
          ) : (
            <></>
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
