import { Injectable } from '@nestjs/common';

@Injectable()
export class PollsService {
  healthCheck() {
    return `Api gateway poll endpoint working`;
  }
}
