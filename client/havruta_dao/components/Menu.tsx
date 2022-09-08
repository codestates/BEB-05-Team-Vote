import React from 'react';
import { Button, Layout, MenuProps, Space, Typography } from 'antd';
import { Menu } from 'antd';
import {
  AlignCenterOutlined,
  BulbOutlined,
  FileSearchOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import Image from 'next/image';
import logoImage from '../assets/images/HAVRUTADAO.png';
import { useRouter } from 'next/router';
import { Footer } from 'antd/lib/layout/layout';

const { Sider } = Layout;
const { Text, Link } = Typography;

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

  const items: MenuProps['items'] = menuItem.map((item, index) => ({
    key: item.id,
    path: item.path,
    icon: item.icon,
    label: item.name,
    onClick: () => {
      router.push(item.path, undefined, { shallow: true });
    },
  }));

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

        <Button
          type="primary"
          icon={<WalletOutlined />}
          size={'large'}
          shape="round"
          style={{ width: '100%' }}
        >
          지갑연결
        </Button>
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
