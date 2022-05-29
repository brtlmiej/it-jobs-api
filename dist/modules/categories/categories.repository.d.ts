import { BaseRepository } from '../../common/database/base-repository';
import { Category } from './category.entity';
export declare class CategoriesRepository extends BaseRepository<Category> {
    constructor();
    seeder(): Promise<any[]>;
}
