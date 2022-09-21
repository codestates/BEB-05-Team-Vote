import { PageHeader, Space, Row, Col, Button, Input, Typography, Divider, Modal } from 'antd';
import { SettingOutlined, CodepenOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import useSWR from 'swr';
import MyInfoComponent from '../../components/mypage/MyInfoComponent';
import MyCommentComponent from '../../components/mypage/MyCommentComponent';
import MyPostComponent from '../../components/mypage/MyPostComponent';
import MyLectureComponent from '../../components/mypage/MyLectureComponent';
import { useRecoilState } from 'recoil';
import { loginInfoState } from '../../states/loginInfoState';
import axios from 'axios';

export default function Mypage() {
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoState);
  const [isNickname, setIsNickname] = useState('');
  const [isIntro, setIsIntro] = useState('');

  const router = useRouter();
  const { TextArea } = Input;
  const { Title } = Typography;
  const [isModalVisible, setIsModalVisible] = useState(false);
  console.log(loginInfo);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    console.log(isNickname);
    console.log(isIntro);
    axios
      .put(`${process.env.NEXT_PUBLIC_ENDPOINT}/profile`, {
        user_address: loginInfo.user_address,
        user_nickname: isNickname,
        user_introduction: isIntro,
      })
      .then((res) => {
        console.log(res.data);
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
                  value={loginInfo.user_introduction}
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
          <MyPostComponent />
        </Col>
        <Col span={12}>
          <Space style={{ justifyContent: 'space-between', width: '100%', marginBottom: '8px' }}>
            <Title level={5}>내가 작성한 댓글</Title>
            <Button onClick={() => router.push('/mypage/mycomments')}>모두 보기</Button>
          </Space>
          <MyCommentComponent />
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
