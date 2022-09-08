import { EnterOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { Button, Card, Space, Typography } from 'antd';
import React from 'react';

const { Text } = Typography;

const reply = {
  author: 'SUNGMAN5',
  content:
    '그림자는 피는 산야에 뜨고, 부패뿐이다. 얼마나 대한 가슴에 없는 구하지 이것은 무엇을 풀이 뿐이다. 끓는 그들은 하는 광야에서 불어 위하여 꽃 없으면, 하는 사막이다.그림자는 피는 산야에 뜨고, 부패뿐이다. 얼마나 대한 가슴에 없는 구하지 이것은 무엇을 풀이 뿐이다.',
  like: 22,
  commentCount: 22,
  createdDate: '09-03-2022',
};

export default function Reply() {
  return (
    <>
      <Card style={{ width: '100%', marginTop: '-1px' }}>
        <Space direction="vertical" size={'large'}>
          <Space>
            <EnterOutlined style={{transform:'scaleX(-1)'}} />
            <Text strong>악플러</Text>
            <Text type="secondary">{reply.createdDate}</Text>
          </Space>
          {`${'@sungman5'} ${reply.content}`}
          <Space>
            <Button type="link" icon={<MessageOutlined />} size="small">
              {' '}
              답글달기
            </Button>            
          </Space>
        </Space>
      </Card>
    </>
  );
}
