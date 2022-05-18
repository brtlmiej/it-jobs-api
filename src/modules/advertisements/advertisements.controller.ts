import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { AdvertisementsService } from './advertisements.service';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { UpdateAdvertisementDto } from './dto/update-advertisement.dto';
import { AdvertisementsRepository } from './advertisements.repository';
import { ListDto } from '../../common/dto/list.dto';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { User } from '../users/user.entity';
import { getConnection } from 'typeorm';
import { AuthenticatedGuard } from '../auth/guard/authenticated.guard';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('api/advertisements')
export class AdvertisementsController {
  constructor(
    private readonly advertisementsService: AdvertisementsService,
    private readonly advertisementsRepository: AdvertisementsRepository
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseGuards(AuthenticatedGuard)
  async findAll(@Query() query: ListDto) {
    const order = {};
    order[query.sortBy] = query.sortDirection;

    return await this.advertisementsRepository.findAll(
      query.records,
      query.page,
      query.sortBy,
      query.sortDirection,
      {
        where: {
          deletedAt: null
        }
      }
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(AuthenticatedGuard)
  async findOne(@Param('id') id: string) {
    return await this.advertisementsRepository.findOneOrFail({
      where: {
        id: id,
        deletedAt: null
      }
    });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseGuards(AuthenticatedGuard)
  async create(
    @Body() data: CreateAdvertisementDto,
    @CurrentUser() user: User
  ) {
    let advertisement;
    await getConnection().transaction(async (em) => {
      advertisement = await this.advertisementsService.create(em, data, user);
    })
    return advertisement;
  }

  @Post(':id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(AuthenticatedGuard)
  async update(
    @Param('id') id: string,
    @Body() data: UpdateAdvertisementDto,
    @CurrentUser() user: User
  ) {
    const advertisement = await this.advertisementsRepository.findOneOrFail({
      where: {
        id: id,
        deletedAt: null,
        creator: {
          id: user.id,
        }
      }
    });
    await getConnection().transaction(async (em) => {
      await this.advertisementsService.update(em, advertisement, data, user);
    })
    return advertisement;
  }

  @Post(':id/delete')
  @UseGuards(JwtAuthGuard)
  @UseGuards(AuthenticatedGuard)
  async remove(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ) {
    const advertisement = await this.advertisementsRepository.findOneOrFail({
      where: {
        id: id,
        deletedAt: null,
        creator: {
          id: user.id,
        }
      }
    });
    await getConnection().transaction(async (em) => {
      await this.advertisementsService.remove(em, advertisement);
    })
  }
}
