import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req, SerializeOptions,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { JwtLoginDto } from './dto/jwt-login.dto';
import { UserTypeEnum } from '../users/enum/user-type.enum';
import { ApiResponse } from '@nestjs/swagger';
import { User } from '../users/user.entity';
import { AuthorizedDto } from './dto/authorized.dto';

@Controller('api/auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(protected readonly authService: AuthService) {}

  @Post('login')
  @ApiResponse({ type: AuthorizedDto })
  @SerializeOptions({ groups: ['base', 'auth'] })
  async login(@Body() body: JwtLoginDto) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return {
      ...(await this.authService.loginJwt(user)),
      user: user,
    };
  }

  @Post('register/jobSeeker')
  @ApiResponse({ type: AuthorizedDto })
  @SerializeOptions({ groups: ['base', 'auth'] })
  async registerJobSeeker(@Body() body: RegisterDto) {
    const user = await this.authService.register(
      body.email,
      body.password,
      body.firstName,
      body.lastName,
      UserTypeEnum.JOB_SEEKER,
    );
    return {
      ...(await this.authService.loginJwt(user)),
      user: user,
    };
  }

  @Post('register/advertiser')
  @ApiResponse({ type: AuthorizedDto })
  @SerializeOptions({ groups: ['base', 'auth'] })
  async registerAdvertiser(@Body() body: RegisterDto) {
    const user = await this.authService.register(
      body.email,
      body.password,
      body.firstName,
      body.lastName,
      UserTypeEnum.ADVERTISER,
    );
    return {
      ...(await this.authService.loginJwt(user)),
      user: user,
    };
  }
}
