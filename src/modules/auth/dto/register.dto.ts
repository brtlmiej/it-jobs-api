import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Max, Min } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ maximum: 190 })
  @IsEmail()
  @IsNotEmpty()
  @Length(2, 190)
  email: string;

  @IsNotEmpty()
  @ApiProperty({ maximum: 16, minimum: 8 })
  @Length(8, 16)
  password: string;

  @IsNotEmpty()
  @ApiProperty({ maximum: 50, minimum: 2 })
  @Length(2, 50)
  firstName: string;

  @IsNotEmpty()
  @ApiProperty({ maximum: 50, minimum: 2 })
  @Length(2, 50)
  lastName: string;
}