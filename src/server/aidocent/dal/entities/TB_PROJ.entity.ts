import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('TB_PROJ')
export class TB_PROJ {
  @PrimaryGeneratedColumn() nPROJ_ID: number;

  @Column() sUUID: string;

  @Column() cSTATUS: string;
  @Column() sNAME: string;
  @Column() sDESCRIPTION: string;
  @Column() tUSER_PROMPT: string;
  @Column() tMEMO: string;
  @Column() sREST_API_KEY: string;

  @Column() dCREATE: string;
  @Column() dUPDATE: string;
  @Column() dDELETE: string;
}
