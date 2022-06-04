import { Module } from '@nestjs/common';
import { AdvertisementsService } from './advertisements.service';
import { AdvertisementsController } from './advertisements.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvertisementsRepository } from './advertisements.repository';
import { CategoriesRepository } from '../categories/categories.repository';
import { UsersRepository } from '../users/users.repository';
import { AuthModule } from '../auth/auth.module';
import { SkillsRepository } from '../skills/skills.repository';
import { BenefitsRepository } from '../benefits/benefits.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AdvertisementsRepository,
      CategoriesRepository,
      SkillsRepository,
      BenefitsRepository
    ]),
    AuthModule,
  ],
  controllers: [AdvertisementsController],
  providers: [AdvertisementsService]
})
export class AdvertisementsModule {}
