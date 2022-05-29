import { ListDto } from '../../../common/dto/list.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class AdvertisementsListDto extends ListDto {
  @ApiProperty({ description: 'Category Id' })
  @IsOptional()
  categoryId: number;

  @ApiProperty({ description: 'Get only favourite advertisements' })
  @IsOptional()
  isFavourite: boolean;
}