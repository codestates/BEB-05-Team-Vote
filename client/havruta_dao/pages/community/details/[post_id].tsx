import { Card, Space, Typography, Row, Col, PageHeader } from 'antd';
import { useRouter } from 'next/router';
import Reply from '../../../components/community/Reply';
import UploadReply from '../../../components/community/UploadReply';
import useSWR from 'swr';
import { timeForToday } from '../../../lib/date';
import { useSession } from 'next-auth/react';
import DeleteButton from '../../../components/community/part/DeleteButton';
import CommentButton from '../../../components/community/part/CommentButton';
import LikeButton from '../../../components/community/part/LikeButton';
import NicknamePopover from '../../../components/community/part/NicknamePopover';

const { Text } = Typography;

export default function PostDetail() {
  const router = useRouter();
  const { data: session } = useSession();

  const { data: post } = useSWR(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/article/select?article_id=${router.query.post_id}`
  );

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
                    <NicknamePopover
                      user_nickname={post[0].user.user_nickname}
                      user_introduction={post[0].user.user_introduction}
                      user_address={post[0].user.user_address}
                    />
                    <Text type="secondary">{timeForToday(post[0].created_at)}</Text>
                  </Space>
                  {post[0].article_content}
                  <Space style={{ justifyContent: 'space-between', width: '100%' }}>
                    <Space size={'large'}>
                      <LikeButton article_id={post[0].article_id} like_count={post[0].like_count} />
                      <CommentButton comment_count={post[0].comment_count} />
                    </Space>
                    {post[0].user_id === session?.user.user_id && (
                      <DeleteButton type="post" id={post[0].article_id} />
                    )}
                  </Space>
                </Space>
              </Card>
              {/**댓글 작성 */}
              {session && <UploadReply />}
              {/**댓글 목록 */}
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
            <></>
          )}
        </Col>
      </Row>
    </section>
  );
}
