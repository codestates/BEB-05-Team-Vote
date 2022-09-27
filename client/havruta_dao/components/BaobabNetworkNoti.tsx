import { Card, Typography } from 'antd';
const { Title } = Typography;
export default function BaobabNetworkNoti() {
  return (
    <Card style={{ width: '100%' }}>
      <Title level={3} type="warning" style={{ textAlign: 'center' }}>
        하브루타 DAO는 Klaytn Baobab Test Network에 배포되어 있습니다.
        <br />
        Baobab Test Network로 변경해 주세요.
      </Title>
    </Card>
  );
}
