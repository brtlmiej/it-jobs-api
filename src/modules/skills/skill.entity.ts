import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/database/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Skill extends BaseEntity {
  @ApiProperty()
  @Column()
  name: string;
}
