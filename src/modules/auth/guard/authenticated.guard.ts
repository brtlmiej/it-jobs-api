import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';
import { UsersRepository } from '../../users/users.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return request.user;
  }
}