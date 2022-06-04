import { IsArray, IsInt, IsNotEmpty, IsNumber, IsString, Length, Max, Min, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdvertisementDto {
  @ApiProperty({ minLength: 5, maxLength: 100 })
  @Length(5, 100)
  title: string;

  @ApiProperty({ minLength: 20, maxLength: 1000 })
  @Length(20, 1000)
  description: string;

  @ApiProperty({ minLength: 5, maxLength: 50 })
  @Length(5, 50)
  company: string;

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

  @ApiProperty({ type: Number, isArray: true })
  @IsArray()
  benefitsIds: number[];

  @ApiProperty({ type: Number, isArray: true })
  @IsArray()
  skillsIds: number[];

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  categoryId: number;
}
