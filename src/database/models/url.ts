import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('url')
export class Url {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  short_code: string;

  @Column()
  url: string;

  @Column('timestamp with time zone')
  created_at: Date;

  @Column('timestamp with time zone')
  updated_at: Date;
}
