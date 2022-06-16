import { ListDto } from '../../../common/dto/list.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class ApplicationsListDto extends ListDto {
  @ApiProperty({ description: 'Selected advertisement id' })
  @IsOptional()
  advertisementId: number;
}