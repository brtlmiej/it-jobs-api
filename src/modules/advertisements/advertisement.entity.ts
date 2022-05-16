import { BaseEntity } from '../../common/database/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { AdvertisementType } from '../advertisements-types/advertisement-type.entity';

@Entity()
export class Advertisement extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'longtext' })
  description: string;

  @ManyToOne(() => User, (obj) => obj.advertisements)
  creator: Promise<User>;

  @ManyToOne(() => AdvertisementType)
  type: Promise<AdvertisementType>;
}
