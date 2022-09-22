import { PageHeader, Space } from 'antd';
import MyUploadLectureComponent from '../../components/mypage/MyLectureComponent';
import { useRouter } from 'next/router';

export default function MyUploadLectures() {
  const router = useRouter();

  return (
    <Space direction="vertical">
      <PageHeader
        className="site-page-header"
        // onBack={() => ('/mypage')}
        onBack={() => router.push('/mypage')}
        title="내가 생성한 강의"
        subTitle="내가 생성한 강의 목록입니다."
        style={{ paddingLeft: 0 }}
      />
      <MyUploadLectureComponent />
    </Space>
  );
}
