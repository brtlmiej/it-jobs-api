import { BaseRepository } from '../../common/database/base-repository';
import { Advertisement } from './advertisement.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(Advertisement)
export class AdvertisementsRepository extends BaseRepository<Advertisement> {}