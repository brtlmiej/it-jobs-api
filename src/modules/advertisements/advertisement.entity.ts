import { BaseEntity } from '../../common/database/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Category } from '../categories/category.entity';
import { Exclude, Expose, Transform } from 'class-transformer';
import { isString } from 'class-validator';

@Entity()
export class Advertisement extends BaseEntity {
  @Column()
  @Expose({ groups: ['base'] })
  title: string;

  @Column({ default: 0 })
  @Expose({ groups: ['base'] })
  salaryMin: number;

  @Column({ default: 0 })
  @Expose({ groups: ['base'] })
  salaryMax: number;

  @Column({ default: 0 })
  @Expose({ groups: ['base'] })
  lat: number;

  @Column({ default: 0 })
  @Expose({ groups: ['base'] })
  lng: number;

  @Column({ default: 'Warsaw' })
  @Expose({ groups: ['base'] })
  city: string;

  @Column({ type: 'varchar', length: 1200 })
  @Expose({ groups: ['base'] })
  description: string;

  @Column({ type: 'blob' })
  @Expose({ groups: ['base'] })
  benefits: string[] = [];

  @Column({ type: 'blob', nullable: true })
  @Expose({ groups: ['base'] })
  skills: string[] = [];

  @ManyToOne(() => User, (obj) => obj.advertisements)
  @Expose({ groups: ['creator'] })
  creator: User;

  @ManyToOne(() => Category)
  @Expose({ groups: ['category'] })
  category: Category;
}
