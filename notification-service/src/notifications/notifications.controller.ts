import { Controller } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  // This message pattern can be used in any controller of different modules inside srs folder
  @MessagePattern({ cmd: 'check_micro_service_health' })
  checkMicroServiceHealth(@Payload() payload): any {
    return this.notificationsService.checkMicroServiceHealth(payload);
  }

  @MessagePattern({ cmd: 'send-push-notification' })
  async pushNotificationTesting() {
    return await this.notificationsService.pushNotificationTesting();
  }
}
