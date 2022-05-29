import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../users/user.entity';
import {isObject} from "class-validator";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  public handleRequest(err: unknown, user: User): any {
    const { password, ...data } = user
    return data;
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const { user } = context.switchToHttp().getRequest();
    return !!user && isObject(user) && Object.keys(user).length > 0;
  }
}
