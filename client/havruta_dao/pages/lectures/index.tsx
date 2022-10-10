import { PageHeader, Row, Space, Skeleton } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import LecturesItem from '../../components/lectures/LecturesItem';

export default function Details() {
  const router = useRouter();
  const { data: lectures } = useSWR(`${process.env.NEXT_PUBLIC_ENDPOINT}/lecture`);

  return (
    <section>
      <Space style={{ justifyContent: 'space-between', width: '100%' }}>
        <Space>
          <PageHeader
            backIcon={<SearchOutlined />}
            onBack={() => router.push('/lectures')}
            title="강의탐색"
            subTitle={'함께 배우고, 나누고, 성장하세요.'}
          />
        </Space>
      </Space>

      <Row gutter={[20, 24]}>
        {lectures ? (
          lectures.map((lecture: Lecture) => (
            <LecturesItem lecture={lecture} key={lecture.lecture_id} />
          ))
        ) : (
          <Skeleton active />
        )}
      </Row>
    </section>
  );
}
