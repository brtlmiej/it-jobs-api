import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAdvertisementDto } from './create-advertisement.dto';
import { IsArray, IsInt, IsString, Length, Max, Min } from 'class-validator';

export class UpdateAdvertisementDto extends PartialType(CreateAdvertisementDto) {
  @ApiProperty({ minLength: 5, maxLength: 100 })
  @Length(5, 100)
  title: string;

  @ApiProperty({ minLength: 20, maxLength: 1000 })
  @Length(20, 1000)
  description: string;

  @ApiProperty({ minimum: 0, maximum: 1000000 })
  @Min(0)
  @Max(1000000)
  salaryMin: number;

  @ApiProperty({ minimum: 0, maximum: 1000000 })
  @Min(0)
  @Max(1000000)
  salaryMax: number;

  @ApiProperty({ minimum: -90, maximum: 90 })
  @Min(-90)
  @Max(90)
  lat: number;

  @ApiProperty({ minimum: -180, maximum: 180 })
  @Min(-180)
  @Max(180)
  lng: number;

  @ApiProperty({ minLength: 2, maxLength: 100 })
  @Length(2, 100)
  city: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  @Length(1, 50, { each: true })
  benefits: string[];

  @ApiProperty({ type: Array })
  @IsArray()
  @IsString({ each: true })
  @Length(1, 50, { each: true })
  skills: string[];

  @ApiProperty()
  @IsInt()
  categoryId: number;
}
