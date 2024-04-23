import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
require('dotenv').config();

const API_GATEWAY_PORT = Number(process.env.API_GATEWAY_PORT);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  await app.listen(API_GATEWAY_PORT);
}
bootstrap();
