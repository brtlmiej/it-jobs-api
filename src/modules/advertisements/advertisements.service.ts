import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { UpdateAdvertisementDto } from './dto/update-advertisement.dto';
import { AdvertisementsRepository } from './advertisements.repository';
import { Advertisement } from './advertisement.entity';
import { User } from '../users/user.entity';
import { AfterLoad, EntityManager } from 'typeorm';
import { CategoriesRepository } from '../categories/categories.repository';
import { isString } from 'class-validator';
import { CurrentUser } from '../auth/decorator/current-user.decorator';

@Injectable()
export class AdvertisementsService {
  constructor(
    private readonly advertisementsRepository: AdvertisementsRepository,
    private readonly categoriesRepository: CategoriesRepository,
  ) {
  }

  async create(
    em: EntityManager,
    data: CreateAdvertisementDto,
    user: User
  ) {
    const advertisement = new Advertisement();
    return await this.update(em, advertisement, data, user);
  }

  async update(
    em: EntityManager,
    advertisement: Advertisement,
    data: UpdateAdvertisementDto,
    user: User
  ) {
    const category = await this.categoriesRepository
      .findOne(data.categoryId);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    if (data.salaryMax < data.salaryMin) {
      throw new BadRequestException('Salary max cannot be less than salary min')
    }
    advertisement.title = data.title;
    advertisement.description = data.description;
    advertisement.creator = user;
    advertisement.category = category;
    advertisement.salaryMin = data.salaryMin;
    advertisement.salaryMax = data.salaryMax;
    advertisement.lat = data.lat;
    advertisement.lng = data.lng;
    advertisement.city = data.city;
    advertisement.benefits = data.benefits;
    advertisement.skills = data.skills;
    return await em.save(advertisement);
  }

  async remove(
    em: EntityManager,
    advertisement: Advertisement
  ) {
    advertisement.deletedAt = new Date();
    await em.save(advertisement);
  }

  async addToFavourites(
    em: EntityManager,
    user: User,
    advertisement: Advertisement
  ) {
    const favourites = user.favouriteAdvertisements ?? [];
    user.favouriteAdvertisements = [...favourites, advertisement];
    await em.save(user as User);
  }

  async removeFromFavourites(
    em: EntityManager,
    user: User,
    advertisement: Advertisement
  ) {
    const favourites = user.favouriteAdvertisements ?? [];
    user.favouriteAdvertisements = favourites.filter((a) => a.id != advertisement.id);
    await em.save(user);
  }

  async prepareObject(advertisement: Advertisement, favourites: Advertisement[]) {
    advertisement.benefits =
      isString(advertisement.benefits)
        ? advertisement.benefits.split(',')
        : advertisement.benefits;
    advertisement.skills =
      isString(advertisement.skills)
        ? advertisement.skills.split(',')
        : advertisement.skills;
      advertisement.isFavourite = !!favourites.find((a) => a.id == advertisement.id);
  }
}
