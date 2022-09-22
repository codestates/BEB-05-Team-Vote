import { PageHeader, Space } from 'antd';
import { useRouter } from 'next/router';
import MyPostComponent from '../../components/mypage/MyPostComponent';

export default function MyPosts() {
  const router = useRouter();
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <PageHeader
        className="site-page-header"
        onBack={() => router.push('/mypage')}
        title="내가 작성한 게시글"
        subTitle="내가 작성한 게시글입니다."
        style={{ paddingLeft: 0 }}
      />
      <MyPostComponent />
    </Space>
  );
}
