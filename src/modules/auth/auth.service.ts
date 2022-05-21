import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import * as bcrypt from 'bcrypt';
import { UserStatus } from '../users/enum/user-status.enum';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserTypeEnum } from '../users/enum/user-type.enum';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export class AuthService {
  constructor(
    protected readonly usersRepository: UsersRepository,
    protected readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, plainPassword: string) {
    const user = await this.usersRepository.findOne({ email: email });
    if (
      user &&
      (await bcrypt.compare(plainPassword, user.password)) &&
      user.status == UserStatus.ACTIVE
    ) {
      return user;
    }
    return null;
  }

  async loginJwt(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }

  async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    type: UserTypeEnum,
  ) {
    let user = await this.usersRepository.findOne({
      email: email,
      type: type,
    });
    if (user) {
      throw new BadRequestException('User with given e-mail already exist');
    }
    user = new User();
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.status = UserStatus.ACTIVE;
    user.password = bcrypt.hashSync(password, 12);
    user.type = type;
    return await this.usersRepository.save(user);
  }
}
