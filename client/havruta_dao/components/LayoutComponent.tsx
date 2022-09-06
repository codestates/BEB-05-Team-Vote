import { GithubOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import React from 'react';
import styled from 'styled-components';
import MenuComponent from './Menu';

const { Header, Content, Footer } = Layout;

export const LayoutComponent = ({ children }: any) => (
  <Layout hasSider>
    <MenuComponent />
    <Layout className="site-layout" style={{ marginLeft: 300 }}>
      <Header style={{ padding: 0, backgroundColor: '#fff', color: '#000' }}>
        <ContentTitle>
          <strong>
            <GithubOutlined />
            &nbsp; 하브루타 커뮤니티
          </strong>
        </ContentTitle>
      </Header>
      <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>{children}</Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  </Layout>
);

const ContentTitle = styled.span`
  font-size: 24px;
`;
