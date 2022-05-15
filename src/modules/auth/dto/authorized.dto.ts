import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/user.entity';

export class AuthorizedDto {
  @ApiProperty()
  user: User;
  @ApiProperty()
  access_token: string
}