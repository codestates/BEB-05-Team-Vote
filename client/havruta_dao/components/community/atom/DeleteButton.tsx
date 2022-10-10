import React from 'react';
import { useRecoilValue } from 'recoil';
import axios from 'axios';
import { mutate } from 'swr';
import { DeleteOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import { noti } from '../../../lib/notification';
import { loginInfoState } from '../../../states/loginInfoState';
import { useRouter } from 'next/router';

function DeleteButton({ type, id }: DeleteButton) {
  const router = useRouter();
  const loginInfo = useRecoilValue(loginInfoState);

  let msg = type === 'comment' ? '댓글' : '게시글';

  const onPostDelete = async (id: number) => {
    let res;
    if (type === 'comment') {
      res = await axios.delete(`${process.env.NEXT_PUBLIC_ENDPOINT}/comment`, {
        data: {
          user_id: loginInfo.user_id,
          comment_id: id,
        },
      });
    } else {
      res = await axios.delete(`${process.env.NEXT_PUBLIC_ENDPOINT}/article`, {
        data: {
          user_id: loginInfo.user_id,
          article_id: id,
        },
      });
    }
    if (res?.status === 201) {
      noti('success', `${msg}이 성공적으로 삭제되었습니다.`);
      type === 'comment'
        ? mutate(
            `${process.env.NEXT_PUBLIC_ENDPOINT}/article/select?article_id=${router.query.post_id}`
          )
        : mutate(`${process.env.NEXT_PUBLIC_ENDPOINT}/article/recent`);
      type === 'detail' && router.push('/');
    }
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Popconfirm
        title={`정말 ${msg}을 삭제하시겠습니까?`}
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
