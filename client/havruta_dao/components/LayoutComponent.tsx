import { Layout, Col, Row } from 'antd';

import React from 'react';
import MenuComponent from './Menu';

const { Content, Footer } = Layout;

export const LayoutComponent = ({ children }: any) => (
  <Row justify="center">
    <Col span={20} style={{ margin: '0 auto' }}>
      <Layout hasSider>
        <div style={{ position: 'relative' }}>
          <MenuComponent />
        </div>
        <Layout style={{ marginLeft: 300 }}>
          <Content style={{ margin: '0px 16px 0', overflow: 'initial' }}>{children}</Content>
          <Footer style={{ textAlign: 'center' }}>&copy; Create by Team Vote</Footer>
        </Layout>
      </Layout>
    </Col>
  </Row>
);
