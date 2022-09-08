import { LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { Card, Space, Typography, Button, Row, Col, PageHeader } from 'antd';
import { useRouter } from 'next/router';
import Reply from '../../../components/community/Reply';
import UploadReply from '../../../components/community/UploadReply';

const post = {
  author: 'SUNGMAN5',
  content:
    '그림자는 피는 산야에 뜨고, 부패뿐이다. 얼마나 대한 가슴에 없는 구하지 이것은 무엇을 풀이 뿐이다. 끓는 그들은 하는 광야에서 불어 위하여 꽃 없으면, 하는 사막이다.그림자는 피는 산야에 뜨고, 부패뿐이다. 얼마나 대한 가슴에 없는 구하지 이것은 무엇을 풀이 뿐이다.',
  like: 22,
  commentCount: 22,
  createdDate: '09-03-2022',
};

export default function PostDetail() {
  const { Title, Paragraph, Text } = Typography;

  const router = useRouter();
  return (
    <section>
      <Space style={{ width: '100%' }}>
        <PageHeader title="목록으로" style={{ paddingLeft: 0 }} onBack={() => router.back()} />
      </Space>
      <Row gutter={48}>
        <Col span={16}>
          <Card style={{ width: '100%', marginTop: '-1px' }}>
            <Space direction="vertical" size={'large'}>
              <Space>
                <Text strong>{post.author}</Text>
                <Text type="secondary">{post.createdDate}</Text>
              </Space>
              {post.content}
              <Space>
                <Button type="link" icon={<LikeOutlined />} size="small">
                  {' '}
                  {post.commentCount}
                </Button>
                <Button type="link" icon={<MessageOutlined />} size="small">
                  {' '}
                  {post.commentCount}
                </Button>
              </Space>
            </Space>
          </Card>
          <UploadReply />
          <Reply />
        </Col>
        <Col span={16}>{/* 빈칸입니다. */}</Col>
      </Row>
    </section>
  );
}
