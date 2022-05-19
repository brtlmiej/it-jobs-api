import { Column, Entity, OneToMany } from 'typeorm';
import { UserTypeEnum } from './enum/user-type.enum';
import { BaseEntity } from '../../common/database/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { Advertisement } from '../advertisements/advertisement.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ length: 255, unique: true })
  @ApiProperty()
  @Expose({ groups: ['auth'] })
  email: string;

  @Column()
  @ApiProperty()
  @Expose({ groups: ['base'] })
  firstName: string;

  @Column()
  @ApiProperty()
  @Expose({ groups: ['base'] })
  lastName: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ type: 'int' })
  @ApiProperty()
  @Expose({ groups: ['auth'] })
  status: number;

  @Column({ type: 'varchar', length: 100 })
  @ApiProperty()
  @Expose({ groups: ['auth'] })
  type: UserTypeEnum;

  @OneToMany(() => Advertisement, (obj) => obj.description)
  advertisements: Advertisement[];
}