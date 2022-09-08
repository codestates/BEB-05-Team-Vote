import { Button, Card, Input, Space, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { Post } from '../../pages';

const { TextArea } = Input;
const { Title, Text } = Typography;

const post: Post = {
  author: 'SUNGMAN5',
  content:
    '그림자는 피는 산야에 뜨고, 부패뿐이다. 얼마나 대한 가슴에 없는 구하지 이것은 무엇을 풀이 뿐이다. 끓는 그들은 하는 광야에서 불어 위하여 꽃 없으면, 하는 사막이다.그림자는 피는 산야에 뜨고, 부패뿐이다. 얼마나 대한 가슴에 없는 구하지 이것은 무엇을 풀이 뿐이다.',
  like: 22,
  commentCount: 22,
  createdDate: '09-03-2022',
};

export default function UploadPost() {
  return (
    <UploadCard style={{ width: '100%' }}>
      <Space direction="vertical" size={'middle'} style={{ width: '100%' }}>
        <Space>
          <Text strong>{post.author}</Text>
        </Space>
        <TextArea
          rows={5}
          bordered={false}
          placeholder="내용을 입력하세요."
          style={{ padding: 0 }}
        />
        <Button type="primary" shape={'round'} style={{ float: 'right' }}>
          발행하기
        </Button>
      </Space>
    </UploadCard>
  );
}

const UploadCard = styled(Card)`
  background-color: #f9f9f9;
`;
