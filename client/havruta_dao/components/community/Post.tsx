import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Card, Space, Typography } from 'antd';
import styled, { css } from 'styled-components';
import { timeForToday } from '../../lib/date';
import CommentButton from './atom/CommentButton';
import DeleteButton from './atom/DeleteButton';
import LikeButton from './atom/LikeButton';
import NicknamePopover from './atom/NicknamePopover';

const { Text, Paragraph } = Typography;

function Post({ post, type }: { post: PostInterface; type: 'post' | 'detail' }) {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div onClick={() => router.push(`/community/details/${post.article_id}`)}>
      <PostCard _type={type}>
        <Space direction="vertical" size={'large'} style={{ width: '100%' }}>
          <Space>
            <NicknamePopover
              user_nickname={post.user.user_nickname}
              user_introduction={post.user.user_introduction}
              user_address={post.user.user_address}
            />
            <Text type="secondary">{timeForToday(post.created_at)}</Text>
          </Space>
          <Paragraph ellipsis={type === 'post' && { rows: 4, expandable: true, symbol: 'more' }}>
            {post.article_content}
          </Paragraph>
          <Space style={{ justifyContent: 'space-between', width: '100%' }}>
            <Space size={'large'}>
              <LikeButton type={type} article_id={post.article_id} like_count={post.like_count} />
              <CommentButton comment_count={post.comment_count} />
            </Space>
            {post.user_id === session?.user.user_id && (
              <DeleteButton type={type} id={post.article_id} />
            )}
          </Space>
        </Space>
      </PostCard>
    </div>
  );
}

const PostCard = styled(Card)<{ _type: 'post' | 'detail' }>`
  width: 100%;

  ${(props) =>
    props._type === 'post' &&
    css`
      margin-top: -1px;
      :hover {
        cursor: pointer;
        background-color: rgba(200, 200, 200, 0.1);
      }
    `}
`;

export default Post;
