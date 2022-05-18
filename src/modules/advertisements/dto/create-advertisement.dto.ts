import { IsInt, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdvertisementDto {
  @ApiProperty({ minLength: 5, maxLength: 100 })
  @Length(5, 100)
  title: string;

  @ApiProperty({ minLength: 20, maxLength: 1000 })
  @Length(20, 1000)
  description: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  categoryId: number;
}
