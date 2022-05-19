import { FindManyOptions, Repository } from 'typeorm';
import { Paginator } from './paginator';
export declare class BaseRepository<T> extends Repository<T> {
    findAll(records: number, page: number, orderBy: string, orderDirection: 'ASC' | 'DESC', options?: FindManyOptions<T>): Promise<Paginator<T>>;
}
