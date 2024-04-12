import { Controller } from '@nestjs/common';
import { PollsService } from './polls.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('polls')
export class PollsController {
  constructor(private readonly pollsService: PollsService) {}

  // This message pattern can be used in any controller of different modules inside srs folder
  @MessagePattern({ cmd: 'check_micro_service_health' })
  checkMicroServiceHealth(@Payload() payload): any {
    return this.pollsService.checkMicroServiceHealth(payload);
  }
}
