import { Layout, Col, Row } from 'antd';

import React from 'react';
import styled from 'styled-components';
import MenuComponent from './Menu';

const { Content, Footer } = Layout;

export const LayoutComponent = ({ children }: any) => (
  <Row justify="center">
    <Col lg={20} xs={24} style={{ margin: '0 auto' }}>
      <Layout>
        <MenuComponent />
        {/* <Layout style={{ marginLeft: 300 }}> */}
        <Layout>
          <Content style={{ margin: '0px 16px 0', overflow: 'initial' }}>{children}</Content>
          <Footer style={{ textAlign: 'center' }}>&copy; Created by Team Vote</Footer>
        </Layout>
      </Layout>
    </Col>
  </Row>
);
