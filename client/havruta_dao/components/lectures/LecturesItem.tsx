import React from 'react';
import { Col, Space, Typography, Image } from 'antd';
import { CodepenOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

const { Title, Text } = Typography;

function LecturesItem({ lecture }: { lecture: Lecture }) {
  const router = useRouter();
  return (
    <Col span={8} key={lecture.lecture_id}>
      <Image
        width={'100%'}
        height={'auto'}
        style={{
          objectFit: 'cover',
          marginBottom: '8px',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
        onClick={() => router.push(`/lectures/details/${lecture.lecture_id}`)}
        src={`${lecture.lecture_image}`}
        alt={lecture.lecture_title}
        preview={false}
        fallback="https://images.unsplash.com/photo-1534337621606-e3df5ee0e97f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80"
      />

      <Title
        ellipsis={{ rows: 1 }}
        level={4}
        style={{ lineHeight: '150%', cursor: 'pointer' }}
        onClick={() => router.push(`/lectures/details/${lecture.lecture_id}`)}
        title={lecture.lecture_title}
      >
        {lecture.lecture_title}
      </Title>

      <Space align="center" style={{ justifyContent: 'space-between', width: '100%' }}>
        <Text style={{ fontSize: '16px', overflow: 'hidden' }} type="secondary">
          {lecture.user.user_nickname.length > 10
            ? lecture.user.user_nickname.substr(0, 10) + '...'
            : lecture.user.user_nickname}
        </Text>
        <Space>
          {lecture.lecture_price === 0 ? (
            <Text style={{ fontSize: '20px', color: '#bae637', fontWeight: 500 }} type="secondary">
              무료
            </Text>
          ) : (
            <>
              <CodepenOutlined style={{ fontSize: '24px', color: '#bae637' }} />
              <Text
                style={{ fontSize: '20px', color: '#bae637', fontWeight: 500 }}
                type="secondary"
              >
                {lecture.lecture_price}
              </Text>
            </>
          )}
        </Space>
      </Space>
    </Col>
  );
}

export default LecturesItem;
