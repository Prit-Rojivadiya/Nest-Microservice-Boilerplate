import { Controller, Get, Inject } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { ClientProxy } from '@nestjs/microservices';
import { NOTIFICATION_MICROSERVICE_NAME } from 'src/utils/constants/microServicesName';

@Controller({
  path: 'notifications',
  version: '1',
})
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
    @Inject(NOTIFICATION_MICROSERVICE_NAME)
    private readonly notificationClient: ClientProxy,
  ) {}

  @Get('health-check')
  healthCheck() {
    return this.notificationsService.healthCheck();
  }

  @Get('check-micro-service-health')
  checkMicroServiceHealth() {
    return this.notificationClient.send(
      { cmd: 'check_micro_service_health' },
      { ...{ message: 'Notification micro service working' } },
    );
  }
}
