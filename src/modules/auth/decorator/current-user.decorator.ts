import { createParamDecorator, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { User } from '../../users/user.entity';
import { UserTypeEnum } from '../../users/enum/user-type.enum';

export const CurrentUser = createParamDecorator(
  async (data: CurrentUserOptions, ctx: ExecutionContext) => {
    const allowedTypes = data?.allowedTypes;
    const request = ctx.switchToHttp().getRequest();
    const id = request.user?.id;
    const user = await User.findOne(id);
    if (allowedTypes && allowedTypes.length > 0 && !allowedTypes.includes(user.type)) {
      throw new ForbiddenException('You have no access to this route');
    }
    return user;
  },
);

export interface CurrentUserOptions {
  allowedTypes?: UserTypeEnum[];
}