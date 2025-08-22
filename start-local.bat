@echo off
echo ====================================
echo   AI Docent API - Local Environment
echo ====================================

REM 환경 변수 설정
set NODE_ENV=local
set PORT=4000
set DEBUG=verbose,debug,log,info,warn,error,aid:*

REM DB 설정 (로컬 환경용 - 필요에 따라 수정)
set DB_HOST=localhost
set DB_PORT=3306
set DB_USERNAME=root
set DB_PASSWORD=your_password
set DB_DATABASE=aidocent_local
set DB_TIMEZONE=+09:00

REM JWT 설정
set JWT_SECRET=your_jwt_secret_key
set SESSION_SECRET=your_session_secret

REM Swagger 설정
set SWAGGER_USER=admin
set SWAGGER_PWD=admin123

echo 환경 변수 설정 완료
echo NODE_ENV: %NODE_ENV%
echo PORT: %PORT%
echo DB_HOST: %DB_HOST%
echo DB_DATABASE: %DB_DATABASE%
echo.

REM 의존성 설치 확인
echo 의존성 확인 중...
if not exist "node_modules" (
    echo node_modules가 없습니다. npm install을 실행합니다...
    npm install
)

REM 빌드
echo 프로젝트 빌드 중...
npm run build

REM 서버 시작
echo 서버 시작 중...
echo CORS 설정을 확인하세요!
echo.
node dist/main.js

pause
