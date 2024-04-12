import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // This message pattern can be used in any controller of different modules inside srs folder
  @MessagePattern({ cmd: 'check_micro_service_health' })
  checkMicroServiceHealth(@Payload() payload): any {
    return this.usersService.checkMicroServiceHealth(payload);
  }
}
