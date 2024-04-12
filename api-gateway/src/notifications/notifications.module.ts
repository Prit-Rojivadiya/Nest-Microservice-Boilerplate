import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NOTIFICATION_MICROSERVICE_NAME } from 'src/utils/constants/microServicesName';
require('dotenv').config();

// Port through which we will interact with notification service
const NOTIFICATION_MICROSERVICE_PORT = Number(
  process.env.NOTIFICATION_MICROSERVICE_PORT,
);

@Module({
  imports: [
    ClientsModule.register([
      {
        name: NOTIFICATION_MICROSERVICE_NAME,
        transport: Transport.TCP,
        options: { port: NOTIFICATION_MICROSERVICE_PORT },
      },
    ]),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
