import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Card, Space, Typography } from 'antd';
import styled from 'styled-components';
import { timeForToday } from '../../lib/date';
import { PostInterface } from '../../types/Post';
import CommentButton from './part/CommentButton';
import DeleteButton from './part/DeleteButton';
import LikeButton from './part/LikeButton';
import NicknamePopover from './part/NicknamePopover';

const { Text, Paragraph } = Typography;

function Post({ post }: { post: PostInterface }) {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div onClick={() => router.push(`/community/details/${post.article_id}`)}>
      <PostCard>
        <Space direction="vertical" size={'large'} style={{ width: '100%' }}>
          {/**글 상단 */}
          <Space>
            <NicknamePopover
              user_nickname={post.user.user_nickname}
              user_introduction={post.user.user_introduction}
              user_address={post.user.user_address}
            />
            <Text type="secondary">{timeForToday(post.created_at)}</Text>
          </Space>
          {/**글 본문 */}
          <Paragraph ellipsis={{ rows: 4, expandable: true, symbol: 'more' }}>
            {post.article_content}
          </Paragraph>
          {/**글 하단 */}
          <Space style={{ justifyContent: 'space-between', width: '100%' }}>
            <Space size={'large'}>
              <LikeButton article_id={post.article_id} like_count={post.like_count} />
              <CommentButton comment_count={post.comment_count} />
            </Space>
            {post.user_id === session?.user.user_id && (
              <DeleteButton type="post" id={post.article_id} />
            )}
          </Space>
        </Space>
      </PostCard>
    </div>
  );
}

const PostCard = styled(Card)`
  width: 100%;
  margin-top: -1px;

  :hover {
    cursor: pointer;
    background-color: rgba(200, 200, 200, 0.1);
  }
`;

export default Post;
