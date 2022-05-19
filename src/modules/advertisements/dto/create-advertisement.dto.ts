import { IsArray, IsInt, IsNotEmpty, IsString, Length, Max, Min, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdvertisementDto {
  @ApiProperty({ minLength: 5, maxLength: 100 })
  @Length(5, 100)
  title: string;

  @ApiProperty({ minLength: 20, maxLength: 1000 })
  @Length(20, 1000)
  description: string;

  @ApiProperty({ minimum: 0, maximum: 1000000 })
  @Min(0)
  @Max(1000000)
  salary: number;

  @ApiProperty({ type: Array })
  @IsArray()
  @IsString({ each: true })
  @Length(1, 50, { each: true })
  benefits: string[];

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  categoryId: number;
}
