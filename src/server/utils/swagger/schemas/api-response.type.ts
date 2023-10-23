import { ApiProperty } from '@nestjs/swagger';
import { ApiResponseTemplate } from './api-response-template.type';

export class ApiGetProjAllRes extends ApiResponseTemplate {
  @ApiProperty({
    title: '결과 데이터',
    example: {
      allCount: 0,
      project: [
        {
          projId: 4,
          uuid: '2b46c68a4c7d4983addec259da9d99e8',
          projCode: 'sample01',
          status: 'PS_VALID',
          name: 'sample project 01',
          description: '설명 추가',
          userPrompt: '',
          memo: '',
          restApiKey: '2b-sample01',
          createDate: '2023-10-20T02:06:24.000Z',
          updateDate: '2023-10-20T06:26:32.000Z',
          deleteDate: null,
        },
      ],
    },
  })
  data: any;
}

export class ApiPostProjNewRes extends ApiResponseTemplate {
  @ApiProperty({
    title: '결과 데이터',
    example: {
      projId: 5,
      uuid: 'e492ad37edd54b05baa791513003a1bb',
      projCode: 'sample',
      status: 'PS_VALID',
      name: '신규 프로젝트',
      description: '신규 아이템 전시 프로젝트',
      userPrompt: '친구에게 말하듯이 친근하게 대답해.',
      memo: 'add memo',
      restApiKey: 'e4-sample',
      createDate: '2023-10-20 06:45:20',
      updateDate: '2023-10-20 06:45:20',
    },
  })
  data: any;
}

export class ApiGetProjInfo extends ApiResponseTemplate {
  @ApiProperty({
    title: '결과 데이터',
    example: {
      projId: 4,
      uuid: '2b46c68a4c7d4983addec259da9d99e8',
      projCode: 'sample01',
      status: 'PS_VALID',
      name: 'sample project 01',
      description: '설명 추가',
      userPrompt: '',
      memo: '',
      restApiKey: '2b-sample01',
      createDate: '2023-10-20T02:06:24.000Z',
      updateDate: '2023-10-20T06:26:32.000Z',
      deleteDate: null,
    },
  })
  data: any;
}

export class ApiPatchProjInfo extends ApiResponseTemplate {
  @ApiProperty({
    title: '결과 데이터',
    example: {
      projId: 4,
      uuid: '2b46c68a4c7d4983addec259da9d99e8',
      projCode: 'sample01',
      status: 'PS_VALID',
      name: '신규 프로젝트22',
      description: '신규 아이템 전시 프로젝트',
      userPrompt: '친구에게 말하듯이 친근하게 대답해.',
      memo: '',
      restApiKey: '2b-sample01',
      createDate: '2023-10-20T02:06:24.000Z',
      updateDate: '2023-10-20T06:48:59.000Z',
      deleteDate: null,
    },
  })
  data: any;
}

export class ApiDeleteProjInfo extends ApiResponseTemplate {
  @ApiProperty({
    title: '결과 데이터',
    example: {
      projId: 4,
      uuid: '2b46c68a4c7d4983addec259da9d99e8',
      projCode: 'sample01',
      status: 'PS_DEL',
      name: '신규 프로젝트22',
      description: '신규 아이템 전시 프로젝트',
      userPrompt: '친구에게 말하듯이 친근하게 대답해.',
      memo: '',
      restApiKey: '2b-sample01',
      createDate: '2023-10-20T02:06:24.000Z',
      updateDate: '2023-10-20T06:48:59.000Z',
      deleteDate: null,
    },
  })
  data: any;
}

export class ApiPostProjRenewRestApiKey extends ApiResponseTemplate {
  @ApiProperty({
    title: '결과 데이터',
    example: {
      restApiKey: 'e4-sample',
    },
  })
  data: any;
}

export class ApiGetProjConvoList extends ApiResponseTemplate {
  @ApiProperty({
    title: '결과 데이터',
    example: [
      {
        chatId: 164,
        projId: 4,
        uuid: '78f817e228784a33ad93d9aa4d573135',
        convoSessionId: 'U2FsdGVkX1/QKRJWkOUZOwIN7s4LGz36/rvDMaVbMxieqg==',
        type: '',
        status: 'CHS_VALID',
        speakerRole: 'user',
        content: 'gpt api를 사용할건데, role: system으로 넘길값을 정할 거야. 유용한 팁이 있을까?',
        errorMsg: '',
        resType: '',
        createDate: '2023-10-20T02:28:44.000Z',
        updateDate: '2023-10-20T02:28:44.000Z',
        deleteDate: null,
      },
    ],
  })
  data: any;
}

export class ApiGetProjConvoChat extends ApiResponseTemplate {
  @ApiProperty({
    title: '결과 데이터',
    example: [
      {
        chatId: 163,
        projId: 4,
        uuid: 'adeaa2362eab45a28061abb97018169a',
        convoSessionId: 'U2FsdGVkX19paOCOWoh8uyRoGsjCxMrGhIW/n4UvfFQXNw==',
        type: '',
        status: 'CHS_VALID',
        speakerRole: 'assistant',
        content: 'That\'s great to hear! What made you say "Wow"?',
        errorMsg: '',
        resType: 'text',
        createDate: '2023-10-20T02:26:47.000Z',
        updateDate: '2023-10-20T02:26:47.000Z',
        deleteDate: null,
      },
      {
        chatId: 162,
        projId: 4,
        uuid: '57376316d3064f27a5fff2a7eb53a03f',
        convoSessionId: 'U2FsdGVkX19paOCOWoh8uyRoGsjCxMrGhIW/n4UvfFQXNw==',
        type: '',
        status: 'CHS_VALID',
        speakerRole: 'user',
        content: 'Wow',
        errorMsg: '',
        resType: '',
        createDate: '2023-10-20T02:26:44.000Z',
        updateDate: '2023-10-20T02:26:44.000Z',
        deleteDate: null,
      },
    ],
  })
  data: any;
}

export class ApiPostAidChatNewConvo extends ApiResponseTemplate {
  @ApiProperty({
    title: '결과 데이터',
    example: {
      convoSessionId: 'U2FsdGVkX19WEqXnDFiXD6RwrW7iNRSD9bcWKEzk8DYyTQ==',
    },
  })
  data: any;
}

export class ApiPostAidChatAskText extends ApiResponseTemplate {
  @ApiProperty({
    title: '결과 데이터',
    example: {
      answer: {
        role: 'assistant',
        content: '안녕! 어떻게 지내?',
      },
    },
  })
  data: any;
}
