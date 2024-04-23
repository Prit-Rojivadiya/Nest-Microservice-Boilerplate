import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
require('dotenv').config();

// This is the port defined in API gateway to interact with user service
const USER_MICROSERVICE_TCP_PORT = Number(
  process.env.USER_MICROSERVICE_TCP_PORT,
);

const USER_SERVICE_PORT = Number(process.env.PORT);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(
    {
      transport: Transport.TCP,
      options: {
        port: USER_MICROSERVICE_TCP_PORT,
      },
    },
    { inheritAppConfig: true },
  );
  await app.startAllMicroservices();
  await app.listen(USER_SERVICE_PORT);
}
bootstrap();
