import { LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { Button, Card, Space, Typography } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { PostInterface } from '../../pages';

const { Text } = Typography;

const post: PostInterface = {
  id: 1,
  author: 'SUNGMAN5',
  content:
    '그림자는 피는 산야에 뜨고, 부패뿐이다. 얼마나 대한 가슴에 없는 구하지 이것은 무엇을 풀이 뿐이다. 끓는 그들은 하는 광야에서 불어 위하여 꽃 없으면, 하는 사막이다.그림자는 피는 산야에 뜨고, 부패뿐이다. 얼마나 대한 가슴에 없는 구하지 이것은 무엇을 풀이 뿐이다.',
  like: 22,
  commentCount: 22,
  createdDate: '09-03-2022',
};

export default function Post() {
  const router = useRouter();
  return (
    <PostCard onClick={() => router.push(`/community/details/${post.id}`)}>
      <Space direction="vertical" size={'large'}>
        <Space>
          <Text strong>{post.author}</Text>
          <Text type="secondary">{post.createdDate}</Text>
        </Space>
        {post.content}
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
            {post.commentCount}
          </Button>
          <Button type="link" icon={<MessageOutlined />} size="small">
            {' '}
            {post.commentCount}
          </Button>
        </Space>
      </Space>
    </PostCard>
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
