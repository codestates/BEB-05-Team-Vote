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
  Result,
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
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR, { mutate } from 'swr';
import MyInfoComponent from '../../components/mypage/MyInfoComponent';
import MyLectureComponent from '../../components/mypage/MyLectureComponent';
import { useRecoilState } from 'recoil';
import { loginInfoState } from '../../states/loginInfoState';
import axios from 'axios';
import { timeForToday } from '../../lib/date';
import * as Sentry from '@sentry/react';
import { useSession } from 'next-auth/react';
import { reloadSession } from '../../lib/useReloadSession';
import SubscribeLectureComponent from '../../components/mypage/SubscribeLectureComponent';
import Caver from 'caver-js';
import { HADAPassState } from '../../states/HADAPassState';
import { noti } from '../../lib/notification';

const { TextArea } = Input;
const { Title, Text, Paragraph } = Typography;

const caver = new Caver('https://api.baobab.klaytn.net:8651');

export default function Mypage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoState);
  const [isPass, setIsPass] = useRecoilState(HADAPassState);
  const [isNickname, setIsNickname] = useState(loginInfo.user_nickname);
  const [isIntro, setIsIntro] = useState(loginInfo.user_introduction);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tokenBalance, setTokenBalance] = useState('');

  const showModal = () => {
    setIsModalVisible(true);
  };

  // 내가 쓴 글
  const { data: isArticle } = useSWR(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/user/userarticle?user_id=${loginInfo.user_id}`
  );

  // 내가 쓴 댓글
  const { data: commentData } = useSWR(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/user/usercomment?user_id=${loginInfo.user_id}`
  );

  // 강의 수강 목록
  const { data: subscribeLecture } = useSWR(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/user/userclass?user_id=${loginInfo.user_id}`
  );

  // 강의 생성 목록
  const { data: createdLecture } = useSWR(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/user/userlecture?user_id=${loginInfo.user_id}`
  );

  useEffect(() => {
    if (session) {
      getBalanceToken();
      getBalanceNFT();
    }
  }, []);

  const getBalanceToken = async () => {
    const token = new caver.klay.KIP7(process.env.NEXT_PUBLIC_HADATOKEN);
    if (token) {
      const pebBalance = await token.balanceOf(loginInfo.user_address);
      const klayBalance = await caver.utils.convertFromPeb(pebBalance, 'KLAY');
      setTokenBalance(String(klayBalance));
    }
  };

  const getBalanceNFT = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_ENDPOINT}/nft?user_address=${loginInfo.user_address}`
      );
      if (res.status === 201) {
        const isPass = Number(res.data) > 0;
        setIsPass({ isPass: isPass });
      }
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  const approveHADATokenToHADAPassCA = async () => {
    const data = window.caver.klay.abi.encodeFunctionCall(
      {
        name: 'approve',
        type: 'function',
        inputs: [
          {
            type: 'address',
            name: 'recipient',
          },
          {
            type: 'uint256',
            name: 'amount',
          },
        ],
      },
      [
        process.env.NEXT_PUBLIC_HADAPASS_CA,
        window.caver.utils
          .toBN(20)
          .mul(window.caver.utils.toBN(Number(`1e18`)))
          .toString(),
      ]
    );

    window.caver.klay
      .sendTransaction({
        type: 'SMART_CONTRACT_EXECUTION',
        from: loginInfo.user_address,
        to: process.env.NEXT_PUBLIC_HADATOKEN,
        data,
        gas: '3000000',
      })
      .on('transactionHash', (transactionHash: any) => {
        console.log('txHash', transactionHash);
      })
      .on('receipt', (receipt: any) => {
        console.log('receipt', receipt);
        mintHADAPASS();
        getBalanceNFT();
      })
      .on('error', (error: any) => {
        console.log('error', error.message);
        Sentry.captureException(error.message);
        return noti('error', 'HADA PASS 발행에 실패하였습니다!');
      });
  };

  const mintHADAPASS = async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/nft`, {
        recipient: loginInfo.user_address,
      });

      if (res.status === 201) {
        return noti(
          'success',
          'HADA PASS가 성공적으로 발행되었습니다.',
          '이제부터 모든 강의를 자유롭게 이용하실 수 있습니다!'
        );
      } else if (res.status === 403) {
        return noti('warning', 'HADA PASS 발행에 필요한 토큰이 부족합니다!');
      }
    } catch (error) {
      Sentry.captureException(error);
    }
  };

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
      noti('success', '게시글이 성공적으로 삭제되었습니다.');
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
      noti('success', '게시글이 성공적으로 삭제되었습니다.');
      mutate(`${process.env.NEXT_PUBLIC_ENDPOINT}/user/usercomment?user_id=${loginInfo.user_id}`);
    }
  };

  const handleOk = async () => {
    if (!isNickname.length) {
      return noti('warning', '변경할 닉네임을 입력해주세요!.');
    }
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_ENDPOINT}/profile`, {
        user_address: loginInfo.user_address,
        user_nickname: isNickname,
        user_introduction: isIntro,
      });

      if (res.status === 201) {
        setIsModalVisible(false);
        const { data: res } = await axios.get('/api/auth/session?update');
        reloadSession();
        noti('success', '프로필이 성공적으로 업데이트 되었습니다.');
      }
    } catch (error) {
      Sentry.captureException(error);
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const addTokenOnWallet = () => {
    window.klaytn.sendAsync(
      {
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: process.env.NEXT_PUBLIC_HADATOKEN,
            symbol: 'HADA',
            decimals: '18',
            image:
              'https://user-images.githubusercontent.com/64685759/192302728-1b284976-57fe-4ece-b3bb-86676eedd7fe.png',
          },
        },
        id: Math.round(Math.random() * 100000),
      },
      (err: any, result: any) => {
        console.log(err, result);
        if (result.result === true) {
          noti('success', '토큰이 성공적으로 등록되었습니다.');
        }
      }
    );
  };
  return (
    <section>
      {session ? (
        <>
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
            <Col xxl={12} xs={24}>
              <Space
                style={{ justifyContent: 'space-between', width: '100%', marginBottom: '8px' }}
              >
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

            <Col xxl={12} xs={24}>
              <Space
                style={{ justifyContent: 'space-between', width: '100%', marginBottom: '8px' }}
              >
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
                {/* <label htmlFor="user_point">보유 포인트</label>
            <Input id="user_point" value={'1000'} suffix="P" style={{ color: '#bae637' }} /> */}
                <label htmlFor="user_token">보유 토큰 개수</label>
                <Input
                  id="user_token"
                  readOnly
                  value={tokenBalance + ' HADA'}
                  addonBefore={<CodepenOutlined style={{ fontSize: '24px', color: '#bae637' }} />}
                />
                <label htmlFor="introduction">HADA PASS 보유 여부</label>
                <TextArea
                  id="introduction"
                  rows={3}
                  value={
                    isPass.isPass ? 'HADA PASS 보유 중입니다.' : '보유 중인 HADA PASS가 없습니다.'
                  }
                  readOnly
                />
                <Row gutter={[8, 8]}>
                  <Col xxl={12} xs={24}>
                    <Button
                      style={{ whiteSpace: 'normal', width: '100%' }}
                      size="large"
                      type="default"
                      onClick={approveHADATokenToHADAPassCA}
                      block
                    >
                      HADA PASS 발행하기
                    </Button>
                  </Col>
                  <Col xxl={12} xs={24}>
                    <Button
                      style={{ whiteSpace: 'normal', width: '100%' }}
                      size="large"
                      type="primary"
                      onClick={addTokenOnWallet}
                      block
                    >
                      HADA 토큰 지갑에 추가
                    </Button>
                  </Col>
                </Row>
              </Space>
            </Col>
          </Row>
          <Divider />

          <Row gutter={[20, 24]}>
            <Col xxl={12} xs={24}>
              <Space
                style={{ justifyContent: 'space-between', width: '100%', marginBottom: '8px' }}
              >
                <Title level={5}>내가 작성한 게시글</Title>
                {isArticle && isArticle.length > 2 && (
                  <Button onClick={() => router.push('/mypage/myposts')}>모두 보기</Button>
                )}
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
                {isArticle && isArticle.length ? (
                  isArticle.map((element: PostInterface, index: number) => {
                    if (index < 2) {
                      return (
                        <Card
                          style={{ width: '100%', marginTop: '-1px', cursor: 'pointer' }}
                          key={index}
                          onClick={() => {
                            router.push(`/community/details/${element.article_id}`);
                          }}
                        >
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
                  <div>작성한 게시글이 없습니다.</div>
                )}
              </Space>
            </Col>
            <Col xxl={12} xs={24}>
              <Space
                style={{ justifyContent: 'space-between', width: '100%', marginBottom: '8px' }}
              >
                <Title level={5}>내가 작성한 댓글</Title>
                {commentData && commentData.length > 2 && (
                  <Button onClick={() => router.push('/mypage/mycomments')}>모두 보기</Button>
                )}
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
                {commentData && commentData.length ? (
                  commentData.map((element: PostInterface, index: number) => {
                    if (index < 2) {
                      return (
                        <Card
                          style={{ width: '100%', marginTop: '-1px', cursor: 'pointer' }}
                          key={index}
                          onClick={() => {
                            router.push(`/community/details/${element.article_id}`);
                          }}
                        >
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
                  <div>작성한 댓글이 없습니다.</div>
                )}
              </Space>
            </Col>
          </Row>
          <Divider />

          <Row gutter={[20, 24]}>
            <Col span={24}>
              <Space
                style={{ justifyContent: 'space-between', width: '100%', marginBottom: '8px' }}
              >
                <Title level={5}>내가 생성한 강의</Title>
                {createdLecture && createdLecture.length > 4 && (
                  <Button onClick={() => router.push('/mypage/myuploadlectures')}>모두 보기</Button>
                )}
              </Space>
              <Space
                style={{
                  width: '100%',
                  border: '1px solid grey',
                  padding: '16px',
                  borderRadius: '8px',
                }}
              >
                {createdLecture && createdLecture.length ? (
                  <MyLectureComponent data={createdLecture} />
                ) : (
                  <div>내가 생성한 강의가 없습니다.</div>
                )}
              </Space>
            </Col>
          </Row>
          <Divider />
          <Row gutter={[20, 24]}>
            <Col span={24}>
              <Space
                style={{ justifyContent: 'space-between', width: '100%', marginBottom: '8px' }}
              >
                <Title level={5}>내가 수강 중인 강의</Title>
                {subscribeLecture && subscribeLecture.length > 4 && (
                  <Button onClick={() => router.push('/mypage/mylectures')}>모두 보기</Button>
                )}
              </Space>
              <Space
                style={{
                  width: '100%',
                  border: '1px solid grey',
                  padding: '16px',
                  borderRadius: '8px',
                }}
              >
                {subscribeLecture && subscribeLecture.length ? (
                  <SubscribeLectureComponent data={subscribeLecture} />
                ) : (
                  <div>수강 중인 강의가 없습니다.</div>
                )}
              </Space>
            </Col>
          </Row>
        </>
      ) : (
        <Space style={{ width: '100%', justifyContent: 'center', height: '100vh' }}>
          <Result
            status="403"
            title="403"
            subTitle="이 페이지에 접근할 권한이 없습니다."
            extra={
              <Button type="primary" onClick={() => router.push('/')}>
                홈으로
              </Button>
            }
          />
        </Space>
      )}
    </section>
  );
}
