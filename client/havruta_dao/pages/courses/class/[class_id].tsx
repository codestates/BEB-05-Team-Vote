import { PageHeader, Space, Typography, Button } from 'antd';
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  SearchOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';

const dummyCourses = {
  title: 'CS지식의 정석 | CS면접 디자인 패턴 네트워크 운영체제 데이터베이스 자료구조 개발자',
  summary:
    'Java + Spring Boot로 만들어진 웹 애플리케이션을 Kotlin + Spring Boot로 리팩토링 하고 추가 요구사항을 구현합니다. 이 과정에서 Junit5, SQL, JPA, Querydsl 을 사용할 뿐 아니라, 설계 및 구현 관점에서 다양한 방법의 장단점을 다루게 됩니다.',
  author: '니콜라스',
  price: '2',
  thumbnailURL: '/329248-eng2.png',
  youtubeURL: 'https://www.youtube.com/embed/lslNMgWstRQ',
};

export default function details() {
  const { Title, Text } = Typography;
  return (
    <section>
      <Space style={{ justifyContent: 'space-between', width: '100%' }}>
        <Space>
          <EyeOutlined style={{ fontSize: '24px' }} />
          <PageHeader style={{ paddingLeft: 0 }} title={dummyCourses.title} backIcon={true} />
        </Space>
      </Space>
      <Space
        style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', marginBottom:'20px' }}
        direction="vertical"
      >
        <iframe
          width="100%"
          style={{ position: 'absolute', width: '100%', height: '100%' }}
          // height="800px"
          src={dummyCourses.youtubeURL}
          title={dummyCourses.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </Space>
      <Title level={3}>{dummyCourses.title}</Title>
      <Text style={{display:'block', fontSize: '18px', marginBottom:'16px'}}>{dummyCourses.summary}</Text>
      <Button href='/courses' size='middle'>← 돌아가기</Button>
    </section>
  );
}
