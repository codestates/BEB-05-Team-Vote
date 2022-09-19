import { EnterOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, message, Popconfirm, Space, Typography } from 'antd';
import React from 'react';
import { timeForToday } from '../../lib/date';

const { Text, Paragraph } = Typography;

export default function Reply({ comments }: { comments: any }) {
  return (
    <Card style={{ width: '100%', marginTop: '-1px' }}>
      <Space direction="vertical" size={'large'}>
        <Space>
          <EnterOutlined style={{ transform: 'scaleX(-1)' }} />
          <Popconfirm
            title={
              <>
                <Paragraph>{comments.user.user_nickname}</Paragraph>
                <Paragraph>{comments.user.user_introduction}</Paragraph>
                <Paragraph>{comments.user.user_address}</Paragraph>
              </>
            }
            icon={<UserOutlined style={{ color: '#bfbfbf' }} />}
            okText="지갑 주소 복사"
            cancelText="닫기"
            onConfirm={(e) => {
              e?.stopPropagation();
              navigator.clipboard.writeText(comments.user.user_address);
              message.success('지갑 주소가 복사되었습니다!');
            }}
            onCancel={(e) => {
              e?.stopPropagation();
            }}
          >
            <Text
              type="secondary"
              strong
              onClick={(e) => e?.stopPropagation()}
              style={{ cursor: 'pointer' }}
            >
              {comments.user.user_nickname}
            </Text>
          </Popconfirm>
          <Text type="secondary">{timeForToday(comments.created_at)}</Text>
        </Space>
        {comments.comment_content}
        {/* <Space>
          <Button type="link" icon={<MessageOutlined />} size="small">
            {' '}
            답글달기
          </Button>
        </Space> */}
      </Space>
    </Card>
  );
}
