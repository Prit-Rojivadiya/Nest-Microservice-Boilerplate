import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import * as dynamoose from 'dynamoose';
require('dotenv').config();

// This is the port defined in API gateway to interact with user service
const USER_MICROSERVICE_TCP_PORT = Number(
  process.env.USER_MICROSERVICE_TCP_PORT,
);

const USER_SERVICE_PORT = Number(process.env.PORT);

const {
  NODE_ENV,
  AWS_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  LOCAL_DYNAMODB_INSTANCE,
} = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (NODE_ENV === 'development') {
    // for connecting local dynamodb instance
    dynamoose.aws.ddb.local(LOCAL_DYNAMODB_INSTANCE);
  } else {
    // Connect remote dynamodb

    // Create new DynamoDB instance
    const ddb = new dynamoose.aws.ddb.DynamoDB({
      credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
      region: AWS_REGION,
    });

    // Set DynamoDB instance to the Dynamoose DDB instance
    dynamoose.aws.ddb.set(ddb);
  }

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: USER_MICROSERVICE_TCP_PORT,
    },
  });
  await app.startAllMicroservices();
  await app.listen(USER_SERVICE_PORT);
}
bootstrap();
