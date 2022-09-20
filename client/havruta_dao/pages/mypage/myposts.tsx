import { PageHeader, Space } from 'antd';
import MyPostComponent from '../../components/mypage/MyPostComponent';

export default function MyPosts() {
  return (
    <Space direction="vertical" style={{width:'100%'}}>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="나의 강의"
        subTitle="내가 공유한 강의 목록입니다."
        style={{ paddingLeft: 0 }}
      />
      <MyPostComponent />
    </Space>
  );
}
