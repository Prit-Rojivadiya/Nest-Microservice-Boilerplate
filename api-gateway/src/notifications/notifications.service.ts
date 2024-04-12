import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  healthCheck() {
    return `Api gateway notification endpoint working`;
  }
}
