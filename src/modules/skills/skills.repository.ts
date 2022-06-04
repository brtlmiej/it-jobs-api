import { BaseRepository } from '../../common/database/base-repository';
import { Skill } from './skill.entity';
import { EntityRepository, getConnection } from 'typeorm';

@EntityRepository(Skill)
export class SkillsRepository extends BaseRepository<Skill> {
  public async seeder() {
    const skills = [
      { name: 'Linux' },
      { name: 'Bash' },
      { name: 'Flutter' },
      { name: 'JavaScript' },
      { name: 'PHP' },
    ];
    const objects = [];
    await getConnection().transaction(async (em) => {
      for (const skill of skills) {
        let obj = await this.findOne({ name: skill.name });
        if (obj) {
          continue;
        }
        obj = new Skill();
        obj.name = skill.name;
        await em.save(obj);
        objects.push(obj);
      }
    });
    return objects;
  }
}