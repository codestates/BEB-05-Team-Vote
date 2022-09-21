import { expect } from 'chai';
import { describe } from 'mocha';
import axios from 'axios';

describe('커뮤니티 활동으로 포인트 획득', () => {
  it('글 작성시 포인트 획득', async () => {
    const userInfo = await axios.get(
      'http://localhost:8000/user/userinfo?user_id=6'
    );
    const beforePoint: Number = Number(userInfo.data[0].user_point);

    const postArticle = async () => {
      await axios.post(`http://localhost:8000/article`, {
        user_id: 6,
        article_content: 'test article',
      });
      const userInfo = await axios.get(
        'http://localhost:8000/user/userinfo?user_id=6'
      );
      const afterPoint = Number(userInfo.data[0].user_point);
      return afterPoint;
    };

    const afterPoint = postArticle();

    expect(Number(afterPoint) - Number(beforePoint)).to.equal(5);
  });

  it('댓글 작성시 포인트 획득', async () => {
    const userInfo = await axios.get(
      'http://localhost:8000/user/userinfo?user_id=6'
    );
    const beforePoint: Number = Number(userInfo.data[0].user_point);

    const postComment = async () => {
      await axios.post(`http://localhost:8000/comment`, {
        user_id: 6,
        article_id: 51,
        comment_content: 'test comment',
      });
      const userInfo = await axios.get(
        'http://localhost:8000/user/userinfo?user_id=6'
      );
      const afterPoint = Number(userInfo.data[0].user_point);
      return afterPoint;
    };

    const afterPoint = postComment();

    expect(Number(afterPoint) - Number(beforePoint)).to.equal(3);
  });
});

describe('포인트를 토큰으로 전환', () => {
  it('신청했을 때 포인트 비교', async () => {
    const userInfo = await axios.get(
      'http://localhost:8000/user/userinfo?user_id=6'
    );
    const beforePoint: Number = Number(userInfo.data[0].user_point);

    const exchangeToken = async () => {
      await axios.post('http://localhost:8000/exchange', {
        user_id: 6,
        user_point: 5,
      });
      const userInfo = await axios.get(
        'http://localhost:8000/user/userinfo?user_id=6'
      );
      const afterPoint = Number(userInfo.data[0].user_point);
      return afterPoint;
    };

    const afterPoint = exchangeToken();

    expect(Number(beforePoint) - Number(afterPoint)).to.equal(5);
  });
  it('신청했을 때 토큰 비교', async () => {
    const beforeToken = await axios.post('http://localhost:8000/getbalance', {
      address: '0xE8Cf73e4e60c7fbC60A7d5931009aBBAE21B8465',
    });
    const numberBeforeToken = Number(beforeToken.data);

    const exchangeToken = async () => {
      await axios.post('http://localhost:8000/exchange', {
        user_id: 6,
        user_point: 5,
      });
      const afterToken = await axios.post('http://localhost:8000/getbalance', {
        address: '0xE8Cf73e4e60c7fbC60A7d5931009aBBAE21B8465',
      });
      const numberAfterToken = Number(afterToken.data);
      return numberAfterToken;
    };

    const numberAfterToken = exchangeToken();

    expect(Number(numberBeforeToken) - Number(numberAfterToken)).to.equal(1);
  });
});

describe('nft', () => {
  it('토큰으로 nft 민팅', () => {});
  it('nft로 모든 강의 수강', () => {});
});
