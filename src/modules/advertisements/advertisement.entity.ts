import { BaseEntity } from '../../common/database/base.entity';
import { AfterInsert, AfterLoad, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Category } from '../categories/category.entity';
import { Exclude, Expose, Transform } from 'class-transformer';
import { isString } from 'class-validator';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { Skill } from '../skills/skill.entity';
import { Benefit } from '../benefits/benefit.entity';
import { Application } from '../applications/application.entity';

@Entity()
export class Advertisement extends BaseEntity {
  @Column()
  @Expose({ groups: ['base'] })
  @ApiProperty()
  title: string;

  @Column({ nullable: true })
  @Expose({ groups: ['base'] })
  @ApiProperty()
  company: string;

  @Column({ default: 0 })
  @Expose({ groups: ['base'] })
  @ApiProperty()
  salaryMin: number;

  @Column({ default: 0 })
  @Expose({ groups: ['base'] })
  @ApiProperty()
  salaryMax: number;

  @Column({ default: 0 })
  @Expose({ groups: ['base'] })
  @ApiProperty()
  lat: number;

  @Column({ default: 0 })
  @Expose({ groups: ['base'] })
  @ApiProperty()
  lng: number;

  @Column({ default: 'Warsaw' })
  @Expose({ groups: ['base'] })
  @ApiProperty()
  city: string;

  @Column({ type: 'varchar', length: 1200 })
  @Expose({ groups: ['base'] })
  @ApiProperty()
  description: string;

  @ManyToMany(() => Benefit)
  @JoinTable()
  @Expose({ groups: ['base'] })
  @ApiProperty()
  benefits: Benefit[];

  @ManyToMany(() => Skill)
  @JoinTable()
  @Expose({ groups: ['base'] })
  @ApiProperty()
  skills: Skill[];

  @ManyToOne(() => User, (obj) => obj.advertisements)
  @Expose({ groups: ['creator'] })
  creator: User;

  @ManyToOne(() => Category)
  @Expose({ groups: ['category'] })
  category: Category;

  @ManyToMany(() => User, (obj) => obj.favouriteAdvertisements)
  @JoinTable()
  @Expose({ groups: ['observers'] })
  observers: User[]

  @Expose({ groups: ['base'] })
  @ApiProperty()
  isFavourite: boolean = false;

  @Expose({ groups: ['base'] })
  @ApiProperty()
  @Column({ type: 'integer', default: 0 })
  favouritesCount: number;

  @OneToMany(() => Application, (obj) => obj.advertisement)
  applications: Application[];
}
