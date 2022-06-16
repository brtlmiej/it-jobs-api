import { Controller, Get } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { ApiResponse } from '@nestjs/swagger';
import { Category } from './category.entity';

@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  @Get()
  @ApiResponse({ type: [Category] })
  async findAll() {
    const categories = await this.categoriesRepository.find({
      deletedAt: null,
    });
    if (categories.length < 6) {
      return await this.categoriesRepository.seeder();
    }
    return categories;
  }
}
