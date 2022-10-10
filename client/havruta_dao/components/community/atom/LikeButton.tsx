import React from 'react';
import { useSession } from 'next-auth/react';
import { useRecoilValue } from 'recoil';
import axios from 'axios';
import { mutate } from 'swr';
import { Button } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import { loginInfoState } from '../../../states/loginInfoState';
import { useRouter } from 'next/router';

function LikeButton({ type, article_id, like_count }: LikeButton) {
  const router = useRouter();
  const { data: session } = useSession();
  const loginInfo = useRecoilValue(loginInfoState);

  const fetchLike = async (article_id: number) => {
    if (session) {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/like`, {
        user_id: loginInfo.user_id,
        article_id: article_id,
      });
      if (res.status === 201) {
        type === 'post'
          ? mutate(`${process.env.NEXT_PUBLIC_ENDPOINT}/article/recent`)
          : mutate(
              `${process.env.NEXT_PUBLIC_ENDPOINT}/article/select?article_id=${router.query.post_id}`
            );
      }
    }
  };

  return (
    <Button
      type="link"
      icon={<LikeOutlined />}
      size="small"
      onClick={(e) => {
        e.stopPropagation();
        fetchLike(article_id);
      }}
    >
      {' '}
      {like_count}
    </Button>
  );
}

export default LikeButton;
