import { useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { AsciiEffect } from 'three-stdlib';
import { Col, Row, Typography, Divider, Timeline, Avatar, Button, Image, Space } from 'antd';
// import Image from 'next/image';
import roadmap from '../assets/images/roadmap.png';
import { BookOutlined, GithubOutlined, SmileOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

export default function App() {
  const { Title, Paragraph } = Typography;
  const router = useRouter();

  return (
    <section>
      <Row gutter={[32, 32]}>
        <Col span={22} style={{ marginBottom: '80px' }}>
          <Canvas style={{ width: '100%', height: '50vh' }} onScroll={(e) => e.stopPropagation}>
            {/* <color attach="background" args={['rgba(0,0,0,0)']} /> */}
            <spotLight position={[15, 0, 5]} angle={0.1} penumbra={2} />
            <pointLight position={[10, 10, 15]} />
            <Torusknot />
            <AsciiRenderer invert />
            <Text
              position={[0, -3, 0]}
              fontSize={2}
              color="#bae637"
              material-fog={false}
              letterSpacing={0}
            >
              Havruta DAO
              <meshStandardMaterial color="gray" opacity={0.01} transparent />
            </Text>
          </Canvas>
        </Col>

        <Row gutter={[32, 32]} justify="center">
          <Col xs={22} lg={16}>
            <Title style={{ color: '#bae637' }}>VISION</Title>
            <Paragraph style={{ fontSize: '20px', color: 'white' }}>
              경제적, 사회적 배경에 상관없이 누구나 잠재력을 발휘하고, 지속적으로 지식을 나눌 수
              있는 세상
            </Paragraph>
          </Col>
          <Col xs={22} lg={16}>
            <Title style={{ color: '#bae637' }}>MISSION</Title>
            <Paragraph style={{ fontSize: '20px', color: 'white' }}>
              블록체인 기술 기반 토큰 이코노미를 활용하여 지속가능한 세계 최대의 선순환 지식공유
              학습 플랫폼을 구축합니다.
            </Paragraph>
          </Col>
          <Col xs={22} lg={16}>
            <Title style={{ color: '#bae637' }}>DAO</Title>
            <Paragraph style={{ fontSize: '20px', color: 'white' }}>
              탈중앙화 자율 조직(decentralized autonomous organization). 물리적인 건물·법인이나
              대표자 없이 블록체인 기반 ‘스마트 계약’으로 운영됩니다.
            </Paragraph>
          </Col>
        </Row>
        <Divider style={{ border: 'none', borderTop: '1px solid #434343' }} />
        <Row justify="center">
          <Col xs={22} lg={16}>
            <Title style={{ color: '#bae637' }}>하브루타다오의 특징</Title>
            <Paragraph style={{ fontSize: '20px', color: 'white' }}>
              · 지식공유자는 수수료 없이 강의를 통해 수익을 창출할 수 있습니다.
            </Paragraph>
          </Col>
          <Col xs={22} lg={16}>
            <Paragraph style={{ fontSize: '20px', color: 'white' }}>
              · 커뮤니티 활동-기여를 통해 토큰을 획득하세요. 이를 통해 강의를 수강할 수 있습니다.
            </Paragraph>
          </Col>
          <Col xs={22} lg={16}>
            <Paragraph style={{ fontSize: '20px', color: 'white' }}>
              · 하브루타다오 강의 퀄리티를 유지를 위해 퀄리티가 낮은 강의는 지식공유자 회의-투표를
              통해 플랫폼에서 제거 할 수 있습니다.
            </Paragraph>
          </Col>
        </Row>
        <Divider style={{ border: 'none', borderTop: '1px solid #434343' }} />
        <Row gutter={[32, 72]} justify="center">
          <Col xs={22} lg={16}>
            <Title style={{ marginRight: '40px', color: '#bae637' }}>토큰 이코노미</Title>
            <Title level={2} style={{ color: '#bae637' }}>
              지속가능한 생태계
            </Title>
            <Paragraph
              style={{
                fontSize: '20px',
                color: 'white',
                lineHeight: '32px',
                marginBottom: '32px',
                color: 'white',
              }}
            >
              Havruta DAO의 사용자는 커뮤니티 활동을 통해서 토큰을 보상 받을 수 있습니다. 토큰
              보상의 비율은 하루 동안 참여한 커뮤니티 참여도에 비례하며 아래 공식과 같습니다. 또한
              강의 콘텐츠 제작-판매를 통해 토큰을 보상받을 수 있습니다.
            </Paragraph>
            <Image
              src="https://user-images.githubusercontent.com/35528411/192725895-f25a404b-82fd-47cb-9b31-63e3df00ae56.png"
              alt="하브루타다오 토큰보상"
              width={'80%'}
              height={'auto'}
            />
          </Col>
          <Col xs={22} lg={16}>
            <Title level={2} style={{ color: '#bae637' }}>
              토큰 보상량의 제한
            </Title>
            <Paragraph
              style={{ fontSize: '20px', lineHeight: '32px', marginBottom: '32px', color: 'white' }}
            >
              Havruta DAO의 사용자에게 배포되는 총 토큰의 양은 제한이 없습니다. 그러나 무제한적인
              토큰 양의 증가는 인플레이션을 초래하며 이를 방지하기 위해 하루에 발행되는 토큰의 양을
              제한하고 있습니다. 현재 초기 하루 발행량은 500개로 제한 되며, 해당 수량은 인플레이션의
              추이에 따라 변동이 가능합니다.
            </Paragraph>

            <Image
              src="https://user-images.githubusercontent.com/35528411/192725899-ccb326a8-a8e7-4019-a924-92fee3a87d84.png"
              alt="하브루타다오 토큰보상량 제한"
              width={'80%'}
              height={'auto'}
            />
          </Col>
          <Col xs={22} lg={16}>
            <Title level={2} style={{ color: '#bae637' }}>
              토큰 소비
            </Title>
            <Paragraph
              style={{ fontSize: '20px', lineHeight: '32px', marginBottom: '32px', color: 'white' }}
            >
              Havruta DAO는 다양한 방식으로 토큰을 소비 할 수 있습니다. 사용자들은 토큰을
              소비함으로써 본인의 필요를 충족하고, 생태계의 발전에 기여할 수 있습니다.
              <ul style={{ marginTop: '24px' }}>
                <li style={{ marginBottom: '16px' }}>강의 콘텐츠 생성 시 토큰을 소비합니다.</li>
                <li style={{ marginBottom: '16px' }}>강의 콘텐츠 소비</li>
                <li style={{ marginBottom: '16px' }}>HADA PASS NFT 발행 </li>
              </ul>
            </Paragraph>
            <Button
              size="large"
              type="primary"
              icon={<BookOutlined />}
              style={{ color: '#000', verticalAlign: 'middle' }}
              onClick={() =>
                window.open(
                  'https://endurable-dodo-552.notion.site/Havruta-DAO-White-Paper-d7fe0d07b63f49cf9ddea3e4cea9a4ff'
                )
              }
            >
              하브루타다오 백서 바로가기
            </Button>
          </Col>
        </Row>
        <Divider style={{ border: 'none', borderTop: '1px solid #434343' }} />
        <Row style={{ margin: 'auto', width: '100%' }} justify="center">
          <Title style={{ marginBottom: '40px' }}>TIMELINE</Title>
          <Col xs={22} lg={24}>
            <Timeline mode="alternate" reverse={true}>
              <Timeline.Item>
                <p style={{ fontWeight: 600, fontSize: '18px' }}>기능 업데이트</p>
                <p style={{ paddingLeft: '10px', fontSize: '18px', color: '#a1a1a1' }}>
                  강의 콘텐츠 광고 기능 구현
                </p>
                <p style={{ paddingLeft: '10px', fontSize: '18px', color: '#a1a1a1' }}>
                  강의 NFT화 구현
                </p>
                <p style={{ paddingLeft: '10px', fontSize: '18px', color: '#a1a1a1' }}>
                  질의응답 기능 구현
                </p>
                <p style={{ paddingLeft: '10px', fontSize: '18px', color: '#a1a1a1' }}>
                  강의 개설 요청 기능 구현
                </p>
                <p style={{ paddingLeft: '10px', fontSize: '18px', color: '#a1a1a1' }}>
                  아이템샵 구현
                </p>
              </Timeline.Item>
              <Timeline.Item
                color="green"
                style={{ color: '#bae637', fontWeight: 600, fontSize: '20px' }}
              >
                3단계: 커뮤니티 확장 및 토큰 이코노미 고도화
              </Timeline.Item>
              <Timeline.Item color="red" style={{ fontWeight: 600, fontSize: '20px' }}>
                🚴🏼‍♂️ WE ARE HERE!
              </Timeline.Item>
              <Timeline.Item color="gray">
                <p style={{ fontSize: '18px', fontWeight: 600 }}>HAVRUTA DAO 베타서비스 개발</p>
                <p style={{ paddingLeft: '10px', fontSize: '18px', color: '#a1a1a1' }}>
                  커뮤니티 기능 개발
                </p>
                <p style={{ paddingLeft: '10px', fontSize: '18px', color: '#a1a1a1' }}>
                  강의 업로드 및 수강 기능 개발
                </p>
                <p style={{ paddingLeft: '10px', fontSize: '18px', color: '#a1a1a1' }}>
                  로그인-회원가입-마이페이지 등 유저 기능 개발
                </p>
              </Timeline.Item>
              <Timeline.Item color="gray">
                <p style={{ fontSize: '18px' }}>HAVRUTA DA0 토큰 이코노미 구성 및 백서 제작</p>
                <p style={{ paddingLeft: '10px', fontSize: '18px', color: '#a1a1a1' }}>
                  토큰 지급, 보상, 소각 시스템 구축 및 개발
                </p>
              </Timeline.Item>
              <Timeline.Item
                color="green"
                style={{ color: '#bae637', fontWeight: 600, fontSize: '20px' }}
              >
                2단계: 서비스 개발 및 토큰 이코노미 구축
              </Timeline.Item>
              <Timeline.Item color="gray">
                <p style={{ paddingLeft: '10px', fontSize: '18px', color: '#a1a1a1' }}>
                  세부사업 추진 및 인력 구성
                </p>
                <p style={{ paddingLeft: '10px', fontSize: '18px', color: '#a1a1a1' }}>
                  세부사업 계획 및 사업 방향 제고
                </p>
              </Timeline.Item>
              <Timeline.Item
                color="green"
                style={{ color: '#bae637', fontWeight: 600, fontSize: '20px' }}
              >
                1단계: 사업 계획 및 방향성 점검
              </Timeline.Item>
              <Timeline.Item
                color="#00CCFF"
                style={{ fontWeight: 600, fontSize: '20px' }}
                dot={<SmileOutlined />}
              >
                <p>HAVRUTA DAO 서비스 추진</p>
              </Timeline.Item>
            </Timeline>
          </Col>
        </Row>
        <Divider style={{ border: 'none', borderTop: '1px solid #434343' }} />
        <Title>Team Vote Member</Title>
        <Row gutter={[32, 32]}>
          <Col xs={12} lg={8} style={{ textAlign: 'center' }}>
            <Avatar
              size={160}
              src="https://user-images.githubusercontent.com/35528411/192460366-e08c5b95-8cdd-47c9-b736-397d3de86bc0.png"
              style={{ marginBottom: '32px' }}
            />
            <Title level={3}>Jaden</Title>
            <Paragraph style={{ fontSize: '1rem', wordBreak: 'keep-all' }}>
              프론트엔드 및 블록체인 엔지니어. 이번 프로젝트에서 PM을 담당했다. 명상을 즐기는 인간
              스택오버플로우라고 불리고 있다.
            </Paragraph>
          </Col>
          <Col xs={12} lg={8} style={{ textAlign: 'center' }}>
            <Avatar
              size={160}
              src="https://user-images.githubusercontent.com/35528411/192460364-de56f69a-c822-468d-ae37-33d672473c19.png"
              style={{ marginBottom: '32px' }}
            />
            <Title level={3}>El</Title>
            <Paragraph style={{ fontSize: '1rem', wordBreak: 'keep-all' }}>
              프론트엔드 엔지니어. 하늘을 날다가 사이버 세상에 착륙했다. 갈색 푸들 &#39;라떼&#39;와
              함께 거주 중.
            </Paragraph>
          </Col>
          <Col xs={12} lg={8} style={{ textAlign: 'center' }}>
            <Avatar
              size={160}
              src="https://user-images.githubusercontent.com/35528411/192460315-d83cac40-ba07-4428-a063-368a39bbed8f.png"
              style={{ marginBottom: '32px' }}
            />
            <Title level={3}>Sam</Title>
            <Paragraph style={{ fontSize: '1rem', wordBreak: 'keep-all' }}>
              백엔드 엔지니어. 술을 좋아하는 뱀파이어 개발자. 잠을 자지 않는다는 소문이 있다.
            </Paragraph>
          </Col>
          <Col xs={12} lg={8} style={{ textAlign: 'center' }}>
            <Avatar
              size={160}
              style={{ marginBottom: '32px', backgroundColor: 'none' }}
              src="https://user-images.githubusercontent.com/35528411/192460370-2c4393e2-f7fd-476a-a000-858924d9a204.png"
            />
            <Title level={3}>Joseph</Title>
            <Paragraph style={{ fontSize: '1rem', wordBreak: 'keep-all' }}>
              백엔드 서브 엔지니어. 두 아이의 아버지. 항상 탈출하고 싶은 꿈만 꾸는 드리머. 아,
              제발...
            </Paragraph>
          </Col>
          <Col xs={12} lg={8} style={{ textAlign: 'center' }}>
            <Avatar
              size={160}
              style={{ marginBottom: '32px' }}
              src="https://user-images.githubusercontent.com/35528411/192460374-94cb3605-9288-4e54-b277-a3d128475d90.png"
            />
            <Title level={3}>Walter</Title>
            <Paragraph style={{ fontSize: '1rem', wordBreak: 'keep-all' }}>
              디자이너이자 프론트엔드 엔지니어. 본인은 유니콘이라 주장하지만 다른 사람들은 그냥
              개자이너라고 부른다. 목마를 때 물 대신 커피를 마시는 중.
            </Paragraph>
          </Col>
        </Row>
        <Divider style={{ border: 'none', borderTop: '1px solid #434343' }} />
        <Row>
          <Col span={22}>
            <Title style={{ marginBottom: '32px' }} level={1}>
              Links
            </Title>
            <Space align="center">
              <GithubOutlined
                style={{ fontSize: '48px', marginRight: '24px' }}
                onClick={() => window.open('https://github.com/codestates/BEB-05-Team-Vote')}
              />
              <BookOutlined
                style={{ fontSize: '48px' }}
                onClick={() =>
                  window.open(
                    'https://endurable-dodo-552.notion.site/Havruta-DAO-White-Paper-d7fe0d07b63f49cf9ddea3e4cea9a4ff'
                  )
                }
              />
            </Space>
          </Col>
        </Row>
      </Row>
    </section>
  );
}

function Torusknot(props) {
  const ref = useRef();
  //   useCursor(hovered);
  useFrame((state, delta) => (ref.current.rotation.y += delta / 1));
  return (
    <mesh {...props} ref={ref} scale={1.0}>
      <octahedronGeometry args={[2, 0]} />
      <meshStandardMaterial color="gray" opacity={0.01} transparent />
    </mesh>
  );
}

function AsciiRenderer({ renderIndex = 1, characters = '   .:-+*=%@# ', ...options }) {
  // Reactive state
  const { size, gl, scene, camera } = useThree();

  // Create effect
  const effect = useMemo(() => {
    const effect = new AsciiEffect(gl, characters, options);
    effect.domElement.style.position = 'absolute';
    effect.domElement.style.top = '0px';
    effect.domElement.style.left = '0px';
    effect.domElement.style.color = '#bae637';
    effect.domElement.style.pointerEvents = 'none';
    return effect;
  }, [characters, options.invert]);

  // Append on mount, remove on unmount
  useEffect(() => {
    gl.domElement.parentNode.appendChild(effect.domElement);
    return () => gl.domElement.parentNode.removeChild(effect.domElement);
  }, [effect]);

  //   // Set size
  useEffect(() => {
    effect.setSize(size.width, size.height);
  }, [effect, size]);

  //   // Take over render-loop (that is what the index is for)
  useFrame((state) => {
    effect.render(scene, camera);
  }, renderIndex);

  // This component returns nothing, it has no view, it is a purely logical
  return <></>;
}
