import { Button, Card, Input, Space, Typography, Form } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import { PostInterface } from '../../pages';
import * as Sentry from '@sentry/react';

const { TextArea } = Input;
const { Text } = Typography;

export default function UploadPost() {
  const [form] = Form.useForm();
  
  const [isValue, setIsValue] = useState('');
  console.log('입력한 내용===', isValue)

  function publish(){
    axios.post('http://localhost:8000/article', {
      user_id : 4,
      article_content: `${isValue}`,
    })
    .then((res)=>{
      console.log('상태 리턴', res)
      completeToast()
    })
    .catch((error)=>{
      Sentry.captureException(error);
    })

  }

  //데이터 전송 후 200토스트  
  function completeToast(){
    return alert('전송이 완료되었습니다!')
  }

  return (
    <UploadCard style={{ width: '100%' }}>
      <Text strong>sungman5</Text>
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
