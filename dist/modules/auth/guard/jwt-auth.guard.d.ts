import { ExecutionContext } from '@nestjs/common';
import { User } from '../../users/user.entity';
declare const JwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthGuard extends JwtAuthGuard_base {
    handleRequest(err: unknown, user: User): any;
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export {};
