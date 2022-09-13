import { LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { Button, Card, Space, Typography } from 'antd';
import Link from 'next/link';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { PostInterface } from '../../pages';

const { Text } = Typography;

export default function Post({article}: {article:PostInterface}) { 
  console.log(article)   
  
  // console.log('포스트리스트?', postList[0].article_id)
  // const post: PostInterface = {
  //   id: `${postList.article_id}`,
  //   author: '',
  //   content: '',
  //   like: 0,
  //   commentCount: 0,
  //   createdDate: '',
  // };  
  return (

    
    <Link href={`/community/details/${article.article_id}`}>
      <PostCard>
        <Space direction="vertical" size={'large'}>
          <Space>
            <Text strong>{article.user.user_nickname}</Text>
            <Text type="secondary">{article.created_at}</Text>
          </Space>
          {article.article_content}
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
              {article.like_count}
            </Button>
            <Button type="link" icon={<MessageOutlined />} size="small">
              {' '}
              {article.comment_count}
            </Button>
          </Space>
        </Space>
      </PostCard>
    </Link>
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
