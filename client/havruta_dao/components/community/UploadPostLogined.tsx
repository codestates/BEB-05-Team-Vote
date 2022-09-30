import { Button, Card, Input, Typography, Form } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import * as Sentry from '@sentry/react';
import { loginInfoState } from '../../states/loginInfoState';
import { useRecoilValue } from 'recoil';
import { useSWRConfig } from 'swr';
import { noti } from '../../lib/notification';

const { TextArea } = Input;
const { Text } = Typography;

export default function UploadPostLogined() {
  const [form] = Form.useForm();
  const loginInfo = useRecoilValue(loginInfoState);
  const [value, setValue] = useState('');
  const { mutate } = useSWRConfig();

  async function submitPost() {
    if (value.length === 0) {
      return noti('warning', '내용을 입력해주세요!');
    }

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/article`, {
        user_id: loginInfo.user_id,
        article_content: value,
      });

      if (res.status === 201) {
        mutate(`${process.env.NEXT_PUBLIC_ENDPOINT}/article/recent`);
        setValue('');
      }
    } catch (error) {
      Sentry.captureException(error);
    }
  }

  return (
    <Card style={{ width: '100%' }}>
      <Text strong>{loginInfo.user_nickname}</Text>
      <Form form={form} name="content">
        <Form.Item name="article_content">
          <TextArea
            className="article_body"
            rows={5}
            bordered={false}
            placeholder="자유롭게 이야기를 나눠보세요."
            style={{ padding: 0 }}
            value={value} // TextArea 값
            onChange={(e) => setValue(e.target.value)} // 입력된 값으로 isValue 값 변경
          ></TextArea>
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            onClick={() => submitPost()}
            type="primary"
            shape={'round'}
            style={{ float: 'right' }}
          >
            발행하기
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
