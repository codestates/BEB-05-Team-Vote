import { DeleteOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import {
  Card,
  Space,
  Typography,
  Button,
  Row,
  Col,
  PageHeader,
  Skeleton,
  Popconfirm,
  notification,
} from 'antd';
import { useRouter } from 'next/router';
import Reply from '../../../components/community/Reply';
import UploadReply from '../../../components/community/UploadReply';
import useSWR from 'swr';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { loginInfoState } from '../../../states/loginInfoState';
import { useSWRConfig } from 'swr';
import { timeForToday } from '../../../lib/date';

const { Text } = Typography;

export default function PostDetail() {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoState);

  const { data: post } = useSWR(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/article/select?article_id=${router.query.post_id}`
  );

  const fetchLike = async (article_id: number) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/like`, {
      user_id: loginInfo.user_id,
      article_id: article_id,
    });
    if (res.status === 201) {
      mutate(
        `${process.env.NEXT_PUBLIC_ENDPOINT}/article/select?article_id=${router.query.post_id}`
      );
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
      router.push('/');
      notification['success']({
        message: '게시글이 성공적으로 삭제되었습니다.',
      });
      mutate(
        `${process.env.NEXT_PUBLIC_ENDPOINT}/article/select?article_id=${router.query.post_id}`
      );
    }
  };

  return (
    <section>
      <Space style={{ width: '100%' }}>
        <PageHeader title="목록으로" style={{ paddingLeft: 0 }} onBack={() => router.back()} />
      </Space>
      <Row gutter={48}>
        <Col span={16}>
          {post ? (
            <>
              <Card style={{ width: '100%', marginTop: '-1px' }}>
                <Space direction="vertical" size={'large'} style={{ width: '100%' }}>
                  <Space>
                    <Text strong>{post[0].user.user_nickname}</Text>
                    <Text type="secondary">{timeForToday(post[0].created_at)}</Text>
                  </Space>
                  {post[0].article_content}
                  <Space style={{ justifyContent: 'space-between', width: '100%' }}>
                    <Space size={'large'}>
                      <Button
                        type="link"
                        icon={<LikeOutlined />}
                        size="small"
                        onClick={() => fetchLike(post[0].article_id)}
                      >
                        {' '}
                        {post[0].like_count}
                      </Button>
                      <Button type="link" icon={<MessageOutlined />} size="small">
                        {' '}
                        {post[0].comment_count}
                      </Button>
                    </Space>
                    {post[0].user_id === loginInfo.user_id && (
                      <div onClick={(e) => e.stopPropagation()}>
                        <Popconfirm
                          title="정말 게시글을 삭제하시겠습니까?"
                          onConfirm={() => onPostDelete(post[0].article_id)}
                          okText="삭제"
                          cancelText="취소"
                        >
                          <DeleteOutlined style={{ color: '#ff7875' }} />
                        </Popconfirm>
                      </div>
                    )}
                  </Space>
                </Space>
              </Card>
              <UploadReply />

              {post[0].comments.length === 0 ? (
                <div style={{ textAlign: `center`, paddingTop: '32px' }}>
                  댓글이 없습니다. 첫 댓글을 달아보세요!
                </div>
              ) : (
                post[0].comments.map((comment: any) => {
                  return <Reply key={comment.id} comments={comment} />;
                })
              )}
            </>
          ) : (
            <Skeleton />
          )}
        </Col>
      </Row>
    </section>
  );
}
