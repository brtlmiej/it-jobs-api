import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { AdvertisementsService } from './advertisements.service';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { UpdateAdvertisementDto } from './dto/update-advertisement.dto';
import { AdvertisementsRepository } from './advertisements.repository';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { User } from '../users/user.entity';
import { getConnection, In } from 'typeorm';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { AdvertisementsListDto } from './dto/advertisements-list.dto';
import { ApiResponse } from '@nestjs/swagger';
import { Paginator } from '../../common/database/paginator';
import { Advertisement } from './advertisement.entity';
import { UserTypeEnum } from '../users/enum/user-type.enum';
import { ApplyOnAdvertisementDto } from './dto/apply-on-advertisement.dto';
import { ApplicationsService } from '../applications/applications.service';
import { ApplicationsRepository } from '../applications/applications.repository';
import { ListDto } from '../../common/dto/list.dto';

@Controller('api/advertisements')
export class AdvertisementsController {
  constructor(
    private readonly advertisementsService: AdvertisementsService,
    private readonly advertisementsRepository: AdvertisementsRepository,
    private readonly applicationsService: ApplicationsService,
    private readonly applicationsRepository: ApplicationsRepository,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @SerializeOptions({ groups: ['base', 'creator', 'category'] })
  @ApiResponse({ type: Paginator })
  async findAll(
    @Query() query: AdvertisementsListDto,
    @CurrentUser() user: User,
  ) {
    const favourites = await this.advertisementsRepository
      .findUserFavourites(user);
    const where = {
      'deletedAt': null
    };
    if (query.categoryId) {
      where['category'] = + query.categoryId;
    }
    if (query.isFavourite) {
      where['id'] = In(favourites.map(a => a.id));
    }
    const data = await this.advertisementsRepository.findAll(
      query.records,
      query.page,
      query.sortBy,
      query.sortDirection,
      {
        relations: ['category', 'skills', 'benefits'],
        join: {
          alias: 'advertisement',
          leftJoin: {
            category: 'advertisement.category',
          }
        },
        where: where,
      },
    );
    for (const a of data.data) {
      await this.advertisementsService.prepareObject(a, favourites);
    }
    return data;
  }

  @Get('my-offers')
  @UseGuards(JwtAuthGuard)
  @SerializeOptions({ groups: ['base', 'creator', 'category'] })
  @ApiResponse({ type: Paginator })
  async findAdvertiserOffers(
    @Query() query: AdvertisementsListDto,
    @CurrentUser() user: User,
  ) {
    const favourites = await this.advertisementsRepository
      .findUserFavourites(user);
    const where = {
      'deletedAt': null,
      creator: {
        id: user.id,
      }
    };
    if (query.categoryId) {
      where['category'] = + query.categoryId;
    }
    if (query.isFavourite) {
      where['id'] = In(favourites.map(a => a.id));
    }
    const data = await this.advertisementsRepository.findAll(
      query.records,
      query.page,
      query.sortBy,
      query.sortDirection,
      {
        relations: ['category', 'skills', 'benefits'],
        join: {
          alias: 'advertisement',
          leftJoin: {
            category: 'advertisement.category',
          }
        },
        where: where,
      },
    );
    for (const a of data.data) {
      await this.advertisementsService.prepareObject(a, favourites);
    }
    return data;
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: Advertisement })
  async findOne(
    @Param('id') id: string,
    @CurrentUser() user: User
  ) {
    const a = await this.advertisementsRepository.findOne({
      where: {
        id: id,
        deletedAt: null,
      },
      relations: ['category', 'skills', 'benefits'],
    });
    if (!a) {
      throw new NotFoundException();
    }
    const favourites = await this.advertisementsRepository
      .findUserFavourites(user);
    await this.advertisementsService.prepareObject(a, favourites);
    return a;
  }

  @Post(':id/add-to-favourites')
  @UseGuards(JwtAuthGuard)
  async addToFavourites(
    @Param('id') id: string,
    @CurrentUser() user: User
  ) {
    const a = await this.advertisementsRepository.findOne({
      relations: ['observers'],
      where: {
        id: id,
        deletedAt: null,
      },
    });
    if (!a) {
      throw new NotFoundException();
    }
    await getConnection().transaction(async (em) => {
      await this.advertisementsService.addToFavourites(em, user, a);
    });
    return;
  }

  @Post(':id/remove-from-favourites')
  @UseGuards(JwtAuthGuard)
  async removeFromFavourites(
    @Param('id') id: string,
    @CurrentUser() user: User
  ) {
    const a = await this.advertisementsRepository.findOne({
      relations: ['observers'],
      where: {
        id: id,
        deletedAt: null,
      },
    });
    if (!a) {
      throw new NotFoundException();
    }
    await getConnection().transaction(async (em) => {
      await this.advertisementsService.removeFromFavourites(em, user, a);
    });
    return;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @SerializeOptions({ groups: ['base', 'creator'] })
  async create(
    @Body() data: CreateAdvertisementDto,
    @CurrentUser({ allowedTypes: [UserTypeEnum.ADVERTISER] })
    user: User,
  ) {
    let advertisement;
    await getConnection().transaction(async (em) => {
      advertisement = await this.advertisementsService.create(em, data, user);
    });
    return advertisement;
  }

  @Post(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() data: UpdateAdvertisementDto,
    @CurrentUser({ allowedTypes: [UserTypeEnum.ADVERTISER] })
    user: User,
  ) {
    const advertisement = await this.advertisementsRepository.findOneOrFail({
      where: {
        id: id,
        deletedAt: null,
        creator: {
          id: user.id,
        },
      },
    });
    await getConnection().transaction(async (em) => {
      await this.advertisementsService.update(em, advertisement, data, user);
    });
    return advertisement;
  }

  @Post(':id/apply')
  @UseGuards(JwtAuthGuard)
  async apply(
    @Param('id') id: string,
    @Body() data: ApplyOnAdvertisementDto,
    @CurrentUser({ allowedTypes: [UserTypeEnum.JOB_SEEKER] })
      user: User,
  ) {
    const advertisement = await this.advertisementsRepository.findOneOrFail({
      where: {
        id: id,
        deletedAt: null,
      },
    });
    let application;
    await getConnection().transaction(async (em) => {
      application = await this.applicationsService.create(em, advertisement, user, data);
    });
    return application;
  }

  @Post(':id/delete')
  @UseGuards(JwtAuthGuard)
  async remove(
    @Param('id') id: string,
    @CurrentUser({ allowedTypes: [UserTypeEnum.ADVERTISER] })
    user: User,
  ) {
    const advertisement = await this.advertisementsRepository.findOneOrFail({
      where: {
        id: id,
        deletedAt: null,
        creator: {
          id: user.id,
        },
      },
    });
    await getConnection().transaction(async (em) => {
      await this.advertisementsService.remove(em, advertisement);
    });
  }
}
