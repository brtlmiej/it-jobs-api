import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class UnauthenticatedGuard implements CanActivate {
    canActivate(context: ExecutionContext): Promise<boolean>;
}
