import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
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
}
