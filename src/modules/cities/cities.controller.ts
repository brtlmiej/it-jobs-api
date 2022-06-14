import { Controller, Get } from '@nestjs/common';
import { CitiesRepository } from './cities.repository';
import { ApiResponse } from '@nestjs/swagger';
import { City } from './city.entity';

@Controller('api/cities')
export class CitiesController {
  constructor(
    private readonly citiesRepository: CitiesRepository,
  ) {
  }

  @Get()
  @ApiResponse({ type: [City] })
  async findAll() {
    const cities = await this.citiesRepository.find({ deletedAt: null });
    if (cities.length < 1) {
      return await this.citiesRepository.seeder();
    }
    return cities;
  }
}
