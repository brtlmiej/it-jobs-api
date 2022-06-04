import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BenefitsRepository } from './benefits.repository';

@Controller('api/benefits')
export class BenefitsController {
  constructor(private readonly benefitsRepository: BenefitsRepository) {}

  @Get()
  async findAll() {
    const benefits =
      await this.benefitsRepository.find({ deletedAt: null });
    if (benefits.length < 1) {
      return await this.benefitsRepository.seeder();
    }
    return benefits;
  }
}
