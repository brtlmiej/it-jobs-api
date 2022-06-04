import { BaseRepository } from '../../common/database/base-repository';
import { Benefit } from './benefit.entity';
import { EntityRepository, getConnection } from 'typeorm';
import { Category } from '../categories/category.entity';

@EntityRepository(Benefit)
export class BenefitsRepository extends BaseRepository<Benefit> {
  public async seeder() {
    const benefits = [
      { name: 'Health insurance' },
      { name: 'Personal computer' },
      { name: 'Fruits' },
      { name: 'Paid leave' },
      { name: 'Project Gym reimbursement' },
    ];
    const objects = [];
    await getConnection().transaction(async (em) => {
      for (const benefit of benefits) {
        let obj = await this.findOne({ name: benefit.name });
        if (obj) {
          continue;
        }
        obj = new Benefit();
        obj.name = benefit.name;
        await em.save(obj);
        objects.push(obj);
      }
    });
    return objects;
  }
}
