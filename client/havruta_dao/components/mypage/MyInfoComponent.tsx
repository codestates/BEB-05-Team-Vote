import { Space, Input } from 'antd';
import { useRecoilState } from 'recoil';
import { loginInfoState } from '../../states/loginInfoState';

export default function MyInfoComponent() {
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoState);

  const { TextArea } = Input;
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
      <label htmlFor="nickname">닉네임</label>
      <Input id="nickname" style={{ color: '#ffffff' }} value={loginInfo.user_nickname} disabled />
      <label htmlFor="address">지갑주소</label>
      <Input id="address" style={{ color: '#ffffff' }} value={loginInfo.user_address} disabled />
      <label htmlFor="introduction">소개글</label>
      <TextArea
        id="introduction"
        style={{ color: '#ffffff' }}
        value={loginInfo.user_introduction}
        rows={3}
        disabled
      />
    </Space>
  );
}
