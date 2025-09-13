# AI Docent API

AI 기반 도큐멘트 및 대화형 AI 서비스를 제공하는 NestJS 기반 마이크로서비스입니다.

![캡처3](./readme/sample02.png)
![캡처2](./readme/sample01.png)

## 📋 프로젝트 개요

AI Docent API는 프로젝트 기반의 AI 챗봇 서비스를 제공하는 REST API입니다. 각 프로젝트는 독립적인 AI 어시스턴트로 동작하며, 텍스트/음성 입력을 지원하고 다양한 응답 형태(텍스트, 스트리밍, TTS)를 제공합니다.

## 🏗️ 프로젝트 구조

```
src/
├── main.ts                    # 애플리케이션 진입점
├── app.module.ts              # 루트 모듈
├── server/
│   ├── aidocent/              # 메인 비즈니스 로직
│   │   ├── aidocent.controller.ts    # API 엔드포인트
│   │   ├── aidocent.service.ts       # 비즈니스 로직
│   │   ├── auth/                     # 인증 관련
│   │   ├── dal/                      # 데이터 액세스 레이어
│   │   │   ├── entities/             # 데이터베이스 엔티티
│   │   │   ├── dto/                  # 데이터 전송 객체
│   │   │   └── layers/               # DAL 구현체
│   │   └── dto/                      # API DTO
│   ├── config/                # 설정 파일
│   ├── constants/             # 상수 및 유틸리티
│   └── utils/                 # 외부 서비스 연동
│       ├── open-ai/           # OpenAI 서비스
│       ├── clova/             # 네이버 클로바 서비스
│       ├── google/            # 구글 서비스
│       ├── etri/              # ETRI 서비스
│       └── common/            # 공통 유틸리티
└── view/                      # EJS 템플릿
```

## 🚀 주요 기능

### 1. 프로젝트 관리
- 프로젝트 생성, 수정, 삭제
- REST API 키 관리
- 프로젝트별 독립적인 AI 설정

### 2. AI 대화 서비스
- **텍스트 질문/답변**: 일반적인 텍스트 기반 대화
- **음성 질문**: 음성 파일 업로드를 통한 질문
- **스트리밍 응답**: 실시간 스트리밍 답변
- **TTS 응답**: 음성으로 변환된 답변

### 3. 대화 관리
- 대화 세션 관리
- 대화 히스토리 저장 및 조회
- 메모리 압축 기능

### 4. 검색 및 요약
- 태그 기반 정보 검색
- 구글 커스텀 검색 연동
- AI 기반 요약 서비스

## 🛠️ 기술 스택

- **Framework**: NestJS 8.x
- **Database**: MySQL (TypeORM)
- **AI Services**: 
  - OpenAI (GPT, Whisper)
  - 네이버 클로바 (TTS, STT)
  - ETRI (한국어 처리)
- **Authentication**: JWT
- **Documentation**: Swagger
- **Language**: TypeScript

## 📦 설치 및 실행

### 환경 요구사항
- Node.js 16+
- MySQL 8.0+
- macOS/Linux (Windows는 .bat 파일 사용)

### 설치
```bash
npm install
```

### 환경 설정
`.env` 파일을 생성하고 다음 변수들을 설정하세요:

```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=your_database
DB_TIMEZONE=+09:00

# JWT
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret

# Swagger
SWAGGER_USER=admin
SWAGGER_PWD=password

# External APIs
OPENAI_API_KEY=your_openai_key
CLOVA_CLIENT_ID=your_clova_id
CLOVA_CLIENT_SECRET=your_clova_secret
GOOGLE_API_KEY=your_google_key
GOOGLE_SEARCH_ENGINE_ID=your_search_engine_id
```

### 실행 명령어

```bash
# 로컬 환경 실행
npm run start:local

# 개발 환경 실행
npm run start:dev

# 프로덕션 환경 실행
npm run start:prod

# 빌드
npm run build:dev    # 개발 환경 빌드
npm run build:prod   # 프로덕션 환경 빌드

# 배포
npm run deploy:dev   # 개발 환경 배포
```

## 📚 API 문서

- **Swagger UI**: `http://localhost:4000/api-docs`
- 인증이 필요한 API는 헤더에 `Project Rest API Key`를 포함해야 합니다.
- Swagger 인증 정보는 `.env` 파일의 `SWAGGER_USER/SWAGGER_PWD`를 참고하세요.

![캡처1](./readme/swagger.png)

## 🔧 주요 API 엔드포인트

### 프로젝트 관리
- `GET /proj/all` - 모든 프로젝트 조회
- `POST /proj/new` - 새 프로젝트 생성
- `GET /proj/:projId/info` - 특정 프로젝트 정보 조회
- `PATCH /proj/:projId/info` - 프로젝트 정보 수정
- `POST /proj/:projId/del` - 프로젝트 삭제

### AI 대화 서비스
- `POST /aid/chat/ask` - 텍스트 질문/답변
- `POST /aid/chat/ask/stream` - 스트리밍 답변
- `POST /aid/chat/ask/tts` - TTS 음성 답변
- `POST /aid/chat/ask/voice` - 음성 질문
- `POST /aid/chat/new/convo` - 새 대화 세션 생성

### 검색 및 요약
- `POST /search/tags/summary` - 태그 기반 검색 및 요약

## 🔒 보안

- JWT 기반 인증
- REST API 키를 통한 프로젝트별 접근 제어
- CORS 설정으로 도메인 제한
- 세션 기반 상태 관리

## 📝 CORS 설정

CORS 관련 자세한 내용은 [여기](https://inpa.tistory.com/entry/AXIOS-%F0%9F%93%9A-CORS-%EC%BF%A0%ED%82%A4-%EC%A0%84%EC%86%A1withCredentials-%EC%98%B5%EC%85%98)를 참고하세요.

## 🚀 배포

### PM2를 사용한 프로덕션 배포
```bash
npm run build:prod
pm2 start
pm2 reload aidocent-api
```

### SFTP를 사용한 개발 환경 배포
```bash
npm run deploy:dev
```

