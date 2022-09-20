import { PageHeader, Space } from 'antd';
import MyLectureComponent from '../../components/mypage/MyLectureComponent';
import { useRouter } from 'next/router';

export default function MyLectures() {
  const router = useRouter();

  return (
    <Space direction="vertical">
      <PageHeader
        className="site-page-header"
        // onBack={() => ('/mypage')}
        onBack={() => router.push('/mypage')}
        title="나의 강의"
        subTitle="내가 공유한 강의 목록입니다."
        style={{ paddingLeft: 0 }}
      />
      <MyLectureComponent />
    </Space>
  );
}
