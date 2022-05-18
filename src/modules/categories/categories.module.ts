import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesRepository } from './categories.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoriesRepository])
  ],
  controllers: [CategoriesController]
})
export class CategoriesModule {}
