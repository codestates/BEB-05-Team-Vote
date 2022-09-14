import { AlignCenterOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Col, PageHeader, Row, Radio, Typography, Card } from 'antd';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Post from '../components/community/Post';
import UploadPost from '../components/community/UploadPost';
import RcmdCourse from '../components/RcmdCourse';
import * as Sentry from '@sentry/react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

export interface PostInterface {
  article_id: number;
  user_id: number;
  article_content: string;
  like_count: number;
  comment_count: number;
  created_at: string;
  user: {
    user_id: number;
    user_address: string;
    user_network: string;
    user_nickname: string;
    user_introduction: string;
    created_at: string;
    updated_at: string;
  };
}

const { Text } = Typography;

const Home: NextPage = ({post}:any) => {
  const [postList, setPostList] = useState([]);
  console.log('폭스트',post)

  const router = useRouter();
  // console.log(router)
  
  // useEffect(() => {
  //   getRecentPost();   
  // }, [postList]);

  function getRecentPost() {
    axios
      .get('http://localhost:8000/article/recent')
      .then((result) => {
        console.log('ㅇㅇㅇ', result.data);
        setPostList(result.data);
      })
      .catch((error) => {
        Sentry.captureException(error);
      });
  }

  function getLikePost() {
    axios
      .get('http://localhost:8000/article/like')
      .then((result) => {
        console.log('인기 글 불러오기===', result);
        setPostList(result.data);
        console.log('포스트리스트', postList);
      })
      .catch((error) => {
        Sentry.captureException(error);
      });
  }

  return (
    <div>
      <Row>
        <Col xl={16} xs={24}>
          <PageHeader
            backIcon={<AlignCenterOutlined />}
            onBack={() => null}
            title="하브루타 커뮤니티"
            extra={
              <Radio.Group defaultValue="a" size={'small'}>
                <Radio.Button onClick={() => getRecentPost()} value="a">
                  최신
                </Radio.Button>
                <Radio.Button onClick={() => getLikePost()} value="b">
                  추천
                </Radio.Button>
              </Radio.Group>
            }
          />
          <UploadPost />

          {/* {
            post.map((element:PostInterface)=>{
              return(
                <Post article={element}/>
              )
            })
          } */}
          
        </Col>
        <Col xl={8} xs={0}>
          <PageHeader
            backIcon={<AlignCenterOutlined />}
            onBack={() => null}
            title="추천강의"
            extra={
              <Link href="/courses" key={1}>
                <div style={{ cursor: 'pointer' }} title="전체 강의 보기">
                  <ArrowRightOutlined /> 더보기
                </div>
              </Link>
            }
          />
          <RcmdCourse />
        </Col>
      </Row>
    </div>
  );
};

const PostCard = styled(Card)`
  width: 100%;
  margin-top: -1px;

  :hover {
    cursor: pointer;
    background-color: rgba(200, 200, 200, 0.1);
  }
`;



export async function getServerSideProps(res:any){
  try {
    
    const abc = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT}/article/recent`);        
    const post = abc.data;    
    console.log(res)
    return {      
      props: {
        post
      },
    };
  } catch (error) {
    Sentry.captureException(error);
    return { props: {} };
  }
}

export default Home;


