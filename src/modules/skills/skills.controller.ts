import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SkillsRepository } from './skills.repository';
import { ApiResponse } from '@nestjs/swagger';
import { Skill } from './skill.entity';

@Controller('api/skills')
export class SkillsController {
  constructor(private readonly skillsRepository: SkillsRepository) {}

  @Get()
  @ApiResponse({ type: [Skill] })
  async findAll() {
    const skills =
      await this.skillsRepository.find({ deletedAt: null });
    if (skills.length < 1) {
      return await this.skillsRepository.seeder();
    }
    return skills;
  }
}
