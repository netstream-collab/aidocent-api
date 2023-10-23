// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { ProjCreateDTO } from './proj-create.dto';

export class ProjUpdateDTO extends PartialType(ProjCreateDTO) {}
