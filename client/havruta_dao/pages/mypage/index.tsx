import { PageHeader, Space, Row, Col, Button, Input, Typography, Divider, Form } from 'antd';
import { SettingOutlined, CodepenOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import Head from 'next/head';
import useSWR from 'swr';

export default function Mypage() {
  const router = useRouter();
  const { TextArea } = Input;
  const { Text, Title } = Typography;
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
            <Button>수정</Button>
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
            <label htmlFor="nickname">닉네임</label>
            <Input id="nickname" value={''} disabled />
            <label htmlFor="address">지갑주소</label>
            <Input id="address" value={''} disabled />
            <label htmlFor="introduction">소개글</label>
            <TextArea id="introduction" rows={3} placeholder="소개글을 입력하세요." />
          </Space>
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
      <Row>
        <Col span={12}></Col>
        <Col span={12}></Col>
      </Row>
      <Row>
        <Col span={24}></Col>
      </Row>
    </section>
  );
}
