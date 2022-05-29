import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../users/user.entity';

export const CurrentUser = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const id = request.user?.id;
    return await User.findOne(id);
  },
);