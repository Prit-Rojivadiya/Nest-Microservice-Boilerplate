import { Injectable } from '@nestjs/common';

@Injectable()
export class PollsService {
  checkMicroServiceHealth(payload: any) {
    return payload?.message || 'Poll micro service working';
  }
}
