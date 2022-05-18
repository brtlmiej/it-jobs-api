import { BaseEntity } from '../../common/database/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Category } from '../categories/category.entity';

@Entity()
export class Advertisement extends BaseEntity {
  @Column()
  title: string;

  @Column()
  salary: number;

  @Column({ type: 'longtext' })
  description: string;

  @ManyToOne(() => User, (obj) => obj.advertisements)
  creator: Promise<User>;

  @ManyToOne(() => Category)
  category: Promise<Category>;
}
