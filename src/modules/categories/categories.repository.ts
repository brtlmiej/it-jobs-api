import { BaseRepository } from '../../common/database/base-repository';
import { Category } from './category.entity';
import { EntityRepository, getConnection } from 'typeorm';
import { raw } from 'express';

@EntityRepository(Category)
export class CategoriesRepository extends BaseRepository<Category> {
  constructor() {
    super();
  }
  public async seeder() {
    const categories = [
      { name: 'Frontend' },
      { name: 'Backend' },
      { name: 'Mobile' },
      { name: 'Admin' },
      { name: 'Project manager' },
      { name: 'All' },
    ];
    const objects = [];
    await getConnection().transaction(async (em) => {
      for (const category of categories) {
        let obj = await this.findOne({ name: category.name });
        if (obj) {
          continue;
        }
        obj = new Category();
        obj.name = category.name;
        await em.save(obj);
        objects.push(obj);
      }
    });
    return objects;
  }
}
