import { BaseEntity } from '../../common/database/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Category } from '../categories/category.entity';
import { Expose } from 'class-transformer';

@Entity()
export class Advertisement extends BaseEntity {
  @Column()
  @Expose({ groups: ['base'] })
  title: string;

  @Column()
  salary: number;

  @Column({ type: 'varchar', length: 1200 })
  @Expose({ groups: ['base'] })
  description: string;

  @Column({ type: 'blob' })
  benefits: string[] = [];

  @ManyToOne(() => User, (obj) => obj.advertisements)
  @Expose({ groups: ['creator'] })
  creator: User;

  @ManyToOne(() => Category)
  @Expose({ groups: ['category'] })
  category: Category;
}
