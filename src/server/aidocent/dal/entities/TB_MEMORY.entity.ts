import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('TB_MEMORY')
export class TB_MEMORY {
  @PrimaryGeneratedColumn() nMEMORY_ID: number;

  @Column() sCONVO_SESSION_ID: string;
  @Column() nLAST_CHAT_ID: number;

  @Column() tCONTENT: string;

  @Column() dCREATE: string;
}
