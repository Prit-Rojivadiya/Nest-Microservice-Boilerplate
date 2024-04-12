import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config();

const API_GATEWAY_PORT = Number(process.env.API_GATEWAY_PORT);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(API_GATEWAY_PORT);
}
bootstrap();
