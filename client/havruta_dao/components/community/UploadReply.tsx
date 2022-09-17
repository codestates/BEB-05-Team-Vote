import { Button, Card, Input, Space, Typography } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { PostInterface } from '../../pages';
import { loginInfoState } from '../../states/loginInfoState';
import * as Sentry from '@sentry/react';
import { now } from 'next-auth/client/_utils';
import useDidMoundEffect from '../../states/useDidMountEffect';

const { TextArea } = Input;
const { Title, Text } = Typography;

export default function UploadReply({
  eachArticle,
  setCommentList,
  commentList,
}: {
  eachArticle: PostInterface;
  setCommentList: Function;
  commentList: any;
}) {
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoState);
  const [isComment, setIsComment] = useState('');

  useDidMoundEffect(() => {
    console.log('입력!', commentList);
    try{
      axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/comment`, {
      user_id: loginInfo.user_id,
      article_id: eachArticle.article_id,
      comment_content: `${isComment}`,
    })
    .then((res)=>{
      console.log('데이터 입력 완료!')
    });
    }
    catch (error) {
      Sentry.captureException(error);      
    }    
  }, [commentList]);

  function send_comment() {
    console.log('실행!');    
    const newComment = {
      comment_content: `${isComment}`,
      created_at: now(),
      user_id: loginInfo.user_id,
      user:{
        user_nickname: loginInfo.user_nickname},
    };
    setCommentList((commentList = [...commentList, newComment]));
  }

  return (
    <UploadCard style={{ width: '100%' }}>
      <Space direction="vertical" size={'middle'} style={{ width: '100%' }}>
        <Space>
          <Text strong>
            <span style={{ color: '#9b4dea' }}>{loginInfo.user_nickname}</span>님의 댓글
          </Text>
        </Space>
        <TextArea
          rows={5}
          bordered={false}
          placeholder="내용을 입력하세요."
          style={{ padding: 0 }}
          value={isComment}
          onChange={(e) => setIsComment(e.target.value)}
        />
        <Button
          onClick={() => send_comment()}
          type="primary"
          shape={'round'}
          style={{ float: 'right' }}
        >
          댓글달기
        </Button>
      </Space>
    </UploadCard>
  );
}

const UploadCard = styled(Card)`
  background-color: #f9f9f9;
`;
