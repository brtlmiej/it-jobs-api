import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  SerializeOptions, NotFoundException,
} from '@nestjs/common';
import { AdvertisementsService } from './advertisements.service';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { UpdateAdvertisementDto } from './dto/update-advertisement.dto';
import { AdvertisementsRepository } from './advertisements.repository';
import { ListDto } from '../../common/dto/list.dto';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { User } from '../users/user.entity';
import { getConnection } from 'typeorm';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { isString } from 'class-validator';

@Controller('api/advertisements')
export class AdvertisementsController {
  constructor(
    private readonly advertisementsService: AdvertisementsService,
    private readonly advertisementsRepository: AdvertisementsRepository,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @SerializeOptions({ groups: ['base', 'creator'] })
  async findAll(@Query() query: ListDto) {
    const data = await this.advertisementsRepository.findAll(
      query.records,
      query.page,
      query.sortBy,
      query.sortDirection,
      {
        where: {
          deletedAt: null,
        },
      },
    );
    for (const a of data.data) {
      a.benefits = isString(a.benefits) ? a.benefits.split(',') : a.benefits;
    }
    return data;
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    const a = await this.advertisementsRepository.findOne({
      where: {
        id: id,
        deletedAt: null,
      },
    });
    if (!a) {
      throw new NotFoundException();
    }
    a.benefits = isString(a.benefits) ? a.benefits.split(',') : a.benefits;
    return a;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @SerializeOptions({ groups: ['base', 'creator'] })
  async create(
    @Body() data: CreateAdvertisementDto,
    @CurrentUser() user: User,
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
    @CurrentUser() user: User,
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

  @Post(':id/delete')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @CurrentUser() user: User) {
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
