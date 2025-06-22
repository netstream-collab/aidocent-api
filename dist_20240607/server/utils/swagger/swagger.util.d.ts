import { INestApplication } from '@nestjs/common';
export declare class SwaggerUtil {
    static readonly path = "doc";
    static security(app: INestApplication, users: {
        [id: string]: string;
    }): void;
    static init(app: INestApplication): void;
    static getServerInfoFromNodeEnv(): {
        name: string;
        url: string;
    };
}
