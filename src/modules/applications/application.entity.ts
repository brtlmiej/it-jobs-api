import { BaseEntity } from '../../common/database/base.entity';
import { User } from '../users/user.entity';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import { Advertisement } from '../advertisements/advertisement.entity';

@Entity()
export class Application extends BaseEntity {
  @ManyToOne(() => User, (obj) => obj.applications)
  jobSeeker: User;

  @ManyToOne(() => Advertisement, (obj) => obj.applications)
  advertisement: Advertisement;

  @Column({ type: 'float' })
  expectedSalary: number;

  @Column({ type: 'text' })
  firstName: string;

  @Column({ type: 'text' })
  lastName: string;

  @Column({ type: 'text' })
  contactEmail: string;

  @Column({ type: 'text' })
  phone: string;

  @Column({ type: 'text' })
  personDescription: string;

  @Column({ type: 'text' })
  experience: string

  @Column()
  lastCompanyName: string
}