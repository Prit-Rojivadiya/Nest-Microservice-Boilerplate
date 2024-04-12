import { Controller, Get, Inject } from '@nestjs/common';
import { UsersService } from './users.service';
import { USER_MICROSERVICE_NAME } from 'src/utils/constants/microServicesName';
import { ClientProxy } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(USER_MICROSERVICE_NAME) private readonly userClient: ClientProxy,
  ) {}

  @Get()
  healthCheck() {
    return this.usersService.healthCheck();
  }

  @Get('check-micro-service-health')
  checkMicroServiceHealth() {
    return this.userClient.send(
      { cmd: 'check_micro_service_health' },
      { ...{ message: 'User micro service working' } },
    );
  }
}
