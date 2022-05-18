import { BaseRepository } from '../../common/database/base-repository';
import { Category } from './category.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(Category)
export class CategoriesRepository extends BaseRepository<Category>{}