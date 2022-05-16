import { BaseEntity } from '../../common/database/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class AdvertisementType extends BaseEntity {
  @Column()
  name: string;
}