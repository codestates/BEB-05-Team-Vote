import { FolderOpenOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Row, Col, PageHeader, Space, Typography, Divider, Image, Button } from 'antd';
import Link from 'next/link';
const { Title, Paragraph } = Typography;

export default function details() {
  const first = false;

  return (
    <section>
      <Space style={{ width: '100%' }}>
        <FolderOpenOutlined style={{ fontSize: '24px' }} />
        <PageHeader title="강의 상세 내용" style={{ paddingLeft: 0 }} />
      </Space>
      <Row gutter={48}>
        <Col span={16}>
          <Image
            width={'100%'}
            src="/329248-eng2.png"
            style={{ marginBottom: '24px' }}
            preview={false}
            alt="강의 이미지"
          />
          <Title level={3}>강의 상세 소개</Title>
          <Paragraph style={{ fontSize: '16px', fontWeight: 400 }}>
            웹 애플리케이션을 개발할 때 필요한 모든 웹 기술을 기초부터 이해하고, 완성할 수 있습니다.
            스프링 MVC의 핵심 원리와 구조를 이해하고, 더 깊이있는 백엔드 개발자로 성장할 수
            있습니다. 그림자는 피는 산야에 뜨고, 부패뿐이다. 얼마나 대한 가슴에 없는 구하지 이것은
            무엇을 풀이 뿐이다. 끓는 그들은 하는 광야에서 불어 위하여 꽃 없으면, 하는
            사막이다.그림자는 피는 산야에 뜨고, 부패뿐이다. 얼마나 대한 가슴에 없는 구하지 이것은
            무엇을 풀이 뿐이다. 현대의 애플리케이션은 대부분 웹 환경에서 동작하는 웹
            애플리케이션입니다. 자바 백엔드 개발자는 이러한 웹 애플리케이션을 개발할 때, 대부분
            스프링 MVC를 사용합니다. 스프링 MVC는 복잡한 웹 애플리케이션을 쉽고 빠르게 개발할 수
            있게 도와주는, 가장 인기 있는 웹 프레임워크입니다.
          </Paragraph>
          <Divider />
          <Title level={3}>강사 소개</Title>
          <Paragraph style={{ fontSize: '16px', fontWeight: 400 }}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet, in itaque? Sapiente
            incidunt iste accusantium autem, neque ex suscipit, placeat nisi recusandae libero, cum
            quisquam doloribus quod quos ab nesciunt.
          </Paragraph>
          <Divider />
        </Col>
        <Col span={8}>
          <Title level={3}>실전! 코틀린과 스프링 부트로 도서관리 애플리케이션 개발하기</Title>
          <Paragraph style={{ fontSize: '16px', fontWeight: 400 }}>
            Java + Spring Boot로 만들어진 웹 애플리케이션을 Kotlin + Spring Boot로 리팩토링 하고
            추가 요구사항을 구현합니다. 이 과정에서 Junit5, SQL, JPA, Querydsl 을 사용할 뿐 아니라,
            설계 및 구현 관점에서 다양한 방법의 장단점을 다루게 됩니다.
          </Paragraph>

          <Space direction="vertical" style={{ width: '100%' }}>
            <Space>
              <ThunderboltOutlined style={{ fontSize: '32px', color: '#9B4DEA' }} />
              <Paragraph style={{ fontSize: '24px', fontWeight: 600, color: '#9B4DEA', margin: 0 }}>
                0.02
              </Paragraph>
            </Space>
            {first ? (
              <Link href={`/courses/class/1`}>
                <Button type="ghost" size={'large'} style={{ width: '100%' }} block>
                  계속 수강하기
                </Button>
              </Link>
            ) : (
              <Button type="primary" size={'large'} style={{ width: '100%' }} block>
                수강신청 하기
              </Button>
            )}
          </Space>
        </Col>
      </Row>
    </section>
  );
}
