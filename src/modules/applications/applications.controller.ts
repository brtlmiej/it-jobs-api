import { Controller, Get, Param, Query, SerializeOptions, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ApiResponse } from '@nestjs/swagger';
import { Paginator } from '../../common/database/paginator';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { User } from '../users/user.entity';
import { ApplicationsRepository } from './applications.repository';
import { ApplicationsListDto } from './dto/applications-list.dto';
import { UserTypeEnum } from '../users/enum/user-type.enum';
import { AdvertisementsService } from '../advertisements/advertisements.service';
import { AdvertisementsRepository } from '../advertisements/advertisements.repository';

@Controller('api/applications')
export class ApplicationsController {
  constructor(
    private readonly applicationsRepository: ApplicationsRepository,
    private readonly advertisementsService: AdvertisementsService,
    private readonly advertisementsRepository: AdvertisementsRepository,
  ) {
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @SerializeOptions({ groups: ['base', 'creator', 'category'] })
  @ApiResponse({ type: Paginator })
  async findAll(
    @Query() query: ApplicationsListDto,
    @CurrentUser() user: User,
  ) {
    let where;
    if (user.type == UserTypeEnum.JOB_SEEKER) {
      where = {
        jobSeeker: {
          id: user.id,
        }
      };
    } else if (user.type == UserTypeEnum.ADVERTISER) {
      where = {
        advertisement: {
          creator: {
            id:  user.id,
          }
        }
      };
    }

    if (!!query.advertisementId) {
      where['advertisement'] = {
        id: query.advertisementId
      };
    }
    const applications = await this.applicationsRepository.findAll(
      query.records,
      query.page,
      query.sortBy,
      query.sortDirection,
      {
        relations: ['jobSeeker', 'advertisement', 'advertisement.category', 'advertisement.skills', 'advertisement.benefits'],
        where: where,
      },
    );
    const favourites = await this.advertisementsRepository
      .findUserFavourites(user);
    for (const application of applications.data) {
      await this.advertisementsService.prepareObject(application.advertisement, favourites);
    }
    return applications;
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @SerializeOptions({ groups: ['base', 'creator', 'category'] })
  @ApiResponse({ type: Paginator })
  async findOne(
    @Param('id') id: number,
    @CurrentUser() user: User,
  ) {
    return await this.applicationsRepository.findOne({
      relations: ['jobSeeker', 'advertisement'],
      where: {
        jobSeeker: {
          id: user.id
        }
      }
    });
  }
}