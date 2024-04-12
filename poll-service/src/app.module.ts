import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PollsModule } from './polls/polls.module';

@Module({
  imports: [PollsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
