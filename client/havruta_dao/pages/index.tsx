import type { NextPage } from 'next';
import Head from 'next/head';

import styled from 'styled-components';
import { Breadcrumb, Button, Layout, Menu } from 'antd';
import { useState } from 'react';
const { Header, Content, Footer } = Layout;

const Home: NextPage = () => {
  const [isTrue, setIsTrue] = useState(true);
  return (
    <div>
      <Head>
        <title>Havruta DAO</title>
        <meta name="description" content="Havruta DAO" />
      </Head>

      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={new Array(15).fill(null).map((_, index) => {
              const key = index + 1;
              return {
                key,
                label: `nav ${key}`,
              };
            })}
          />
        </Header>
        <Content style={{ padding: '0 50px', height: '100vh' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-content">
            Content
            <br />
            <TempButton>button</TempButton>
            <TempBox>div</TempBox>
            <CustomButton
              onClick={() => setIsTrue(!isTrue)}
              type="primary"
              size={'large'}
            >
              antd button
            </CustomButton>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </div>
  );
};

const TempButton = styled.button``;

const TempBox = styled.div`
  border: 1px solid red;
  color: blue;
`;

const CustomButton = styled(Button)`
  color: red;
  border-radius: 50px;

  &size === "large"
`;

export default Home;
