import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BaseEntity as TypeOrmBaseEntity, Column,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class BaseEntity extends TypeOrmBaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  @Expose({ groups: ['base'] })
  id: number;

  @ApiProperty()
  @CreateDateColumn()
  @Expose({ groups: ['base'] })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  @Expose({ groups: ['base'] })
  updatedAt: Date;

  @Exclude()
  @Column({ type: 'datetime', nullable: true })
  deletedAt: Date | null;
}