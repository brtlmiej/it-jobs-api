import { Controller, Get, Param, Query, SerializeOptions, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ApiResponse } from '@nestjs/swagger';
import { Paginator } from '../../common/database/paginator';
import { ListDto } from '../../common/dto/list.dto';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { User } from '../users/user.entity';
import { ApplicationsRepository } from './applications.repository';
import { ApplicationsListDto } from './dto/applications-list.dto';

@Controller('api/applications')
export class ApplicationsController {
  constructor(
    private readonly applicationsRepository: ApplicationsRepository,
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
    const where = {
      jobSeeker: {
        id: user.id,
      }
    };
    if (!!query.advertisementId) {
      where['advertisement'] = {
        id: query.advertisementId
      };
    }
    return await this.applicationsRepository.findAll(
      query.records,
      query.page,
      query.sortBy,
      query.sortDirection,
      {
        relations: ['jobSeeker', 'advertisement'],
        where: where,
      },
    );
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