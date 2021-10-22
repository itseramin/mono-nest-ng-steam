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

    const roles =
      this.reflector.getAllAndMerge<UserRole[]>('roles', [
        executionContext.getHandler(), // only requests/paths
        executionContext.getClass(), // whole controller
      ]) || [];
    if (!roles.length) return true;

    const { user } = await executionContext.switchToHttp().getRequest();
    if (!user) return false;

    return roles.some((role) => {
      return role === user.role;
    });
  }
}
