import { GithubOutlined } from '@ant-design/icons';
import { Layout, Col, Row, PageHeader } from 'antd';
import React from 'react';
import styled from 'styled-components';
import MenuComponent from './Menu';

const { Header, Content, Footer } = Layout;

export const LayoutComponent = ({ children }: any) => (
  <Layout hasSider>
    <MenuComponent />

    <Layout className="site-layout" style={{ marginLeft: 300 }}>
      <Row>
        <Col span={12}>{/* 여기에 커뮤니티 컴포넌트를 넣어주세요. */}</Col>
        <Col span={12}>{/* 여기에 추천 강의 컴포넌트를 넣어주세요. */}</Col>
      </Row>

      <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>{children}</Content>
    </Layout>
  </Layout>
);

const ContentTitle = styled.span`
  font-size: 24px;
`;
