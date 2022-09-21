import { DeleteOutlined, LikeOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Popconfirm, Space, Typography } from 'antd';
import Paragraph from 'antd/lib/skeleton/Paragraph';

export default function MyPostComponent() {
  const { Paragraph, Text } = Typography;

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
      <Card style={{ width: '100%', marginTop: '-1px' }}>
        <Space direction="vertical" size={'large'} style={{ width: '100%' }}>
          <Space>
            <Popconfirm
              title={
                <>
                  <Paragraph>{`유저닉네임`}</Paragraph>
                  <Paragraph>{'유저소개'}</Paragraph>
                  <Paragraph>{'유저 지갑 주소'}</Paragraph>
                </>
              }
              icon={<UserOutlined style={{ color: '#bfbfbf' }} />}
              okText="지갑 주소 복사"
              cancelText="닫기"
              //   onConfirm={(e) => {
              //     e?.stopPropagation();
              //     navigator.clipboard.writeText(post[0].user.user_address);
              //     message.success('지갑 주소가 복사되었습니다!');
              //   }}
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
                {'유저 닉네임'}
              </Text>
            </Popconfirm>
            {/* <Text type="secondary">{timeForToday(post[0].created_at)}</Text> */}
            <Text type="secondary">{'업로드 후 경과시간'}</Text>
          </Space>
          {'포스트 콘텐츠'}
          <Space style={{ justifyContent: 'space-between', width: '100%' }}>
            <Space size={'large'}>
              <Button
                type="link"
                icon={<LikeOutlined />}
                size="small"
                // onClick={() => fetchLike(post[0].article_id)}
              >
                {' '}
                {/* {post[0].like_count} */}
                {22}
              </Button>
              <Button type="link" icon={<MessageOutlined />} size="small">
                {' '}
                {/* {post[0].comment_count} */}
                {21}
              </Button>
            </Space>
            {/* {post[0].user_id === loginInfo.user_id && (
                      <div onClick={(e) => e.stopPropagation()}> */}
            <Popconfirm
              title="정말 게시글을 삭제하시겠습니까?"
              //   onConfirm={() => onPostDelete(post[0].article_id)}
              okText="삭제"
              cancelText="취소"
            >
              <DeleteOutlined style={{ color: '#ff7875' }} />
            </Popconfirm>
            {/* </div>
                    )} */}
          </Space>
        </Space>
      </Card>
    </Space>
  );
}
