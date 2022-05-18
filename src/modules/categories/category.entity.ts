import { BaseEntity } from '../../common/database/base.entity';
import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Category extends BaseEntity {
  @Column()
  @ApiProperty()
  name: string;
}