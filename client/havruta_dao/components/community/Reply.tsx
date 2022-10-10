import React from 'react';
import { EnterOutlined } from '@ant-design/icons';
import { Card, Space, Typography } from 'antd';
import { timeForToday } from '../../lib/date';
import { useSession } from 'next-auth/react';
import NicknamePopover from './atom/NicknamePopover';
import DeleteButton from './atom/DeleteButton';

const { Text } = Typography;

export default function Reply({ comments }: { comments: any }) {
  const { data: session } = useSession();
  console.log(comments);
  return (
    <Card style={{ width: '100%', marginTop: '-1px' }}>
      <Space direction="vertical" size={'large'} style={{ width: '100%' }}>
        <Space>
          <EnterOutlined style={{ transform: 'scaleX(-1)' }} />
          <NicknamePopover
            user_address={comments.user.user_address}
            user_introduction={comments.user.user_introduction}
            user_nickname={comments.user.user_nickname}
          />
          <Text type="secondary">{timeForToday(comments.created_at)}</Text>
        </Space>
        {comments.comment_content}
        <Space style={{ width: '100%', justifyContent: 'end' }}>
          {comments.user.user_id === session?.user.user_id && (
            <DeleteButton type="comment" id={comments.id} />
          )}
        </Space>
      </Space>
    </Card>
  );
}
