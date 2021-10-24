import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../modules/users/entities/user.entity';

export const ReqUser = createParamDecorator(
  (data: unknown, executionContext: ExecutionContext) => {
    const request = executionContext.switchToHttp().getRequest();
    return request.user;
  }
);
