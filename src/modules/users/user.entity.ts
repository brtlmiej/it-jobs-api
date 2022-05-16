import { Column, Entity, OneToMany } from 'typeorm';
import { UserTypeEnum } from './enum/user-type.enum';
import { BaseEntity } from '../../common/database/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Advertisement } from '../advertisements/advertisement.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ length: 255, unique: true })
  @ApiProperty()
  email: string;

  @Column()
  @ApiProperty()
  firstName: string;

  @Column()
  @ApiProperty()
  lastName: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ type: 'int' })
  @ApiProperty()
  status: number;

  @Column({ type: 'varchar', length: 100 })
  @ApiProperty()
  type: UserTypeEnum;

  @OneToMany(() => Advertisement, (obj) => obj.description)
  advertisements: Promise<Advertisement[]>;
}