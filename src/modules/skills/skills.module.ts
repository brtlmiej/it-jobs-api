import { Module } from '@nestjs/common';
import { SkillsController } from './skills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillsRepository } from './skills.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SkillsRepository])],
  controllers: [SkillsController],
})
export class SkillsModule {}
