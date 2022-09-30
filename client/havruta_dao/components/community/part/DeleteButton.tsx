import React from 'react';
import { useRecoilValue } from 'recoil';
import axios from 'axios';
import { mutate } from 'swr';
import { DeleteOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import { noti } from '../../../lib/notification';
import { loginInfoState } from '../../../states/loginInfoState';
import { DeleteButton } from '../../../types/Post';
import { useRouter } from 'next/router';

function DeleteButton({ type, id }: DeleteButton) {
  const router = useRouter();
  const loginInfo = useRecoilValue(loginInfoState);

  const onPostDelete = async (id: number) => {
    let res;
    if (type === 'post') {
      res = await axios.delete(`${process.env.NEXT_PUBLIC_ENDPOINT}/article`, {
        data: {
          user_id: loginInfo.user_id,
          article_id: id,
        },
      });
    } else if (type === 'comment') {
      res = await axios.delete(`${process.env.NEXT_PUBLIC_ENDPOINT}/comment`, {
        data: {
          user_id: loginInfo.user_id,
          comment_id: id,
        },
      });
    }
    if (res?.status === 201) {
      noti('success', `${type}이 성공적으로 삭제되었습니다.`);
      type === 'post'
        ? mutate(`${process.env.NEXT_PUBLIC_ENDPOINT}/article/recent`)
        : mutate(
            `${process.env.NEXT_PUBLIC_ENDPOINT}/article/select?article_id=${router.query.post_id}`
          );
    }
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Popconfirm
        title={`정말 ${type}을 삭제하시겠습니까?`}
        onConfirm={() => onPostDelete(id)}
        okText="삭제"
        cancelText="취소"
      >
        <DeleteOutlined style={{ color: '#ff7875' }} />
      </Popconfirm>
    </div>
  );
}

export default DeleteButton;
