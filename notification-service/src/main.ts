import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
require('dotenv').config();

// This is the port defined in API gateway to interact with notification service
const NOTIFICATION_MICROSERVICE_TCP_PORT = Number(
  process.env.NOTIFICATION_MICROSERVICE_TCP_PORT,
);

const NOTIFICATION_SERVICE_PORT = Number(process.env.PORT);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: NOTIFICATION_MICROSERVICE_TCP_PORT,
    },
  });
  await app.startAllMicroservices();
  await app.listen(NOTIFICATION_SERVICE_PORT);
}
bootstrap();
