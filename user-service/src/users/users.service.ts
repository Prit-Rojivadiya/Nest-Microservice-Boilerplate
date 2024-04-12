import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  checkMicroServiceHealth(payload: any) {
    return payload?.message || 'User micro service working';
  }
}
