import { Module } from '@nestjs/common';
import { BenefitsController } from './benefits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BenefitsRepository } from './benefits.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BenefitsRepository])],
  controllers: [BenefitsController],
})
export class BenefitsModule {}
