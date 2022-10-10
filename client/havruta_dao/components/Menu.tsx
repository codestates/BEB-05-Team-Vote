import React, { useEffect } from 'react';
import { Button, Divider, Layout, MenuProps, Modal, Space, Typography, Menu, Row, Col } from 'antd';
import {
  AuditOutlined,
  BankOutlined,
  BookOutlined,
  BulbOutlined,
  CommentOutlined,
  FileSearchOutlined,
  GithubOutlined,
  LogoutOutlined,
  UserOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import styled, { keyframes } from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/react';
import * as Sentry from '@sentry/react';
import { loginInfoState } from '../states/loginInfoState';
import { useRecoilState } from 'recoil';
// import logoImage from '../assets/images/HAVRUTADAO.png';
import logoImage from '../assets/images/svglogo4.svg';
import { noti } from '../lib/notification';

const { Sider } = Layout;
const { Paragraph, Text, Link } = Typography;

const menuItem = [
  {
    id: '0',
    name: 'DAO소개',
    icon: <BankOutlined />,
    path: '/about',
  },
  {
    id: '1',
    name: '커뮤니티',
    icon: <CommentOutlined />,
    path: '/',
  },

  { id: '2', name: '강의탐색', icon: <FileSearchOutlined />, path: '/lectures' },
  // {
  //   id: '3',
  //   name: '질의응답',
  //   icon: <QuestionCircleOutlined />,
  //   path: '/ama',
  // },
  {
    id: '4',
    name: '지식공유',
    icon: <BulbOutlined />,
    path: '/lectures/upload',
  },
  {
    id: '5',
    name: 'DAO투표',
    icon: <AuditOutlined />,
    path: 'https://demo.snapshot.org/#/havruta.eth',
  },
];

export default function MenuComponent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoState);

  const items: MenuProps['items'] = menuItem.map((item) => ({
    key: item.id,
    path: item.path,
    icon: item.icon,
    label: item.name,
    onClick: () => {
      if (item.name === '지식공유') {
        if (!session) {
          return noti(
            'info',
            '지갑 연동이 필요합니다.',
            '지식 공유를 하려면 먼저 지갑을 연동해주세요.'
          );
        } else {
          router.push(item.path, undefined, { shallow: true });
        }
      } else if (item.name === 'DAO투표') {
        window.open(item.path);
      } else {
        router.push(item.path, undefined, { shallow: true });
      }
    },
  }));

  const userLoginInfo: MenuProps['items'] = [
    {
      key: 'userLoginInfo',
      icon: <UserOutlined />,
      title: '마이 페이지',
      label: (
        <Text
          // editable={{
          //   onChange: onEditProfile,
          // }}
          // onClick={() => {
          //   navigator.clipboard.writeText(loginInfo.user_address);
          //   message.success('지갑 주소가 복사되었습니다!');
          // }}
          onClick={() => router.push('/mypage')}
        >
          {loginInfo.user_nickname === loginInfo.user_address
            ? loginInfo.user_nickname.length > 10 && loginInfo.user_nickname.substr(0, 8) + '...'
            : loginInfo.user_nickname}
        </Text>
      ),
      // onClick: () => {
      //   router.push('1', undefined, { shallow: true });
      // },
    },
    {
      key: 'userLogout',
      icon: <LogoutOutlined />,
      label: '로그아웃',
      onClick: () => {
        signOut();
      },
    },
  ];

  const withoutKaikasWarning = () => {
    Modal.warning({
      title: '지갑 연결을 위해 카이카스가 필요합니다.',
      content: (
        <Typography>
          <Paragraph>아래 링크에서 카이카스를 설치해주세요.</Paragraph>
          <Paragraph>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi"
            >
              카이카스 설치 페이지 바로가기
            </a>
          </Paragraph>
        </Typography>
      ),
    });
  };

  const onConnectWallet = async () => {
    if (typeof window.klaytn !== 'undefined') {
      if (window.klaytn?.isKaikas) {
        try {
          if (status === 'unauthenticated') {
            //로그인/회원가입 진행
            const accounts = await window.klaytn.enable();
            const address = accounts[0];
            const network = await window.klaytn.networkVersion;
            //next auth
            const response = await signIn('kaikas-credential', {
              address,
              network,
              redirect: false,
            });
            // if (response?.ok && response.status === 200) {
            //   router.reload();
            // }
          }
        } catch (error) {
          Sentry.captureException(error);
        }
      }
    } else {
      //카이카스 설치 팝업
      withoutKaikasWarning();
    }
  };

  const setLoginInfomation = () => {
    if (status === 'authenticated') {
      setLoginInfo({
        user_id: Number(session?.user.user_id),
        user_address: String(session?.user.user_address),
        user_network: Number(session?.user.user_network),
        user_nickname: String(session?.user.user_nickname),
        user_introduction: String(session?.user.user_introduction),
      });
    }
  };

  useEffect(() => {
    setLoginInfomation();
  }, [session?.user]);

  return (
    <Row>
      <Col>
        <Sider
          width="300px"
          theme="dark"
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
          style={{
            // overflow: 'auto',
            // backgroundColor: '#000',
            zIndex: 1000,
            height: '100vh',
            // position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '24px',
          }}
        >
          <Space direction="vertical" size={'large'}>
            <MainLogo
              src={logoImage}
              alt="logo image"
              width={221}
              // style={{ cursor: 'pointer', transform: 'scale(2.5)' }}
              height={'100%'}
              onClick={() => router.push('/')}
            />

            <Menu
              theme="light"
              mode="inline"
              defaultSelectedKeys={[router.pathname]}
              items={items}
            />

            {status === 'authenticated' ? (
              <>
                <Divider />
                <Menu theme="light" mode="inline" items={userLoginInfo} />
              </>
            ) : (
              <Button
                type="primary"
                icon={<WalletOutlined />}
                size={'large'}
                shape="round"
                style={{ width: '100%' }}
                onClick={onConnectWallet}
              >
                지갑연결
              </Button>
            )}
            <DescriptionOfDao>
              <Space direction="vertical">
                <Text>
                  HAVRUTADAO는 경제적, 사회적 배경에 상관 없이, 누구나 잠재력을 발휘할 수 있는
                  세상을 만들어가는 탈중앙 비영리조직입니다.
                </Text>
                <Link onClick={() => router.push('/about')}>→ 자세히 알아보기</Link>
                <Divider />
                <Link onClick={() => window.open('https://github.com/codestates/BEB-05-Team-Vote')}>
                  <GithubOutlined />
                  &nbsp; 하브루타 DAO Github
                </Link>
                <Link
                  onClick={() =>
                    window.open(
                      'https://endurable-dodo-552.notion.site/Havruta-DAO-White-Paper-d7fe0d07b63f49cf9ddea3e4cea9a4ff'
                    )
                  }
                >
                  <BookOutlined />
                  &nbsp; 하브루타 DAO 백서
                </Link>
              </Space>
            </DescriptionOfDao>
          </Space>
        </Sider>
      </Col>
    </Row>
  );
}

const MainLogoFade = keyframes`
    0% {
    filter: drop-shadow(0px 0px 0px #000)
    drop-shadow(0px 0px 0px #000)
    drop-shadow(0px 0px 0px #f1fad7)
    drop-shadow(0px 0px 0px #ceed73)
    drop-shadow(0px 0px 0px #a7cf31);
  }

  100% {
    filter: drop-shadow(0px 0px 0px #121705)
    drop-shadow(0px 0px 0.5px #262626)
    drop-shadow(0px 0px 0.5px #f1fad7)
    drop-shadow(0px 0px 0.5px #ceed73)
    drop-shadow(0px 0px 0.5px #a7cf31); 
  }
`;

const MainLogo = styled(Image)`
  cursor: pointer;
  transform: scale(2.5);
  /* animation: ${MainLogoFade} 5s 0s infinite linear alternate; */
`;

const DescriptionOfDao = styled.div`
  padding: 16px;
  border-radius: 4px;
  /* background-color: #f9f9f9; */
  width: 221px;
`;
