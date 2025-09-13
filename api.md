# AI Docent API 문서

AI Docent API의 모든 엔드포인트와 사용법을 정리한 문서입니다.

## 📋 목차

- [기본 정보](#기본-정보)
- [인증](#인증)
- [공통 응답 형식](#공통-응답-형식)
- [프로젝트 관리 API](#프로젝트-관리-api)
- [AI 대화 서비스 API](#ai-대화-서비스-api)
- [검색 및 요약 API](#검색-및-요약-api)
- [에러 코드](#에러-코드)

## 기본 정보

- **Base URL**: `http://localhost:4000`
- **API 문서**: `http://localhost:4000/api-docs` (Swagger UI)
- **Content-Type**: `application/json`
- **인코딩**: UTF-8

## 인증

### REST API Key 인증
일부 API는 REST API Key를 통한 인증이 필요합니다.

**헤더 설정:**
```
Authorization: Bearer {REST_API_KEY}
```

**REST API Key 획득:**
1. 프로젝트 생성 시 자동 생성
2. `/proj/:projId/renew/rest-api-key` API를 통한 갱신

## 공통 응답 형식

모든 API는 다음 형식으로 응답합니다:

```json
{
  "status": 200,
  "message": "성공 메시지",
  "data": {
    // 실제 데이터
  }
}
```

### 응답 필드 설명
- `status`: HTTP 상태 코드
- `message`: 응답 메시지
- `data`: 실제 응답 데이터

---

## 프로젝트 관리 API

### 1. 모든 프로젝트 조회

**GET** `/proj/all`

프로젝트 목록을 조회합니다.

**응답 예시:**
```json
{
  "status": 200,
  "message": "",
  "data": {
    "allCount": 1,
    "project": [
      {
        "projId": 4,
        "uuid": "2b46c68a4c7d4983addec259da9d99e8",
        "projCode": "sample01",
        "status": "PS_VALID",
        "name": "sample project 01",
        "description": "설명 추가",
        "userPrompt": "",
        "memo": "",
        "restApiKey": "2b-sample01",
        "createDate": "2023-10-20T02:06:24.000Z",
        "updateDate": "2023-10-20T06:26:32.000Z",
        "deleteDate": null
      }
    ]
  }
}
```

### 2. 신규 프로젝트 생성

**POST** `/proj/new`

새로운 프로젝트를 생성합니다.

**요청 본문:**
```json
{
  "name": "신규 프로젝트",
  "code": "sample",
  "description": "신규 아이템 전시 프로젝트",
  "userPrompt": "친구에게 말하듯이 친근하게 대답해.",
  "memo": "add memo",
  "tags": "넷스트림,상현태,chatRPG"
}
```

**요청 필드:**
- `name` (필수): 프로젝트 이름
- `code` (필수): 프로젝트 코드 (영어, 숫자, 기호만 가능)
- `description` (선택): 프로젝트 설명
- `userPrompt` (선택): 사용자 프롬프트
- `memo` (선택): 메모
- `tags` (선택): 프로젝트 태그 (쉼표로 구분)

**응답 예시:**
```json
{
  "status": 200,
  "message": "",
  "data": {
    "projId": 5,
    "uuid": "e492ad37edd54b05baa791513003a1bb",
    "projCode": "sample",
    "status": "PS_VALID",
    "name": "신규 프로젝트",
    "description": "신규 아이템 전시 프로젝트",
    "userPrompt": "친구에게 말하듯이 친근하게 대답해.",
    "memo": "add memo",
    "restApiKey": "e4-sample",
    "createDate": "2023-10-20 06:45:20",
    "updateDate": "2023-10-20 06:45:20"
  }
}
```

### 3. 특정 프로젝트 정보 조회

**GET** `/proj/:projId/info`

특정 프로젝트의 상세 정보를 조회합니다.

**경로 매개변수:**
- `projId`: 프로젝트 ID

**응답 예시:**
```json
{
  "status": 200,
  "message": "",
  "data": {
    "projId": 4,
    "uuid": "2b46c68a4c7d4983addec259da9d99e8",
    "projCode": "sample01",
    "status": "PS_VALID",
    "name": "sample project 01",
    "description": "설명 추가",
    "userPrompt": "",
    "memo": "",
    "restApiKey": "2b-sample01",
    "createDate": "2023-10-20T02:06:24.000Z",
    "updateDate": "2023-10-20T06:26:32.000Z",
    "deleteDate": null
  }
}
```

### 4. 프로젝트 정보 수정

**PATCH** `/proj/:projId/info`

프로젝트 정보를 수정합니다.

**경로 매개변수:**
- `projId`: 프로젝트 ID

**요청 본문:**
```json
{
  "name": "수정된 프로젝트명",
  "description": "수정된 설명",
  "userPrompt": "수정된 프롬프트",
  "memo": "수정된 메모",
  "tags": "수정된,태그,목록"
}
```

**응답 예시:**
```json
{
  "status": 200,
  "message": "",
  "data": {
    "projId": 4,
    "uuid": "2b46c68a4c7d4983addec259da9d99e8",
    "projCode": "sample01",
    "status": "PS_VALID",
    "name": "수정된 프로젝트명",
    "description": "수정된 설명",
    "userPrompt": "수정된 프롬프트",
    "memo": "수정된 메모",
    "restApiKey": "2b-sample01",
    "createDate": "2023-10-20T02:06:24.000Z",
    "updateDate": "2023-10-20T06:48:59.000Z",
    "deleteDate": null
  }
}
```

### 5. 프로젝트 삭제

**POST** `/proj/:projId/del`

프로젝트를 삭제합니다. (논리적 삭제)

**경로 매개변수:**
- `projId`: 프로젝트 ID

**응답 예시:**
```json
{
  "status": 200,
  "message": "",
  "data": {
    "projId": 4,
    "uuid": "2b46c68a4c7d4983addec259da9d99e8",
    "projCode": "sample01",
    "status": "PS_DEL",
    "name": "신규 프로젝트22",
    "description": "신규 아이템 전시 프로젝트",
    "userPrompt": "친구에게 말하듯이 친근하게 대답해.",
    "memo": "",
    "restApiKey": "2b-sample01",
    "createDate": "2023-10-20T02:06:24.000Z",
    "updateDate": "2023-10-20T06:48:59.000Z",
    "deleteDate": null
  }
}
```

### 6. REST API Key 갱신

**POST** `/proj/:projId/renew/rest-api-key`

프로젝트의 REST API Key를 갱신합니다.

**경로 매개변수:**
- `projId`: 프로젝트 ID

**응답 예시:**
```json
{
  "status": 200,
  "message": "",
  "data": {
    "restApiKey": "e4-sample"
  }
}
```

### 7. 프로젝트 대화 내역 조회

**GET** `/proj/:projId/convo`

특정 프로젝트의 모든 대화 세션을 조회합니다.

**경로 매개변수:**
- `projId`: 프로젝트 ID

**응답 예시:**
```json
{
  "status": 200,
  "message": "",
  "data": {
    "convos": [
      {
        "chatId": 164,
        "projId": 4,
        "uuid": "78f817e228784a33ad93d9aa4d573135",
        "convoSessionId": "U2FsdGVkX1/QKRJWkOUZOwIN7s4LGz36/rvDMaVbMxieqg==",
        "type": "",
        "status": "CHS_VALID",
        "speakerRole": "user",
        "content": "gpt api를 사용할건데, role: system으로 넘길값을 정할 거야. 유용한 팁이 있을까?",
        "errorMsg": "",
        "resType": "",
        "createDate": "2023-10-20T02:28:44.000Z",
        "updateDate": "2023-10-20T02:28:44.000Z",
        "deleteDate": null
      }
    ]
  }
}
```

### 8. 대화 세션별 채팅 조회

**GET** `/proj/convo/chat/:convoSessionId`

특정 대화 세션의 모든 채팅을 조회합니다.

**경로 매개변수:**
- `convoSessionId`: 대화 세션 ID

**응답 예시:**
```json
{
  "status": 200,
  "message": "",
  "data": {
    "chats": [
      {
        "chatId": 163,
        "projId": 4,
        "uuid": "adeaa2362eab45a28061abb97018169a",
        "convoSessionId": "U2FsdGVkX19paOCOWoh8uyRoGsjCxMrGhIW/n4UvfFQXNw==",
        "type": "",
        "status": "CHS_VALID",
        "speakerRole": "assistant",
        "content": "That's great to hear! What made you say \"Wow\"?",
        "errorMsg": "",
        "resType": "text",
        "createDate": "2023-10-20T02:26:47.000Z",
        "updateDate": "2023-10-20T02:26:47.000Z",
        "deleteDate": null
      },
      {
        "chatId": 162,
        "projId": 4,
        "uuid": "57376316d3064f27a5fff2a7eb53a03f",
        "convoSessionId": "U2FsdGVkX19paOCOWoh8uyRoGsjCxMrGhIW/n4UvfFQXNw==",
        "type": "",
        "status": "CHS_VALID",
        "speakerRole": "user",
        "content": "Wow",
        "errorMsg": "",
        "resType": "",
        "createDate": "2023-10-20T02:26:44.000Z",
        "updateDate": "2023-10-20T02:26:44.000Z",
        "deleteDate": null
      }
    ]
  }
}
```

---

## AI 대화 서비스 API

> **주의**: 아래 모든 API는 REST API Key 인증이 필요합니다.

### 1. 프로젝트 정보 조회 (REST API Key)

**GET** `/aid/proj/info`

REST API Key를 통해 프로젝트 정보를 조회합니다.

**헤더:**
```
Authorization: Bearer {REST_API_KEY}
```

**응답 예시:**
```json
{
  "status": 200,
  "message": "",
  "data": {
    "projId": 4,
    "uuid": "2b46c68a4c7d4983addec259da9d99e8",
    "projCode": "sample01",
    "status": "PS_VALID",
    "name": "sample project 01",
    "description": "설명 추가",
    "userPrompt": "",
    "memo": "",
    "restApiKey": "2b-sample01",
    "createDate": "2023-10-20T02:06:24.000Z",
    "updateDate": "2023-10-20T06:26:32.000Z",
    "deleteDate": null
  }
}
```

### 2. 새 대화 세션 생성

**POST** `/aid/chat/new/convo`

새로운 대화 세션을 생성합니다.

**헤더:**
```
Authorization: Bearer {REST_API_KEY}
```

**응답 예시:**
```json
{
  "status": 200,
  "message": "",
  "data": {
    "convoSessionId": "U2FsdGVkX19WEqXnDFiXD6RwrW7iNRSD9bcWKEzk8DYyTQ=="
  }
}
```

### 3. 텍스트 질문/답변

**POST** `/aid/chat/ask`

AI에게 텍스트로 질문하고 텍스트로 답변을 받습니다.

**헤더:**
```
Authorization: Bearer {REST_API_KEY}
```

**요청 본문:**
```json
{
  "convoSessionId": "U2FsdGVkX19WEqXnDFiXD6RwrW7iNRSD9bcWKEzk8DYyTQ==",
  "question": "안녕?",
  "length": "long",
  "resType": "text",
  "model": "gpt-4o-mini",
  "limit": 4,
  "isRemind": 0
}
```

**요청 필드:**
- `convoSessionId` (필수): 대화 세션 ID
- `question` (필수): 질문 내용
- `length` (선택): 답변 길이 (`long`, `short`, `default`)
- `resType` (선택): 응답 타입 (`text`, `text-stream`, `tts`)
- `model` (선택): LLM 모델 (기본값: `gpt-4o-mini`)
- `limit` (선택): 이전 대화 조회 개수 (기본값: 4)
- `isRemind` (선택): 기억의존 여부 (0: 사용 안함, 1: 사용)

**응답 예시:**
```json
{
  "status": 200,
  "message": "",
  "data": {
    "question": {
      "role": "user",
      "content": "안녕?"
    },
    "answer": {
      "role": "assistant",
      "content": "안녕! 어떻게 지내?"
    }
  }
}
```

### 4. 스트리밍 답변

**POST** `/aid/chat/ask/stream`

AI에게 질문하고 실시간 스트리밍으로 답변을 받습니다.

**헤더:**
```
Authorization: Bearer {REST_API_KEY}
```

**요청 본문:**
```json
{
  "convoSessionId": "U2FsdGVkX19WEqXnDFiXD6RwrW7iNRSD9bcWKEzk8DYyTQ==",
  "question": "안녕?",
  "length": "long",
  "resType": "text-stream",
  "model": "gpt-4o-mini",
  "limit": 4,
  "isRemind": 0
}
```

**응답:**
실시간으로 텍스트가 스트리밍됩니다.

### 5. TTS 음성 답변

**POST** `/aid/chat/ask/tts`

AI에게 질문하고 음성으로 변환된 답변을 받습니다.

**헤더:**
```
Authorization: Bearer {REST_API_KEY}
```

**요청 본문:**
```json
{
  "convoSessionId": "U2FsdGVkX19WEqXnDFiXD6RwrW7iNRSD9bcWKEzk8DYyTQ==",
  "question": "안녕?",
  "length": "short",
  "resType": "tts",
  "model": "gpt-4o-mini",
  "limit": 4,
  "isRemind": 0
}
```

**응답 헤더:**
```
Content-Type: audio/mpeg
aidocent-answer-text: 안녕!%20어떻게%20지내?
aidocent-question-text: 안녕?
```

**응답 본문:**
MP3 오디오 스트림

### 6. 음성 질문

**POST** `/aid/chat/ask/voice`

음성 파일로 질문하고 다양한 형태로 답변을 받습니다.

**헤더:**
```
Authorization: Bearer {REST_API_KEY}
Content-Type: multipart/form-data
```

**요청 본문 (Form Data):**
- `questionVoice`: 음성 파일 (audio/*)
- `convoSessionId`: 대화 세션 ID
- `length`: 답변 길이
- `resType`: 응답 타입

**응답:**
`resType`에 따라 텍스트, 스트리밍, 또는 TTS 응답을 반환합니다.

**응답 헤더 (TTS인 경우):**
```
aidocent-question-text: 인식된 질문 텍스트
aidocent-answer-text: AI 답변 텍스트
```

---

## 검색 및 요약 API

### 1. 태그 기반 검색 및 요약

**POST** `/search/tags/summary`

태그를 기반으로 정보를 검색하고 AI가 요약합니다.

**헤더:**
```
Authorization: Bearer {REST_API_KEY}
```

**요청 본문:**
```json
{
  "tags": ["netstream", "넷스트림", "어바운드리", "성수팝업"],
  "resType": "text"
}
```

**요청 필드:**
- `tags` (필수): 검색할 태그 배열
- `resType` (선택): 응답 타입 (`text`, `text-stream`, `tts`)

**응답 예시:**
```json
{
  "status": 200,
  "message": "",
  "data": {
    "prompt": "검색된 정보를 바탕으로 한 요약 내용..."
  }
}
```

### 2. 검색 테스트

**GET** `/search/test`

검색 기능을 테스트합니다.

**응답 예시:**
```json
{
  "status": 200,
  "message": "",
  "data": {
    "answer": "요약된 내용...",
    "search": [
      {
        "title": "검색 결과 제목",
        "link": "https://example.com",
        "snippet": "검색 결과 요약..."
      }
    ]
  }
}
```

---

## 에러 코드

### HTTP 상태 코드
- `200`: 성공
- `400`: 잘못된 요청
- `401`: 인증 실패
- `403`: 권한 없음
- `404`: 리소스 없음
- `500`: 서버 오류

### 프로젝트 상태 코드
- `PS_VALID`: 유효한 프로젝트
- `PS_DEL`: 삭제된 프로젝트

### 채팅 상태 코드
- `CHS_VALID`: 유효한 채팅
- `CHS_ERR`: 오류가 있는 채팅

### 채팅 응답 타입
- `CHRT_TEXT`: 텍스트 응답
- `CHRT_VOICE`: 음성 응답

### LLM 모델
- `gpt-4o-mini` (기본값)
- `gpt-3.5-turbo`
- `gpt-4-1106-preview`
- `gpt-4o`
- `gpt-4-turbo`
- `gpt-3.5-turbo-1106`

---

## 사용 예시

### JavaScript (Fetch API)

```javascript
// 프로젝트 생성
const createProject = async () => {
  const response = await fetch('http://localhost:4000/proj/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: '새 프로젝트',
      code: 'new-project',
      description: '새로운 AI 프로젝트입니다.',
      userPrompt: '친근하게 대답해주세요.',
      tags: 'AI,챗봇,프로젝트'
    })
  });
  
  const data = await response.json();
  console.log('생성된 프로젝트:', data.data);
};

// AI와 대화
const chatWithAI = async (restApiKey, convoSessionId, question) => {
  const response = await fetch('http://localhost:4000/aid/chat/ask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${restApiKey}`
    },
    body: JSON.stringify({
      convoSessionId: convoSessionId,
      question: question,
      length: 'long',
      model: 'gpt-4o-mini'
    })
  });
  
  const data = await response.json();
  console.log('AI 답변:', data.data.answer.content);
};
```

### cURL

```bash
# 프로젝트 생성
curl -X POST http://localhost:4000/proj/new \
  -H "Content-Type: application/json" \
  -d '{
    "name": "새 프로젝트",
    "code": "new-project",
    "description": "새로운 AI 프로젝트입니다."
  }'

# AI와 대화
curl -X POST http://localhost:4000/aid/chat/ask \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_REST_API_KEY" \
  -d '{
    "convoSessionId": "YOUR_SESSION_ID",
    "question": "안녕하세요!",
    "length": "long"
  }'
```

---

## 주의사항

1. **REST API Key 보안**: REST API Key는 민감한 정보이므로 안전하게 보관하세요.
2. **대화 세션**: 대화 연속성을 위해 `convoSessionId`를 올바르게 관리하세요.
3. **파일 업로드**: 음성 파일 업로드 시 적절한 Content-Type을 설정하세요.
4. **모델 선택**: 사용 목적에 맞는 LLM 모델을 선택하세요.
5. **응답 타입**: 클라이언트 환경에 맞는 응답 타입을 선택하세요.

---

문의사항이 있으시면 프로젝트 관리자에게 연락하시기 바랍니다.
