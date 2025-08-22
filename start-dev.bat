@echo off
echo ====================================
echo   AI Docent API - Development Mode
echo ====================================

REM 환경 변수 설정
set NODE_ENV=dev
set PORT=4000
set DEBUG=verbose,debug,log,info,warn,error,aid:*

REM DB 설정 (개발 환경용 - 실제 값으로 수정 필요)
set DB_HOST=your_dev_db_host
set DB_PORT=3306
set DB_USERNAME=your_dev_username
set DB_PASSWORD=your_dev_password
set DB_DATABASE=your_dev_database
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

REM 개발 모드로 시작 (watch 모드)
echo 개발 서버 시작 중...
echo CORS 설정을 확인하세요!
echo Ctrl+C로 서버를 중지할 수 있습니다.
echo.
npm run start

pause
