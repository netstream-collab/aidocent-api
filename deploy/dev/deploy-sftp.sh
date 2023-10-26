#!/bin/sh
# ./deploy/dev/deploy-sftp.sh -e
# Permission denied : chmod +x ./deploy/dev/deploy-sftp.sh
# Local -> Remote

REMOTE_USERNAME="ec2-user"
REMOTE_SERVER_IP="3.35.26.170"
REMOTE_PEM_PATH="/Users/netstream/Documents/00__Server_Key/key-gallery2-dev.pem"


REMOTE_DIR="./apps/aidocent-micro-server"
LOCAL_DIR="./dist"
PM2_APP_NAME="aidocent-api"

SRC_DIR="./src"


# ssh 로 접속해 dir 확인
ssh -i $REMOTE_PEM_PATH $REMOTE_USERNAME@$REMOTE_SERVER_IP << EOF
# REMOTE_DIR가 없을 경우 생성하기
if [ ! -d $REMOTE_DIR ]
  then
    mkdir $REMOTE_DIR
fi
cd $REMOTE_DIR

rm ./package.json
rm ./package-lock.json
rm -rf ./node_modules
rm -rf $LOCAL_DIR


rm -rf  $SRC_DIR
mkdir $SRC_DIR
mkdir $SRC_DIR/view
mkdir $SRC_DIR/static

exit
EOF

# sftp를 이용해 빌드 파일 업로드
#
sftp -i $REMOTE_PEM_PATH $REMOTE_USERNAME@$REMOTE_SERVER_IP << EOF
cd $REMOTE_DIR
put ./package.json
put .env
put ./ecosystem.config.js
put -r $LOCAL_DIR
cd ./src
put -r ./src/view
put -r ./src/static
quit
EOF

# 빌드 파일 백업 - 빌드 파일 실행
ssh -i $REMOTE_PEM_PATH $REMOTE_USERNAME@$REMOTE_SERVER_IP << EOF
cd $REMOTE_DIR
zip -r $LOCAL_DIR-$(date "+%Y%m%d")_$(date "+%H%M%S").zip $LOCAL_DIR ./package.json ./.env ./ecosystem.config.js
npm install --production --legacy-peer-deps
pm2 reload $PM2_APP_NAME
exit
EOF