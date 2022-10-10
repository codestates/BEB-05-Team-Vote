import { Button, Modal, Typography } from 'antd';
import React from 'react';

const { Paragraph, Title, Text } = Typography;

function UploadNotiModal({ setIsModalOpen }: { setIsModalOpen: (value: boolean) => void }) {
  return (
    <Modal
      visible={true}
      onCancel={() => setIsModalOpen(false)}
      footer={
        <Button
          type="primary"
          size="large"
          style={{ width: '100%' }}
          onClick={() => setIsModalOpen(false)}
        >
          확인했습니다 😀
        </Button>
      }
    >
      <Title level={4}>
        안녕하세요.
        <br />
        <Text underline>지식공유에 동참해 주셔서 감사합니다!</Text> <br />
        하브루타DAO의 이야기를 들어주세요!
      </Title>
      <Title level={5}>1. 하브루타DAO는 성장기회의 평등을 추구합니다.</Title>
      <Paragraph style={{ fontSize: '16px' }}>
        우리는 때로 무언가를 배워야만 합니다.
        <br /> 하지만 여러 이유로 당연하다고 생각되어 지는것들이 누군가에게는 사치가 되기도 합니다.
        <br /> 하브루타DAO는 누구나, 경제적으로 시간적 제약없이 내가 원하는 것을 배우고, 지식을 나눌
        수 있는 공간입니다.
      </Paragraph>
      <Title level={5}>2. 전문 지식으로 수익이 가능한 유일한 곳.</Title>
      <Paragraph style={{ fontSize: '16px' }}>
        하브루타DAO는 기술 강의, 멘토링으로 의미 있는 보상을 가질 수 있는 유일한 플랫폼 입니다.
        수강생이 강의를 신청할 때마다 수익을 얻을 수 있어요!
        <br /> 지속가능한 수익과 명예를 가져가세요 :)
      </Paragraph>
      <Title level={5}>3. 하브루타DAO는 100% 의 비율의 높은 수익을 제공합니다.</Title>
      <Paragraph style={{ fontSize: '16px' }}>
        좋은 지식은 합당한 보상에서 나온다고 하브루타DAO는 생각합니다. 때문에 하브루타DAO는 다른
        학습 서비스에 비해 월등히 높은 수익을 드리고 있어요.
        <br /> 실제로 하브루타DAO엔 꾸준히 월 수백 ~ 수천 토큰 이상의 수익을 가져가는 많은
        지식공유자들이 계셔요.
      </Paragraph>
      <Title level={5}>4. 하브루타DAO의 강의는 지식공유자가 자유롭게 운영할 수 있습니다.</Title>
      <Paragraph style={{ fontSize: '16px' }}>
        강의에 필요한 토큰 설정 등 지식공유자는 자신의 강의를 자유롭게 운영할 수 있습니다.
        학습자들과 소식을 공유하고 자유롭게 운영해 주세요.
      </Paragraph>
    </Modal>
  );
}

export default UploadNotiModal;
