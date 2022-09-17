import {
  AlignCenterOutlined,
  ArrowRightOutlined,
  LikeOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import { Col, PageHeader, Row, Radio, Typography, Card, Space, Button } from 'antd';
import type { NextPage } from 'next';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import UploadPost from '../components/community/UploadPost';
import RcmdCourse from '../components/RcmdCourse';
import * as Sentry from '@sentry/react';
import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { loginInfoState } from '../states/loginInfoState';
import { useRecoilState } from 'recoil';
import useDidMoundEffect from '../states/useDidMountEffect';

export interface PostInterface {
  article_id: number;
  user_id: number;
  article_content: string;
  like_count: number;
  comment_count: number;
  comments: [];
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


const Home: NextPage = ({ post }: any) => {
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoState);
  
  //좋아요 데이터 state
  const likeData = [...post]
  const [isLike, setIsLike] = useState(likeData);  
  const [isIndex, setIsIndex] = useState(Number); // 인덱스를 상태로 저장
  
  //업로드시 데이터 state
  const uploadPost = [...post]
  const [isUpload, setIsUpload] = useState(uploadPost);  

  // 최초 마운트시 데이터 state
  const mountData = [...post]
  const [postList, setPostList] = useState(mountData);
  
  
  console.log('로그인함?', loginInfo)
  console.log('포스트 근황====', uploadPost);    

  function click_like(article_id: number, like_count: number) {
    let copy = [...isLike];
    let index:number = copy.findIndex((obj) => obj.article_id === article_id);
    copy[index].like_count = like_count + 1;
    setIsIndex(index);
    setIsLike(copy);

  }

  useDidMoundEffect(() => {
      console.log('입력!');
      console.log('로그인유저아이디', loginInfo.user_id);
      console.log('아티클아이디', isLike[isIndex].article_id);
      try {
        axios
          .post(`${process.env.NEXT_PUBLIC_ENDPOINT}/like`, {
            user_id: loginInfo.user_id,
            article_id: post[isIndex].article_id, // 변경된 객체의 인덱스를 정확히 표시해야함.
          })
          .then((res) => {
            console.log('데이터 입력 완료!', res);
          });
      } catch (error) {
        Sentry.captureException(error);
      }
    },
    [isLike]
  );

  // console.log('회원정보====', loginInfo);

  function getRecentPost() {
    axios
      .get(`${process.env.NEXT_PUBLIC_ENDPOINT}/article/recent`)
      .then((result) => {
        console.log('ㅇㅇㅇ', result.data);
        setPostList(result.data);
      })
      .then((res)=>{
        console.log('최신 순 정렬 성공')
      })
      .catch((error) => {
        Sentry.captureException(error);
      });
  }

  function getLikePost() {    
    axios
      .get(`${process.env.NEXT_PUBLIC_ENDPOINT}/article/like`)
      .then((result) => {
        setPostList(result.data);
      })
      .then((res)=>{
        console.log('추천 순 정렬 성공')
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
          {
            loginInfo.user_network === 0 ? 
            <Space align="center" style={{width:'100%', justifyContent:'center', paddingTop:'20px', paddingBottom:'40px'}}>
              <Text style={{fontSize:'20px'}}>지금 지갑을 연결하고<br/>커뮤니티 활동을 시작하세요</Text>
            </Space>            
            : <UploadPost isUpload={isUpload} setIsUpload={setIsUpload} />
          } 

          {isUpload.map((element: PostInterface) => {
            return (
              <Link href={`/community/details/${element.article_id}`}>
                <div key={element.article_id}>
                  <PostCard>
                    <Space direction="vertical" size={'large'}>
                      <Space>
                        <Text strong>{element.user.user_nickname}</Text>
                        <Text type="secondary">{element.created_at}</Text>
                      </Space>
                      {element.article_content}
                      <Space>
                        <Button
                          type="link"
                          icon={<LikeOutlined />}
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            // click_like(element.article_id, element.user_id, element.like_count);
                            
                            click_like(element.article_id, element.like_count);
                          }}
                        >
                          {' '}
                          {element.like_count}
                        </Button>
                        <Button type="link" icon={<MessageOutlined />} size="small">
                          {' '}
                          {element.comment_count}
                        </Button>
                      </Space>
                    </Space>
                  </PostCard>
                </div>
              </Link>
            );
          })}
        </Col>
        <Col xl={8} xs={0}>
          <PageHeader
            backIcon={<AlignCenterOutlined />}
            onBack={() => null}
            title="추천강의"
            extra={
              <div
                style={{ cursor: 'pointer' }}
                title="전체 강의 보기"
                onClick={() => Router.push('/courses')}
                key={1}
              >
                <ArrowRightOutlined /> 더보기
              </div>
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

export const getServerSideProps = async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT}/article/recent`);
    const post = res.data;
    return {
      props: {
        post,
      },
    };
  } catch (error) {
    Sentry.captureException(error);
    return { props: {} };
  }
};

export default Home;
