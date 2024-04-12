import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USER_MICROSERVICE_NAME } from 'src/utils/constants/microServicesName';
require('dotenv').config();

// Port through which we will interact with user service
const USER_MICROSERVICE_PORT = Number(process.env.USER_MICROSERVICE_PORT);

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_MICROSERVICE_NAME,
        transport: Transport.TCP,
        options: { port: USER_MICROSERVICE_PORT },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
