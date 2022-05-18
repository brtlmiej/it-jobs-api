import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAdvertisementDto } from './create-advertisement.dto';
import { IsInt, Length } from 'class-validator';

export class UpdateAdvertisementDto extends PartialType(CreateAdvertisementDto) {
  @ApiProperty({ minLength: 5, maxLength: 100 })
  @Length(5, 100)
  title: string;

  @ApiProperty({ minLength: 20, maxLength: 1000 })
  @Length(20, 1000)
  description: string;

  @ApiProperty()
  @IsInt()
  categoryId: number;
}
