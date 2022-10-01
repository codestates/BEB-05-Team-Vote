import { Space, Row, Col, PageHeader } from 'antd';
import { useRouter } from 'next/router';
import Reply from '../../../components/community/Reply';
import UploadReply from '../../../components/community/UploadReply';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import Post from '../../../components/community/Post';

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
              <Post type="detail" post={post[0]} />
              {session && <UploadReply />}
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
