import { CodepenOutlined } from '@ant-design/icons';
import { Col, Image, Space, Typography } from 'antd';

export default function MyLectureComponent() {
  const { Text, Title } = Typography;

  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
        border: '1px solid grey',
        padding: '16px',
        borderRadius: '8px',
      }}
    >
      <Col span={8} key={1}>
        <Image
          width={'100%'}
          height={'auto'}
          style={{
            objectFit: 'cover',
            marginBottom: '8px',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
          // onClick={() => router.push(`/courses/details/`)}
          src={`https://miricanvas.zendesk.com/hc/article_attachments/360049418812/__________._8.png`}
          alt={`대체 텍스트`}
          preview={false}
          fallback="https://images.unsplash.com/photo-1534337621606-e3df5ee0e97f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80"
        />

        <Title ellipsis={{ rows: 2 }} level={4} style={{ lineHeight: '150%', cursor: 'pointer' }}>
          {`실패없는 주식투자 2개월치`}
        </Title>

        <Space align="center" style={{ justifyContent: 'space-between', width: '100%' }}>
          <Text style={{ fontSize: '16px' }} type="secondary">
            {/* {course.user.user_nickname.length > 10 &&
                    course.user.user_nickname.substr(0, 30) + '...'} */}

            {`Lorem ipsum dolor sit, amet consectetur adipisicing elit. `}
          </Text>
          <Space>
            <CodepenOutlined style={{ fontSize: '24px', color: '#bae637' }} />
            <Text style={{ fontSize: '16px', color: '#bae637', fontWeight: 500 }} type="secondary">
              {`2`}
            </Text>
          </Space>
        </Space>
      </Col>
    </Space>
  );
}
