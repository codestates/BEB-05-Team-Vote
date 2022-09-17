import { EnterOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { Button, Card, Space, Typography } from 'antd';
import React from 'react';
import { useRecoilState } from 'recoil';
import { PostInterface } from '../../pages';
import { loginInfoState } from '../../states/loginInfoState';

const { Text } = Typography;

export default function Reply({comments}:{comments:any}) {    
  console.log('comments in reply.tsx', comments)
  
  return (    
      <Card style={{ width: '100%', marginTop: '-1px' }}>
        <Space direction="vertical" size={'large'}>
          <Space>
            <EnterOutlined style={{transform:'scaleX(-1)'}} />
            <Text strong>{comments.user.user_nickname}</Text>
            <Text type="secondary">{comments.created_at}</Text>
          </Space>
          {
            comments.comment_content
          }
          <Space>
            <Button type="link" icon={<MessageOutlined />} size="small">
              {' '}
              답글달기
            </Button>            
          </Space>
        </Space>
      </Card>    
  );
}
