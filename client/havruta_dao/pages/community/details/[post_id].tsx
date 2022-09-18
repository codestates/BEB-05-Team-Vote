import { LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { Card, Space, Typography, Button, Row, Col, PageHeader, Skeleton } from 'antd';
import { useRouter } from 'next/router';
import Reply from '../../../components/community/Reply';
import UploadReply from '../../../components/community/UploadReply';
import useSWR from 'swr';

const { Text } = Typography;

export default function PostDetail() {
  const router = useRouter();

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
                <Space direction="vertical" size={'large'}>
                  <Space>
                    <Text strong>{post[0].user.user_nickname}</Text>
                    <Text type="secondary">{post[0].created_at}</Text>
                  </Space>
                  {post[0].article_content}
                  <Space>
                    <Button type="link" icon={<LikeOutlined />} size="small">
                      {' '}
                      {post[0].like_count}
                    </Button>
                    <Button type="link" icon={<MessageOutlined />} size="small">
                      {' '}
                      {post[0].comment_count}
                    </Button>
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
