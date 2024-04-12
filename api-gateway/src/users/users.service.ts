import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  healthCheck() {
    return `Api gateway user endpoint working`;
  }
}
