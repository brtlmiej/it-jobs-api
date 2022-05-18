import { Controller, Get } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';

@Controller('api/categories')
export class CategoriesController {
  constructor(
    private readonly categoriesRepository: CategoriesRepository
  ) {
  }

  @Get()
  async findAll() {
    return await this.categoriesRepository.find({
      deletedAt: null
    });
  }
}
