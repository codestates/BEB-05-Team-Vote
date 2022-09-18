import { Button, Result, Space } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Custom404() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>페이지를 찾을 수 없습니다.</title>
      </Head>
      <Space style={{ width: '100%', justifyContent: 'center', height: '100vh' }}>
        <Result
          status="404"
          title="404"
          subTitle="페이지를 찾을 수 없습니다."
          extra={
            <Button type="primary" onClick={() => router.push('/')}>
              홈으로
            </Button>
          }
        />
      </Space>
    </>
  );
}
