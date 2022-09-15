import { LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { Card, Space, Typography, Button, Row, Col, PageHeader } from 'antd';
import { useRouter } from 'next/router';
import Reply from '../../../components/community/Reply';
import UploadReply from '../../../components/community/UploadReply';
import { PostInterface } from '../..';
import axios from 'axios';
import * as Sentry from '@sentry/react';
import { useState } from 'react';
import { loginInfoState } from '../../../states/loginInfoState';
import { useRecoilState } from 'recoil';

export default function PostDetail({eachArticle}:{eachArticle:PostInterface}) {
  const {Text } = Typography;
  const router = useRouter();    
  const [commentList, setCommentList] = useState(eachArticle.comments);
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoState);
  console.log('이즈코멘트', eachArticle.comments)
  
  // console.log('개별 포스트?===', eachArticle[0])  

  return (
    <section>
      <Space style={{ width: '100%' }}>
        <PageHeader title="목록으로" style={{ paddingLeft: 0 }} onBack={() => router.back()} />
      </Space>
      <Row gutter={48}>
        <Col span={16}>
          <Card style={{ width: '100%', marginTop: '-1px' }}>
            <Space direction="vertical" size={'large'}>
              <Space>
                <Text strong>{eachArticle.user.user_nickname}</Text>
                <Text type="secondary">{eachArticle.created_at}</Text>
              </Space>
              {eachArticle.article_content}
              <Space>
                <Button type="link" icon={<LikeOutlined />} size="small">
                  {' '}
                  {eachArticle.like_count}
                </Button>
                <Button type="link" icon={<MessageOutlined />} size="small">
                  {' '}
                  {eachArticle.comment_count}
                </Button>
              </Space>
            </Space>
          </Card>          
          <UploadReply eachArticle={eachArticle} setCommentList={setCommentList} commentList={commentList}/>
          {/* ---map--- */}
          {
            commentList.length === 0 ? <div style={{textAlign : `center`, paddingTop:'32px'}}>댓글이 없습니다. 첫 댓글을 달아보세요!</div> :          
            commentList.map((element, i)=>{
            return(
              <Reply key={i} comments={element}/>
            )
          })}
          {/* ---map--- */}
        </Col>
        <Col span={16}>{/* 빈칸입니다. */}</Col>
      </Row>
    </section>
  );
}

export const getServerSideProps = async (context:any) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT}/article/select?article_id=${context.params?.post_id}`);
    const eachArticle = res.data[0];
    return {
      props: {
        eachArticle,
      },
    };
  } catch (error) {
    Sentry.captureException(error);
    return { props: {} };
  }
};
