@echo off
echo ====================================
echo   AI Docent API - Build and Start
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
echo.

REM 의존성 설치
echo 의존성 설치 중...
npm install

REM 빌드
echo 프로젝트 빌드 중...
npm run build

if %ERRORLEVEL% neq 0 (
    echo 빌드 실패!
    pause
    exit /b 1
)

echo 빌드 성공!
echo.

REM 서버 시작
echo 서버 시작 중...
echo 브라우저에서 http://localhost:4000/api 로 Swagger 확인 가능
echo CORS 로그를 확인하세요!
echo Ctrl+C로 서버를 중지할 수 있습니다.
echo.
node dist/main.js

pause
