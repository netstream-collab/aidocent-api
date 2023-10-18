import { CanActivate, ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class RestApiKeyGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const requestRestApiKey = request.headers['aidocent-rest-api-key']; // access token

    if (!requestRestApiKey) {
      throw new HttpException('UNAUTHORIZED', 401);
    }

    // 프로젝트 정보 찾기
    const project = await this.authService.validateRestApiKey(requestRestApiKey);
    request.project = project;
    return true;
  }
}
