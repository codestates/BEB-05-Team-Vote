import React, { useEffect, useState } from 'react';
import { Button, Divider, Layout, MenuProps, message, Modal, Space, Typography } from 'antd';
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
import Caver from 'caver-js';

const { Sider } = Layout;
const { Paragraph, Text, Link } = Typography;

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
  const router = useRouter();
  const [isConnetedWallet, setIsConnetedWallet] = useState(false);
  const [userAccountAddress, setUserAccountAddress] = useState('');
  const [userNickname, setUserNickname] = useState('');

  const items: MenuProps['items'] = menuItem.map((item) => ({
    key: item.id,
    path: item.path,
    icon: item.icon,
    label: item.name,
    onClick: () => {
      router.push(item.path, undefined, { shallow: true });
    },
  }));

  const userLoginInfo: MenuProps['items'] = [
    {
      key: 'userLoginInfo',
      icon: <UserOutlined />,
      label: (
        <Text
          editable={{
            onChange: setUserNickname,
          }}
          onClick={() => {
            navigator.clipboard.writeText(userAccountAddress);
            message.success('계정 주소가 복사되었습니다!');
          }}
        >
          {userNickname === userAccountAddress
            ? userNickname.length > 10 && userNickname.substr(0, 8) + '...'
            : userNickname}
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
      // onClick: () => {
      //   router.push('1', undefined, { shallow: true });
      // },
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
      if (window.klaytn.isKaikas) {
        //로그인/회원가입 진행
        const accounts = await window.klaytn.enable();
        const account = accounts[0];
        console.log(account);
        if (account) {
          setIsConnetedWallet(true);
          setUserAccountAddress(account);
          setUserNickname(account);
        }

        const networkVersion = await window.klaytn.networkVersion;
        console.log(networkVersion);
      }
    } else {
      //카이카스 설치 팝업
      withoutKaikasWarning();
    }
  };

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
        <Link href="/">
          <Image src={logoImage} alt="logo image" width={221} height={'100%'} />
        </Link>
        <Menu theme="light" mode="inline" defaultSelectedKeys={[router.pathname]} items={items} />

        {isConnetedWallet ? (
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
            <Link href="https://ant.design" target="_blank">
              → 자세히 알아보기
            </Link>
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
