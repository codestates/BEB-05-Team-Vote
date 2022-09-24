import { DeleteOutlined, EnterOutlined, UserOutlined } from '@ant-design/icons';
import {
  Card,
  Popconfirm,
  Space,
  Typography,
  List,
  Comment,
  Tooltip,
  message,
  notification,
} from 'antd';
import Paragraph from 'antd/lib/skeleton/Paragraph';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import useSWR, { mutate } from 'swr';
import { timeForToday } from '../../lib/date';
import { PostInterface } from '../../pages';
import { loginInfoState } from '../../states/loginInfoState';

export default function MyCommentComponent() {
  const { Text, Paragraph } = Typography;
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoState);

  const fetcher = async (url: string) => {
    const res = await axios.get(url);
    return res.data;
  };

  const { data: commentData } = useSWR(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/user/usercomment?user_id=${loginInfo.user_id}`,
    fetcher
  );

  const onCommentDelete = async (id: number) => {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_ENDPOINT}/comment`, {
      data: {
        user_id: loginInfo.user_id,
        comment_id: id,
      },
    });
    if (res.status === 201) {
      notification['success']({
        message: '게시글이 성공적으로 삭제되었습니다.',
      });
      mutate(`${process.env.NEXT_PUBLIC_ENDPOINT}/user/usercomment?user_id=${loginInfo.user_id}`);
    }
  };

  console.log('코멘트데이터', commentData);

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
      {commentData &&
        commentData.map((element: PostInterface, i: number) => {
          return (
            <Card style={{ width: '100%', marginTop: '-1px' }} key={i}>
              <Space direction="vertical" size={'large'} style={{ width: '100%' }}>
                <Space>
                  <EnterOutlined style={{ transform: 'scaleX(-1)' }} />
                  <Popconfirm
                    title={
                      <>
                        <Paragraph>{loginInfo.user_nickname}</Paragraph>
                        <Paragraph>{loginInfo.user_introduction}</Paragraph>
                        <Paragraph>{loginInfo.user_address}</Paragraph>
                      </>
                    }
                    icon={<UserOutlined style={{ color: '#bfbfbf' }} />}
                    okText="지갑 주소 복사"
                    cancelText="닫기"
                    onConfirm={(e) => {
                      e?.stopPropagation();
                      navigator.clipboard.writeText(loginInfo.user_address);
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
                      {loginInfo.user_nickname}
                    </Text>
                  </Popconfirm>
                  <Text type="secondary">{timeForToday(element.created_at)}</Text>
                </Space>
                {element.comment_content}
                <Space style={{ width: '100%', justifyContent: 'end' }}>
                  {element.user_id === loginInfo.user_id && (
                    <div onClick={(e) => e.stopPropagation()}>
                      <Popconfirm
                        title="정말 댓글을 삭제하시겠습니까?"
                        onConfirm={() => onCommentDelete(element.id)}
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
        })}
    </Space>
  );
}
