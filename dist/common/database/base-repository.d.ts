import { FindManyOptions, Repository } from 'typeorm';
import { Paginator } from './paginator';
export declare class BaseRepository<T> extends Repository<T> {
    findAll(take?: number, skip?: number, options?: FindManyOptions): Promise<Paginator<T>>;
}
