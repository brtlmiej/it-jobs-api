import { ApiProperty } from '@nestjs/swagger';

export class Paginator<T> {
  @ApiProperty({ description: 'Entities data' })
  data: T[];

  @ApiProperty({ description: 'Number of returned records on current page' })
  records: number;

  @ApiProperty({ description: 'Total number of records' })
  total: number;

  @ApiProperty({ description: 'Total number of pages' })
  totalPages: number;

  @ApiProperty({ description: 'Current page number' })
  page: number;
}