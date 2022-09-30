import { Space, Typography } from 'antd';
import React from 'react';

const { Text } = Typography;

function UploadPostNotLogined() {
  return (
    <Space
      align="center"
      style={{
        width: '100%',
        justifyContent: 'center',
        paddingTop: '20px',
        paddingBottom: '40px',
      }}
    >
      <Text style={{ fontSize: '20px' }}>
        지금 지갑을 연결하고
        <br />
        커뮤니티 활동을 시작해보세요.
      </Text>
    </Space>
  );
}

export default UploadPostNotLogined;
