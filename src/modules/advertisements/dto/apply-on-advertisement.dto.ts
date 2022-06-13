import { Column } from 'typeorm';
import { IsEmail, IsInt, IsPhoneNumber, Length, Max, MaxLength, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ApplyOnAdvertisementDto {
  @ApiProperty({ minimum: 0, maximum: 100000 })
  @Min(0)
  @Max(100000)
  expectedSalary: number;

  @ApiProperty({ minLength: 0, maxLength: 50 })
  @Length(2, 50)
  firstName: string;

  @ApiProperty({ minLength: 0, maxLength: 50 })
  @Length(2, 50)
  lastName: string;

  @ApiProperty({ maxLength: 200 })
  @Length(1,200)
  @IsEmail()
  contactEmail: string;

  @ApiProperty({ minLength: 9, maxLength: 20 })
  @Length(9,20)
  @IsPhoneNumber('PL')
  phone: string;

  @ApiProperty({ minLength: 20, maxLength: 2000 })
  @Length(20, 2000)
  personDescription: string;

  @ApiProperty({ minLength: 20, maxLength: 2000 })
  @Length(20, 2000)
  experience: string;

  @ApiProperty({ minLength: 2, maxLength: 100 })
  @Length(2, 100)
  lastCompanyName: string;
}