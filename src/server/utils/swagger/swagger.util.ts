import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerUtil {
  static init(app: INestApplication) {
    const serverInfo = SwaggerUtil.getServerInfoFromNodeEnv();
    const config = new DocumentBuilder()
      .addServer(serverInfo.url, serverInfo.name)
      .setTitle('AI docent API Doc')
      .setDescription('')
      .setVersion('0.0.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'Bearer',
          name: 'JWT',
          in: 'header',
        },
        'Authorization',
      )
      .addApiKey(
        {
          type: 'apiKey',
          in: 'header',
          name: 'aidocent-rest-api-key',
        },
        'aidocent-rest-api-key',
      )
      .build();

    const document = SwaggerModule.createDocument(app, config, {});
    SwaggerModule.setup('doc', app, document, {
      customSiteTitle: 'AI docent API Doc',
      customfavIcon: 'https://dev.cms.dearto.io/favicon.ico',
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
    // default
    return {
      name: `${process.env.NODE_ENV} Api`,
      url: process.env.API_HOST || `http://localhost:${process.env.PORT}`,
    };
  }
}
