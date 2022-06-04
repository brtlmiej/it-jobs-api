import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SkillsRepository } from './skills.repository';

@Controller('api/skills')
export class SkillsController {
  constructor(private readonly skillsRepository: SkillsRepository) {}

  @Get()
  async findAll() {
    const skills =
      await this.skillsRepository.find({ deletedAt: null });
    if (skills.length < 1) {
      return await this.skillsRepository.seeder();
    }
    return skills;
  }
}
