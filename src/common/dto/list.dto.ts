import { IsIn, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ListDto {
  @ApiProperty({ description: 'Number of records' })
  @IsInt()
  records: number = 10;

  @ApiProperty({ description: 'Page number' })
  @IsInt()
  page: number = 1;

  @ApiProperty({ description: 'Sort field' })
  @IsString()
  sortBy: string;

  @ApiProperty({ description: 'Sort direction. Available values: ASC, DESC' })
  @IsIn(['ASC', 'DESC'])
  sortDirection: 'ASC' | 'DESC';
}