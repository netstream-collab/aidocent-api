import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('TB_CHAT_HIS')
export class TB_CHAT_HIS {
  @PrimaryGeneratedColumn() nCHAT_ID: number;
  @Column() nPROJ_ID: number;

  @Column() sUUID: string;
  @Column() sCONVO_SESSION_ID: string;

  @Column() cTYPE: string;
  @Column() cSTATUS: string;

  @Column() cSPEAKER_ROLE: string;
  @Column() tCONTENT: string;
  @Column() tERROR_MSG: string;
  @Column() cRES_TYPE: string;

  @Column() dCREATE: string;
  @Column() dUPDATE: string;
  @Column() dDELETE: string;
}
