import { Controller, Get, Inject } from '@nestjs/common';
import { PollsService } from './polls.service';
import { ClientProxy } from '@nestjs/microservices';
import { POLL_MICROSERVICE_NAME } from 'src/utils/constants/microServicesName';

@Controller('polls')
export class PollsController {
  constructor(
    private readonly pollsService: PollsService,
    @Inject(POLL_MICROSERVICE_NAME) private readonly pollClient: ClientProxy,
  ) {}

  @Get()
  healthCheck() {
    return this.pollsService.healthCheck();
  }

  @Get('check-micro-service-health')
  checkMicroServiceHealth() {
    return this.pollClient.send(
      { cmd: 'check_micro_service_health' },
      { ...{ message: 'Poll micro service working' } },
    );
  }
}
