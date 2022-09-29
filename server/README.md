# Backend

## DB Schema

![Vote](https://user-images.githubusercontent.com/100079037/192482664-ba5ff19b-5016-4dd5-856a-77ede539b648.png)

## Server 연결

프로젝트 연결

```
git clone https://github.com/codestates/BEB-05-Team-Vote.git
```

```
cd BEB-05-TEAM-VOTE
cd server
```

환경변수 설정

```
touch .env
vim .env
// .env 파일 내용 입력(PORT, DATABASE_URL, TOKEN_CA, BATCH_CA, PASS_CA, DEPLOY_ADDRESS, DEPLOY_PRIVATEKEY)
```

Docker Compose에 정의되어 있는 서비스 컨테이너를 백그라운드에서 띄우기

```
sudo docker compose up -d --build
```

Certbot의 nginx 옵션 이용하여 인증서를 발급받고 적용(서버에 https 적용)

```
./init-letsencrypt.sh
```

```
docker compose down
```

https 적용된 서버 활성화

```
sudo docker compose up -d --build
```

## Token Batch Transfer

1. UTC Timezone 기준으로 매일 0시 0분 0초에 하루 동안 발생한 모든 커뮤니티 활동 조회. (커뮤니티 글, 댓글, 좋아요)

2. 커뮤니티 활동으로 활동 점수를 계산한 후, 점수가 높은 순으로 정렬.  
   (활동 점수 : 작성한 글 수 _ 3 + 작성한 댓글 수 _ 2 + 좋아요 누른 수 \* 1)

3. 하루 토큰 발행량은 500개로 고정.  
   활동 점수 1점 당 토큰 1개 지급.  
   활동 점수 총합이 500점을 넘으면 점수 높은 순으로 500개까지만 지급.

4. batchTransfer Function을 사용하여 토큰 일괄 지급.

## NFT Minting

1. 클라이언트에서 Approve를 한 다음, 서버에 NFT Minting 요청.

2. 서버에서 사용자의 Token Balance 조회하고, NFT Price와 비교.

3. Token Balance가 NFT Price 보다 많거나 같으면 mintNFT Function을 사용하여 NFT 발급.
