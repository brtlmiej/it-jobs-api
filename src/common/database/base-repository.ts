import { FindManyOptions, Repository } from 'typeorm';
import { Paginator } from './paginator';

export class BaseRepository<T> extends Repository<T> {
  async findAll(
    records = 10,
    page = 1,
    orderBy: string,
    orderDirection: 'ASC' | 'DESC',
    options: FindManyOptions<T> = {},
  ): Promise<Paginator<T>> {
    options.take = records;
    options.skip = page - 1;
    options.order = {};
    options.order[orderBy ?? 'id'] = orderDirection ?? 'DESC';
    const [result, total] = await this.findAndCount(options);

    return {
      data: result,
      page: page,
      records: records,
      total: total,
      totalPages: Math.ceil(total / records),
    };
  }
}
