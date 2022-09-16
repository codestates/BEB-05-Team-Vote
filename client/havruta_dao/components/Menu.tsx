import React, { useEffect, useCallback } from 'react';
import {
  Button,
  Divider,
  Layout,
  MenuProps,
  message,
  Modal,
  notification,
  Space,
  Typography,
} from 'antd';
import { Menu } from 'antd';
import {
  AlignCenterOutlined,
  BulbOutlined,
  FileSearchOutlined,
  LogoutOutlined,
  UserOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import Image from 'next/image';
import logoImage from '../assets/images/HAVRUTADAO.png';
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/react';
import * as Sentry from '@sentry/react';
import { loginInfoState } from '../states/loginInfoState';
import { useRecoilState } from 'recoil';
import { UseReloadSession } from '../lib/hooks/UseReloadSession';
import axios from 'axios';

const { Sider } = Layout;
const { Paragraph, Text } = Typography;

const menuItem = [
  {
    id: '1',
    name: '커뮤니티',
    icon: <AlignCenterOutlined />,
    path: '/',
  },
  { id: '2', name: '강의탐색', icon: <FileSearchOutlined />, path: '/courses' },
  {
    id: '3',
    name: '지식공유',
    icon: <BulbOutlined />,
    path: '/courses/upload',
  },
  // {
  //   id : '4',
  //   name: '투표',
  //   icon: <BulbOutlined />,
  //   path: '/poll',
  // },
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
      if (item.id === '3') {
        if (!loginInfo.user_id) {
          return notification['info']({
            message: '지갑 연동이 필요합니다.',
            description: '지식 공유를 하려면 먼저 지갑을 연동해주세요.',
          });
        } else {
          router.push(item.path, undefined, { shallow: true });
        }
      } else {
        router.push(item.path, undefined, { shallow: true });
      }
    },
  }));

  const onEditProfile = (e: any) => {
    setLoginInfo((prevState) => ({ ...prevState, user_nickname: e }));
  };

  useEffect(() => {
    try {
      axios.put(`${process.env.NEXT_PUBLIC_ENDPOINT}/profile`, {
        user_address: loginInfo.user_address,
        user_nickname: loginInfo.user_nickname,
        user_introduction: loginInfo.user_introduction,
      });
    } catch (error) {
      Sentry.captureException(error);
    }
  }, [loginInfo.user_nickname, loginInfo.user_introduction, loginInfo.user_address]);

  const userLoginInfo: MenuProps['items'] = [
    {
      key: 'userLoginInfo',
      icon: <UserOutlined />,
      label: (
        <Text
          editable={{
            onChange: onEditProfile,
          }}
          onClick={() => {
            navigator.clipboard.writeText(loginInfo.user_address);
            message.success('계정 주소가 복사되었습니다!');
          }}
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
      onClick: () => signOut(),
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

            if (response?.ok && response.status === 200) {
              router.reload();
            }
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

  const setLoginInfomation = useCallback(() => {
    if (status === 'authenticated') {
      setLoginInfo({
        user_id: Number(session?.user.user_id),
        user_address: String(session?.user.user_address),
        user_network: Number(session?.user.user_network),
        user_nickname: String(session?.user.user_nickname),
        user_introduction: String(session?.user.user_introduction),
      });
    }
  }, [session?.user]);

  useEffect(() => {
    setLoginInfomation();
  }, [setLoginInfomation]);

  const handleNetworkChanged = (...args: Array<string>) => {
    const networkId = args[0];
    console.log(networkId);
    window.location.reload();
  };

  useEffect(() => {
    window.klaytn?.on('networkChanged', handleNetworkChanged);
    return () => {
      window.klaytn?.removeListener('networkChanged', handleNetworkChanged);
    };
  });

  return (
    <Sider
      width="300px"
      theme="light"
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '24px',
      }}
    >
      <Space direction="vertical" size={'large'}>
        <Image
          src={logoImage}
          alt="logo image"
          width={221}
          style={{ cursor: 'pointer' }}
          height={'100%'}
          onClick={() => router.push('/')}
        />

        <Menu theme="light" mode="inline" defaultSelectedKeys={[router.pathname]} items={items} />

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
              HAVRUTADAO는 경제적, 사회적 배경에 상관 없이, 누구나 잠재력을 발휘할 수 있는 세상을
              만들어가는 탈중앙 비영리조직입니다.
            </Text>
            <Text
              onClick={() =>
                window.open(`https://www.notion.so/DAO-fe7e07833a734cfea95dc6ff610d3ded`)
              }
              style={{ color: '#9b4dea', cursor: 'pointer' }}
            >
              → 자세히 알아보기
            </Text>
          </Space>
        </DescriptionOfDao>
      </Space>
    </Sider>
  );
}

const DescriptionOfDao = styled.div`
  padding: 16px;
  border-radius: 4px;
  background-color: #f9f9f9;
  width: 221px;
`;
