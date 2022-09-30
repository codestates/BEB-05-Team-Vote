import React from 'react';
import { message, Popconfirm, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { NicknamePopover } from '../../../types/Post';

const { Text, Paragraph } = Typography;

function NicknamePopover({ user_nickname, user_introduction, user_address }: NicknamePopover) {
  return (
    <Popconfirm
      title={
        <>
          <Paragraph>{user_nickname}</Paragraph>
          <Paragraph>{user_introduction}</Paragraph>
          <Paragraph>{user_address}</Paragraph>
        </>
      }
      icon={<UserOutlined style={{ color: '#bfbfbf' }} />}
      okText="지갑 주소 복사"
      cancelText="닫기"
      onConfirm={(e) => {
        e?.stopPropagation();
        navigator.clipboard.writeText(user_address);
        message.success('지갑 주소가 복사되었습니다!');
      }}
      onCancel={(e) => {
        e?.stopPropagation();
      }}
    >
      <Text type="secondary" strong onClick={(e) => e?.stopPropagation()}>
        {user_nickname}
      </Text>
    </Popconfirm>
  );
}

export default NicknamePopover;
