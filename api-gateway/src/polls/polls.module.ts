import { Module } from '@nestjs/common';
import { PollsService } from './polls.service';
import { PollsController } from './polls.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { POLL_MICROSERVICE_NAME } from 'src/utils/constants/microServicesName';
require('dotenv').config();

// Port through which we will interact with poll service
const POLL_MICROSERVICE_PORT = Number(process.env.POLL_MICROSERVICE_PORT);

@Module({
  imports: [
    ClientsModule.register([
      {
        name: POLL_MICROSERVICE_NAME,
        transport: Transport.TCP,
        options: { port: POLL_MICROSERVICE_PORT },
      },
    ]),
  ],
  controllers: [PollsController],
  providers: [PollsService],
})
export class PollsModule {}
