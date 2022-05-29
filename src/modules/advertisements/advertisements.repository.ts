import { BaseRepository } from '../../common/database/base-repository';
import { Advertisement } from './advertisement.entity';
import { EntityRepository, FindManyOptions } from 'typeorm';
import { Paginator } from '../../common/database/paginator';

@EntityRepository(Advertisement)
export class AdvertisementsRepository extends BaseRepository<Advertisement> {
}