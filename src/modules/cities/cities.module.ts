import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitiesRepository } from './cities.repository';
import { CitiesController } from './cities.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CitiesRepository])],
  controllers: [CitiesController],
})
export class CitiesModule {}
