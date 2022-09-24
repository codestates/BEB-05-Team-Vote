import { Space, Row, Col, PageHeader } from 'antd';
import Reply from '../../components/community/Reply';
import MyCommentComponent from '../../components/mypage/MyCommentComponent';
import { useRouter } from 'next/router';

export default function MyComments() {
  const router = useRouter();

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <PageHeader
        className="site-page-header"
        onBack={() => router.push('/mypage')}
        title="내가 작성한 댓글"
        subTitle="내가 작성한 댓글의 전체 목록입니다."
        style={{ paddingLeft: 0 }}
      />
      <MyCommentComponent />
    </Space>
  );
}
