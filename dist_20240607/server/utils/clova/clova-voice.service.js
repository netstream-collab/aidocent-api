"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClovaVoiceService = void 0;
const common_1 = require("@nestjs/common");
const restApi_util_1 = require("../common/restApi.util");
let ClovaVoiceService = class ClovaVoiceService {
    constructor() {
        this.RequestUrl = 'https://naveropenapi.apigw.ntruss.com/tts-premium/v1/tts';
        this.ClientId = 'b3rk1949a6';
        this.ClientSecret = 'r93bceoK7Tr51ezSIcy1wjdvCuTktVXsQSX65yFo';
    }
    async makeTTS(text) {
        const requestData = {
            speaker: 'nara',
            text: text.replace(/\n/g, ''),
            volume: 0,
            speed: 0,
            format: 'mp3',
        };
        const response = await restApi_util_1.default.requestStream('post', this.RequestUrl, this.queryStringify(requestData), {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-NCP-APIGW-API-KEY-ID': this.ClientId,
            'X-NCP-APIGW-API-KEY': this.ClientSecret,
        });
        return response;
    }
    async makeTTS_v2(text) {
        const request = require('request');
        const options = {
            url: this.RequestUrl,
            form: {
                speaker: 'nara',
                text: text.replace(/\n/g, ''),
                volume: 0,
                speed: 0,
                format: 'mp3',
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-NCP-APIGW-API-KEY-ID': this.ClientId,
                'X-NCP-APIGW-API-KEY': this.ClientSecret,
            },
        };
        return request.post(options).on('response', function (response) {
            console.log(response.statusCode);
            console.log(response.headers['content-type']);
        });
    }
    queryStringify(obj) {
        if (!obj)
            return '';
        let qs = '';
        const keys = Object.keys(obj);
        keys.forEach((key) => {
            qs += `${key}=${encodeURIComponent(obj[key] + '' || '')}&`;
        });
        qs = qs.replace(/&$/, '');
        console.log('QueryStringify qa: ', qs);
        return qs;
    }
};
ClovaVoiceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ClovaVoiceService);
exports.ClovaVoiceService = ClovaVoiceService;
//# sourceMappingURL=clova-voice.service.js.map