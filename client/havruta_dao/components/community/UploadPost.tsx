import { Button, Card, Input, Space, Typography, Form } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import { PostInterface } from '../../pages';
import * as Sentry from '@sentry/react';
import { loginInfoState } from '../../states/loginInfoState';
import { useRecoilState } from 'recoil';
import useDidMoundEffect from '../../states/useDidMountEffect';
import { now } from 'next-auth/client/_utils';

const { TextArea } = Input;
const { Text } = Typography;

//데이터 전송 후 200토스트
// export function completeToast() {
//   window.location.reload(); // 글 전송 후 페이지 새로 고침
//   return alert('전송이 완료되었습니다!');
// }

export default function UploadPost({isUpload, setIsUpload}:{isUpload:any, setIsUpload:any}) {
  const [form] = Form.useForm();
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoState);
  const [isValue, setIsValue] = useState('');

  console.log('입력한 내용===', isValue);

  useDidMoundEffect(() => {
    console.log('입력!', isUpload);
    try{
      axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/article`, {
      user_id: loginInfo.user_id,      
      article_content: `${isValue}`,
    })
    .then((res)=>{
      console.log('데이터 입력 완료!')
    });
    }
    catch (error) {
      Sentry.captureException(error);      
    }    
  }, [isUpload]);

  function publish() {    
    const newPost = {
      article_content: `${isValue}`,
      created_at: now(),
      user_id: loginInfo.user_id,
      user:{
        user_nickname: loginInfo.user_nickname
      }
    };
    setIsUpload([...isUpload, newPost]);
  }

  return (
    <UploadCard style={{ width: '100%' }}>
      <Text strong>{loginInfo.user_nickname}</Text>
      <Form form={form} name="content">
        <Form.Item name="article_content">
          <TextArea
            className="article_body"
            rows={5}
            bordered={false}
            placeholder="내용을 입력하세요."
            style={{ padding: 0 }}
            value={isValue} // TextArea 값
            onChange={(e) => setIsValue(e.target.value)} // 입력된 값으로 isValue 값 변경
          ></TextArea>
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            onClick={() => publish()}
            type="primary"
            shape={'round'}
            style={{ float: 'right' }}
          >
            발행하기
          </Button>
        </Form.Item>
      </Form>
    </UploadCard>
  );
}

const UploadCard = styled(Card)`
  background-color: #f9f9f9;
`;
