import React from 'react';
import { useRecoilValue } from 'recoil';
import axios from 'axios';
import { mutate } from 'swr';
import { DeleteOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import { noti } from '../../../lib/notification';
import { loginInfoState } from '../../../states/loginInfoState';
import { DeleteButton } from '../../../types/Post';

function DeleteButton({ article_id }: DeleteButton) {
  const loginInfo = useRecoilValue(loginInfoState);

  const onPostDelete = async (article_id: number) => {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_ENDPOINT}/article`, {
      data: {
        user_id: loginInfo.user_id,
        article_id: article_id,
      },
    });
    if (res.status === 201) {
      noti('success', '게시글이 성공적으로 삭제되었습니다.');
      mutate(`${process.env.NEXT_PUBLIC_ENDPOINT}/article/recent`);
    }
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Popconfirm
        title="정말 게시글을 삭제하시겠습니까?"
        onConfirm={() => onPostDelete(article_id)}
        okText="삭제"
        cancelText="취소"
      >
        <DeleteOutlined style={{ color: '#ff7875' }} />
      </Popconfirm>
    </div>
  );
}

export default DeleteButton;
