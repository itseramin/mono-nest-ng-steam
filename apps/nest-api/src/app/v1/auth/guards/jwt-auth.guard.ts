import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { UserRole } from '../../modules/users/entities/user.entity';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super(reflector);
  }

  async canActivate(executionContext: ExecutionContext): Promise<boolean> {
    const defaultGuardResult = await super.canActivate(executionContext);
    if (!defaultGuardResult) {
      return false;
    }

    const { user } = await executionContext.switchToHttp().getRequest();
    if (!user) return false;

    const roles =
      this.reflector.getAllAndMerge<UserRole[]>('roles', [
        executionContext.getClass(), // Whole controller
        executionContext.getHandler(), // Only requests/paths
      ]) || [];
    if (!roles.length) return true;

    return roles.some((role) => {
      return role === user.role;
    });
  }

  // handleRequest(err, user, info: Error) {
  //   // TODO: custom 401 error when unauthenticated
  //   return user;
  // }
}
