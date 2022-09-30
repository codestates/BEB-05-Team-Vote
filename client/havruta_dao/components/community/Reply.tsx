import { DeleteOutlined, EnterOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons';
import { Card, message, Popconfirm, Space, Typography } from 'antd';
import axios from 'axios';
import React from 'react';
import { useRecoilState } from 'recoil';
import { timeForToday } from '../../lib/date';
import { loginInfoState } from '../../states/loginInfoState';
import { useSWRConfig } from 'swr';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { noti } from '../../lib/notification';

const { Text, Paragraph } = Typography;

export default function Reply({ comments }: { comments: any }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoState);
  const { mutate } = useSWRConfig();

  const onCommentDelete = async (comment_id: number) => {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_ENDPOINT}/comment`, {
      data: {
        user_id: loginInfo.user_id,
        comment_id: comment_id,
      },
    });
    if (res.status === 201) {
      noti('success', '댓글이 성공적으로 삭제되었습니다.');
      mutate(
        `${process.env.NEXT_PUBLIC_ENDPOINT}/article/select?article_id=${router.query.post_id}`
      );
    }
  };

  return (
    <Card style={{ width: '100%', marginTop: '-1px' }}>
      <Space direction="vertical" size={'large'} style={{ width: '100%' }}>
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
        <Space style={{ width: '100%', justifyContent: 'end' }}>
          {comments.user_id === session?.user.user_id && (
            <div onClick={(e) => e.stopPropagation()}>
              <Popconfirm
                title="정말 댓글을 삭제하시겠습니까?"
                onConfirm={() => onCommentDelete(comments.id)}
                okText="삭제"
                cancelText="취소"
              >
                <DeleteOutlined style={{ color: '#ff7875' }} />
              </Popconfirm>
            </div>
          )}
        </Space>

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
