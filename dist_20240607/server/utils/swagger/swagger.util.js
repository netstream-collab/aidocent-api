"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerUtil = void 0;
const swagger_1 = require("@nestjs/swagger");
const expressBasicAuth = require("express-basic-auth");
class SwaggerUtil {
    static security(app, users) {
        app.use([`/${this.path}`], expressBasicAuth({
            challenge: true,
            users: users,
        }));
    }
    static init(app) {
        const serverInfo = SwaggerUtil.getServerInfoFromNodeEnv();
        const config = new swagger_1.DocumentBuilder()
            .addServer(serverInfo.url, serverInfo.name)
            .setTitle('AI docent API Doc')
            .setDescription('')
            .setVersion('0.0.0')
            .addApiKey({
            type: 'apiKey',
            in: 'header',
            name: 'aidocent-rest-api-key',
        }, 'aidocent-rest-api-key')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config, {});
        swagger_1.SwaggerModule.setup(this.path, app, document, {
            customSiteTitle: 'AI docent API Doc',
            swaggerOptions: {
                persistAuthorization: true,
            },
            customCss: `
      .topbar-wrapper img {
        display:none;
        // content:url("https://www.outsystems.com/Forge_BL/rest/ComponentThumbnail/GetURL_ComponentThumbnail?ProjectImageId=34005"); 
        width:60px; 
        height:auto;
      }
      // .swagger-ui .topbar { background-color: white; }
      .model-title__text {
        font-size: 0.8rem;
      }
      .swagger-ui .info .title small.version-stamp {
        display:none;
      }
      .property-row td {
        padding-bottom: 0.5rem !important;
      }

      .swagger-ui img  {
        max-height: 400px;
        padding: 1rem;
      }

      .prop .renderedMarkdown {
        margin-top: 0.5rem;
        font-size: 0.9rem;
        line-height: 1.3;
      }

      .renderedMarkdown > table {
        border: 1px solid #3b4151;
          font-size: 0.7rem;

      }

      .renderedMarkdown > table tr  {
        border-bottom:1px solid #3b4151;
      }

      .renderedMarkdown > table th  {
        background-color:  #bfbfbf;
        border-right:1px solid #3b4151;
      }

    `,
        });
        return;
    }
    static getServerInfoFromNodeEnv() {
        return {
            name: `${process.env.NODE_ENV} Api`,
            url: process.env.API_HOST || `http://localhost:${process.env.PORT}`,
        };
    }
}
exports.SwaggerUtil = SwaggerUtil;
SwaggerUtil.path = 'doc';
//# sourceMappingURL=swagger.util.js.map