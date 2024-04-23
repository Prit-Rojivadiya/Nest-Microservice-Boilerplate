import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
require('dotenv').config();

// This is the port defined in API gateway to interact with poll service
const POLL_MICROSERVICE_TCP_PORT = Number(
  process.env.POLL_MICROSERVICE_TCP_PORT,
);

const POLL_SERVICE_PORT = Number(process.env.PORT);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: POLL_MICROSERVICE_TCP_PORT,
    },
  });
  await app.startAllMicroservices();
  await app.listen(POLL_SERVICE_PORT);
}
bootstrap();
