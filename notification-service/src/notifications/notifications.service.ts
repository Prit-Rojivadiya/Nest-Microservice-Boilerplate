import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  RpcException,
  Transport,
} from '@nestjs/microservices';
import { sendNotification } from 'src/utils/pushNotification/sendNotification';
require('dotenv').config();

const POLL_MICROSERVICE_TCP_PORT = Number(
  process.env.POLL_MICROSERVICE_TCP_PORT,
);
const POLL_MICROSERVICE_TCP_HOST = process.env.POLL_MICROSERVICE_TCP_HOST;
const USER_MICROSERVICE_TCP_PORT = Number(
  process.env.USER_MICROSERVICE_TCP_PORT,
);
const USER_MICROSERVICE_TCP_HOST = process.env.USER_MICROSERVICE_TCP_HOST;

@Injectable()
export class NotificationsService {
  private userClient: ClientProxy;
  private pollClient: ClientProxy;

  constructor() {
    this.userClient = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        port: USER_MICROSERVICE_TCP_PORT,
        host: USER_MICROSERVICE_TCP_HOST,
      },
    });
    this.pollClient = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        port: POLL_MICROSERVICE_TCP_PORT,
        host: POLL_MICROSERVICE_TCP_HOST,
      },
    });
  }

  checkMicroServiceHealth(payload: any) {
    // call user micro service

    // return this.userClient.send(
    //   { cmd: 'check_micro_service_health' },
    //   { ...{ message: 'User micro service working' } },
    // );

    // call poll micro service

    // return this.pollClient.send(
    //   { cmd: 'check_micro_service_health' },
    //   { ...{ message: 'Poll micro service working' } },
    // );

    return payload?.message || 'Notification micro service working';
  }

  async pushNotificationTesting() {
    try {
      const message = {
        title: 'Hello from Node.js!',
        body: 'This is a push notification sent from a Node.js server.',
      };
      const token = 'DEVICE_REGISTRATION_TOKEN_OR_TOPIC_NAME';
      await sendNotification(token, message);
      return 'Notification sent';
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
