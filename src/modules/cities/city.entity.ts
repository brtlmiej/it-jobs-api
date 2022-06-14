import { BaseEntity } from '../../common/database/base.entity';
import { Column, Entity } from 'typeorm';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class City extends BaseEntity {
  @Column()
  @Expose({ groups: ['base'] })
  @ApiProperty()
  name: string;

  @Column({ default: 0 })
  @Expose({ groups: ['base'] })
  @ApiProperty()
  lat: number;

  @Column({ default: 0 })
  @Expose({ groups: ['base'] })
  @ApiProperty()
  lng: number;
}