import { Space, Input, message } from 'antd';
import { useRecoilState } from 'recoil';
import { loginInfoState } from '../../states/loginInfoState';
const { TextArea } = Input;

export default function MyInfoComponent() {
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoState);

  const copyAddressToClipboard = () => {
    navigator.clipboard.writeText(loginInfo.user_address);
    message.success('지갑 주소가 복사되었습니다!');
  };
  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
        border: '1px solid grey',
        padding: '16px',
        borderRadius: '8px',
      }}
    >
      <label htmlFor="address">지갑주소</label>
      <Input
        id="address"
        style={{ cursor: 'pointer' }}
        value={loginInfo.user_address}
        readOnly
        onClick={copyAddressToClipboard}
      />
      <label htmlFor="nickname">닉네임</label>
      <Input id="nickname" value={loginInfo.user_nickname} readOnly />
      <label htmlFor="introduction">소개글</label>
      <TextArea id="introduction" value={loginInfo.user_introduction} rows={3} readOnly />
    </Space>
  );
}
