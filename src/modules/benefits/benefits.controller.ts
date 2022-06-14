import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BenefitsRepository } from './benefits.repository';
import { ApiResponse } from '@nestjs/swagger';
import { Benefit } from './benefit.entity';

@Controller('api/benefits')
export class BenefitsController {
  constructor(private readonly benefitsRepository: BenefitsRepository) {}

  @Get()
  @ApiResponse({ type: [Benefit] })
  async findAll() {
    const benefits =
      await this.benefitsRepository.find({ deletedAt: null });
    if (benefits.length < 1) {
      return await this.benefitsRepository.seeder();
    }
    return benefits;
  }
}
