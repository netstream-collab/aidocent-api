import { Injectable } from '@nestjs/common';
import ChatHisDAL from '../dal/layers/chatHis.dal';
import ProjDAL from '../dal/layers/proj.dal';
import { isEmpty } from 'src/server/utils/common/text.util';
import * as bcrypt from 'bcrypt';
import Codes from 'src/server/constants/codes';

@Injectable()
export class AuthService {
  constructor(private projDAL: ProjDAL, private chatHisDAL: ChatHisDAL) {}

  async validateRestApiKey(restApiKey: string) {
    const project = await this.projDAL.findOneByRestApiKey(restApiKey);
    if (isEmpty(project)) {
      throw new Error('none project');
    } else if (project.status !== Codes.ProjectStatus.VALID) {
      throw new Error('invalid project');
    }
    return project;
  }
}
