import { DeleteOutlined, LikeOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, message, notification, Popconfirm, Space, Typography } from 'antd';
import Paragraph from 'antd/lib/skeleton/Paragraph';
import axios from 'axios';
import { type } from 'os';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import useSWR, { mutate } from 'swr';
import { timeForToday } from '../../lib/date';
import { PostInterface } from '../../pages';
import { loginInfoState } from '../../states/loginInfoState';

export default function MyPostComponent() {
  const fetchLike = async (article_id: number) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/like`, {
      user_id: loginInfo.user_id,
      article_id: article_id,
    });
    if (res.status === 201) {
      mutate(`${process.env.NEXT_PUBLIC_ENDPOINT}/user/userarticle?user_id=${loginInfo.user_id}`);
    }
  };

  const onPostDelete = async (article_id: number) => {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_ENDPOINT}/article`, {
      data: {
        user_id: loginInfo.user_id,
        article_id: article_id,
      },
    });
    if (res.status === 201) {
      notification['success']({
        message: '게시글이 성공적으로 삭제되었습니다.',
      });
      mutate(`${process.env.NEXT_PUBLIC_ENDPOINT}/user/userarticle?user_id=${loginInfo.user_id}`);
    }
  };

  const { Paragraph, Text } = Typography;
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoState);

  type isMyArticle = {
    article_content: string;
    article_id: Number;
    comment_count: Number;
    created_at: string;
    like_count: Number;
    updated_at: string;
  };
  const [isMyArticle, setIsMyArticle] = useState<isMyArticle[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_ENDPOINT}/user/userarticle?user_id=${loginInfo.user_id}`)
      .then((res) => {
        console.log('내가 쓴 글', res.data);
        setIsMyArticle(res.data);
      });
  }, []);

  const { data: isArticle } = useSWR(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/user/userarticle?user_id=${loginInfo.user_id}`
  );

  console.log('이즈마이아티클', isMyArticle);

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
      {isArticle &&
        isArticle.map((element: PostInterface, i: number) => {
          return (
            <Card style={{ width: '100%', marginTop: '-1px' }} key={i}>
              <Space direction="vertical" size={'large'} style={{ width: '100%' }}>
                <Space>
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
                {element.article_content}
                <Space style={{ justifyContent: 'space-between', width: '100%' }}>
                  <Space size={'large'}>
                    <Button
                      type="link"
                      icon={<LikeOutlined />}
                      size="small"
                      onClick={() => fetchLike(element.article_id)}
                    >
                      {' '}
                      {element.like_count}
                    </Button>
                    <Button type="link" icon={<MessageOutlined />} size="small">
                      {' '}
                      {element.comment_count}
                    </Button>
                  </Space>
                  {element.user_id === loginInfo.user_id && (
                    <div onClick={(e) => e.stopPropagation()}>
                      <Popconfirm
                        title="정말 게시글을 삭제하시겠습니까?"
                        onConfirm={() => onPostDelete(element.article_id)}
                        okText="삭제"
                        cancelText="취소"
                      >
                        <DeleteOutlined style={{ color: '#ff7875' }} />
                      </Popconfirm>
                    </div>
                  )}
                </Space>
              </Space>
            </Card>
          );
        })}
    </Space>
  );
}
