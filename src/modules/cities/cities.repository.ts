import { BaseRepository } from '../../common/database/base-repository';
import { City } from './city.entity';
import { EntityRepository, getConnection } from 'typeorm';
import { Skill } from '../skills/skill.entity';

@EntityRepository(City)
export class CitiesRepository extends BaseRepository<City>{
  public async seeder() {
    const cities  = [
      { name: 'Warszawa', lat: 52.237049, lng: 21.017532 },
      { name: 'Białystok', lat: 53.13333, lng: 23.16433 },
      { name: 'Bydgoszcz', lat: 53.123482, lng: 18.008438 },
      { name: 'Gdańsk', lat: 54.372158, lng: 18.638306 },
      { name: 'Gorzów Wielkopolski', lat: 52.73679, lng: 15.22878 },
      { name: 'Katowice', lat: 50.270908, lng: 19.039993 },
      { name: 'Kielce', lat: 50.866077, lng: 20.628569 },
      { name: 'Kraków', lat: 50.049683, lng: 19.944544 },
      { name: 'Lublin', lat: 51.246452, lng: 22.568445 },
      { name: 'Łódź', lat: 51.759445, lng: 19.457216 },
      { name: 'Olsztyn', lat: 53.770226, lng: 20.490189 },
      { name: 'Opole', lat: 50.671062, lng: 17.926126 },
      { name: 'Poznań', lat: 52.406376, lng: 16.925167 },
      { name: 'Rzeszów', lat: 50.041187, lng: 21.999121 },
      { name: 'Szczecin', lat: 53.428543, lng: 14.552812 },
      { name: 'Toruń', lat: 53.013790, lng: 18.598444 },
      { name: 'Wrocław', lat: 51.107883, lng: 17.038538 },
      { name: 'Zielona Góra', lat: 51.935619, lng: 15.506186 },
    ];
    const objects = [];
    await getConnection().transaction(async (em) => {
      for (const city of cities) {
        let obj = await this.findOne({ name: city.name });
        if (obj) {
          continue;
        }
        obj      = new City();
        obj.name = city.name;
        obj.lat  = city.lat;
        obj.lng  = city.lng;
        await em.save(obj);
        objects.push(obj);
      }
    });
    return objects;
  }
}