import { BaseRepository } from '../../common/database/base-repository';
import { Advertisement } from './advertisement.entity';
import { EntityRepository, FindManyOptions } from 'typeorm';
import { Paginator } from '../../common/database/paginator';
import { User } from '../users/user.entity';

@EntityRepository(Advertisement)
export class AdvertisementsRepository extends BaseRepository<Advertisement> {
  async findUserFavourites(user: User) {
    return await this.createQueryBuilder('a')
      .innerJoin('a.observers', 'o')
      .where('o.id = :id', { id: user.id })
      .andWhere('a.deletedAt IS NULL')
      .getMany();
  }
}