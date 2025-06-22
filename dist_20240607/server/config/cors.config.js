"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorsConfig = void 0;
const dotenv = require("dotenv");
dotenv.config();
const CorsConfigJson = require("./cors.config.json");
class CorsConfig {
}
exports.CorsConfig = CorsConfig;
CorsConfig.nodeEnv = process.env.NODE_ENV;
CorsConfig.config = CorsConfigJson[CorsConfig.nodeEnv] || CorsConfigJson.dev;
CorsConfig.origin = CorsConfig.config.cors_origins;
CorsConfig.option = {
    origin: CorsConfig.origin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    optionsSuccessStatus: 204,
    exposedHeaders: [
        'Authorization',
        'access_token',
        'refresh_token',
        'super_token',
        'aidocent-answer-text',
        'aidocent-question-text',
        'content-type',
        'transfer-encoding',
        'playtime',
    ],
    allowedHeaders: ['Content-Type', 'Authorization', 'authorization', 'access_token', 'refresh_token', 'super_token', 'aidocent-rest-api-key'],
};
//# sourceMappingURL=cors.config.js.map