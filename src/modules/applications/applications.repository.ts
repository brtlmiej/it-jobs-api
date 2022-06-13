import { EntityRepository } from 'typeorm';
import { Application } from './application.entity';
import { BaseRepository } from '../../common/database/base-repository';

@EntityRepository(Application)
export class ApplicationsRepository extends BaseRepository<Application> {

}