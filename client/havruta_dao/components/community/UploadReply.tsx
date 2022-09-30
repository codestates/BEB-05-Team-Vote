import { Button, Card, Input, Space, Typography } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { loginInfoState } from '../../states/loginInfoState';
import * as Sentry from '@sentry/react';
import { useSWRConfig } from 'swr';
import { useRouter } from 'next/router';
import { noti } from '../../lib/notification';

const { TextArea } = Input;
const { Text } = Typography;

export default function UploadReply() {
  const { mutate } = useSWRConfig();
  const router = useRouter();

  const loginInfo = useRecoilValue(loginInfoState);
  const [value, setValue] = useState('');

  async function submitComment() {
    if (value.length === 0) {
      return noti('warning', '댓글을 입력해주세요!');
    }

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/comment`, {
        user_id: loginInfo.user_id,
        article_id: Number(router.query.post_id),
        comment_content: value,
      });

      if (res.status === 201) {
        mutate(
          `${process.env.NEXT_PUBLIC_ENDPOINT}/article/select?article_id=${router.query.post_id}`
        );
        setValue('');
      }
    } catch (error) {
      Sentry.captureException(error);
    }
  }

  return (
    <Card style={{ width: '100%' }}>
      <Space direction="vertical" size={'middle'} style={{ width: '100%' }}>
        <Space>
          <Text strong>
            <span style={{ color: '#bae637' }}>{loginInfo.user_nickname}</span>님의 댓글
          </Text>
        </Space>
        <TextArea
          rows={5}
          bordered={false}
          placeholder="댓글을 남겨보세요."
          style={{ padding: 0 }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button
          onClick={() => submitComment()}
          type="primary"
          shape={'round'}
          style={{ float: 'right' }}
        >
          댓글달기
        </Button>
      </Space>
    </Card>
  );
}
