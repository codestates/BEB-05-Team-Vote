import {
  PageHeader,
  Space,
  Row,
  Col,
  Button,
  Input,
  Typography,
  Divider,
  Modal,
  Popconfirm,
  message,
  Card,
  notification,
} from 'antd';
import {
  SettingOutlined,
  CodepenOutlined,
  DeleteOutlined,
  UserOutlined,
  LikeOutlined,
  MessageOutlined,
  EnterOutlined,
} from '@ant-design/icons';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import useSWR, { mutate, useSWRConfig } from 'swr';
import MyInfoComponent from '../../components/mypage/MyInfoComponent';
import MyCommentComponent from '../../components/mypage/MyCommentComponent';
import MyPostComponent from '../../components/mypage/MyPostComponent';
import MyLectureComponent from '../../components/mypage/MyLectureComponent';
import { useRecoilState } from 'recoil';
import { loginInfoState } from '../../states/loginInfoState';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { PostInterface } from '..';
import { timeForToday } from '../../lib/date';

export default function Mypage() {
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoState);
  const [isNickname, setIsNickname] = useState('');
  const [isIntro, setIsIntro] = useState('');

  const router = useRouter();
  const { TextArea } = Input;
  const { Title, Text, Paragraph } = Typography;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  // 내가 쓴 글
  const fetcher = async (url: string) => {
    const res = await axios.get(url);
    return res.data;
  };
  const { data: isArticle } = useSWR(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/user/userarticle?user_id=${loginInfo.user_id}`,
    fetcher
  );

  // 내가 쓴 댓글
  const { data: commentData } = useSWR(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/user/usercomment?user_id=${loginInfo.user_id}`,
    fetcher
  );
  console.log('??S>sss', commentData);

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

  const handleOk = () => {
    axios
      .put(`${process.env.NEXT_PUBLIC_ENDPOINT}/profile`, {
        user_address: loginInfo.user_address,
        user_nickname: isNickname,
        user_introduction: isIntro,
      })
      .then((res) => {
        console.log('응답데이터?', res.data);
      });

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <section>
      <Head>
        <title>마이페이지</title>
      </Head>
      <Space style={{ justifyContent: 'space-between', width: '100%' }}>
        <Space>
          <PageHeader
            backIcon={<SettingOutlined />}
            onBack={() => router.push('/mypage')}
            title="마이페이지"
          ></PageHeader>
        </Space>
      </Space>

      <Row gutter={[20, 24]}>
        <Col span={12}>
          <Space style={{ justifyContent: 'space-between', width: '100%', marginBottom: '8px' }}>
            <Title level={5}>내정보</Title>
            <Button onClick={showModal}>수정</Button>
            <Modal
              title="내 프로필 수정하기"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              okText="저장"
              cancelText="취소"
            >
              <Space
                direction="vertical"
                style={{
                  width: '100%',
                  border: '1px solid grey',
                  padding: '16px',
                  borderRadius: '8px',
                }}
              >
                <label htmlFor="nickname">닉네임</label>
                <Input
                  id="nickname"
                  placeholder={loginInfo.user_nickname}
                  value={isNickname}
                  onChange={(e) => setIsNickname(e.target.value)}
                />
                <label htmlFor="introduction">소개글</label>
                <TextArea
                  id="introduction"
                  rows={3}
                  placeholder={loginInfo.user_introduction}
                  value={isIntro}
                  onChange={(e) => setIsIntro(e.target.value)}
                />
              </Space>
            </Modal>
          </Space>
          <MyInfoComponent />
        </Col>

        <Col span={12}>
          <Space style={{ justifyContent: 'space-between', width: '100%', marginBottom: '8px' }}>
            <Title level={5}>토큰정보</Title>
          </Space>
          <Space
            direction="vertical"
            style={{
              width: '100%',
              border: '1px solid grey',
              padding: '16px',
              borderRadius: '8px',
            }}
          >
            <label htmlFor="user_point">보유 포인트</label>
            <Input id="user_point" value={'1000'} suffix="P" style={{ color: '#bae637' }} />
            <label htmlFor="user_token">보유 토큰 개수</label>
            <Input
              id="user_token"
              value={''}
              disabled
              suffix={<CodepenOutlined style={{ fontSize: '24px', color: '#bae637' }} />}
            />
            <label htmlFor="introduction">NFT 보유 여부</label>
            <TextArea id="introduction" rows={3} placeholder="보유한 PASS가 없습니다." disabled />
          </Space>
        </Col>
      </Row>
      <Divider />

      <Row gutter={[20, 24]}>
        <Col span={12}>
          <Space style={{ justifyContent: 'space-between', width: '100%', marginBottom: '8px' }}>
            <Title level={5}>내가 작성한 게시글</Title>
            <Button onClick={() => router.push('/mypage/myposts')}>모두 보기</Button>
          </Space>
          <Space
            direction="vertical"
            style={{
              width: '100%',
              border: '1px solid grey',
              padding: '16px',
              borderRadius: '8px',
            }}
          >
            {isArticle ? (
              isArticle.map((element: PostInterface, index: number) => {
                if (index < 2) {
                  return (
                    <Card style={{ width: '100%', marginTop: '-1px' }} key={index}>
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
                }
              })
            ) : (
              <div>게시글이 없습니다.</div>
            )}
          </Space>
        </Col>
        <Col span={12}>
          <Space style={{ justifyContent: 'space-between', width: '100%', marginBottom: '8px' }}>
            <Title level={5}>내가 작성한 댓글</Title>
            <Button onClick={() => router.push('/mypage/mycomments')}>모두 보기</Button>
          </Space>

          <Space
            direction="vertical"
            style={{
              width: '100%',
              border: '1px solid grey',
              padding: '16px',
              borderRadius: '8px',
            }}
          >
            {commentData ? (
              commentData.map((element: PostInterface, index: number) => {
                if (index < 2) {
                  return (
                    <Card style={{ width: '100%', marginTop: '-1px' }} key={index}>
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
                }
              })
            ) : (
              <div>댓글이 없습니다.</div>
            )}
          </Space>
        </Col>
      </Row>
      <Divider />

      <Row gutter={[20, 24]}>
        <Col span={24}>
          <Space style={{ justifyContent: 'space-between', width: '100%', marginBottom: '8px' }}>
            <Title level={5}>내가 생성한 강의</Title>
            <Button onClick={() => router.push('/mypage/myuploadlectures')}>모두 보기</Button>
          </Space>
          <MyLectureComponent />
        </Col>
      </Row>
      <Divider />
      <Row gutter={[20, 24]}>
        <Col span={24}>
          <Space style={{ justifyContent: 'space-between', width: '100%', marginBottom: '8px' }}>
            <Title level={5}>내가 수강 중인 강의</Title>
            <Button onClick={() => router.push('/mypage/mylectures')}>모두 보기</Button>
          </Space>
          <MyLectureComponent />
        </Col>
      </Row>
    </section>
  );
}
