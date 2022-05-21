import { Controller, Get } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';

@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  @Get()
  async findAll() {
    const categories = await this.categoriesRepository.find({
      deletedAt: null,
    });
    if (categories.length < 1) {
      return await this.categoriesRepository.seeder();
    }
    return categories;
  }
}
