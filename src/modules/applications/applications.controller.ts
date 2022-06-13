import { Controller, Get, Query, SerializeOptions, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ApiResponse } from '@nestjs/swagger';
import { Paginator } from '../../common/database/paginator';
import { ListDto } from '../../common/dto/list.dto';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { User } from '../users/user.entity';
import { ApplicationsRepository } from './applications.repository';

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
    @Query() query: ListDto,
    @CurrentUser() user: User,
  ) {
    return await this.applicationsRepository.findAll(
      query.records,
      query.page,
      query.sortBy,
      query.sortDirection,
      {
        relations: ['jobSeeker', 'advertisement'],
        where: {
          jobSeeker: {
            id: user.id,
          }
        },
      },
    );
  }
}