import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IProj } from '../../dal/dto/proj.dto';

export const Project = createParamDecorator((data: string, ctx: ExecutionContext): IProj => {
  const request = ctx.switchToHttp().getRequest();
  const project = request.project;
  return data ? project?.[data] : project;
});
