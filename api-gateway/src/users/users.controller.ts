import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Response,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { USER_MICROSERVICE_NAME } from 'src/utils/constants/microServicesName';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { customError } from 'src/utils/errors/customError';
import { response } from 'express';

@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(USER_MICROSERVICE_NAME) private readonly userClient: ClientProxy,
  ) {}

  @Get('health-check')
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

  @Post()
  async createUser(@Body() payload, @Response() response) {
    try {
      const result = await lastValueFrom(
        this.userClient.send({ cmd: 'create-user' }, { body: payload }),
      );
      return response.send(result);
    } catch (error) {
      return customError(error, response);
    }
  }

  @Get()
  async getAllUsers(@Response() response) {
    try {
      const result = await lastValueFrom(
        this.userClient.send({ cmd: 'get-all-users' }, {}),
      );
      return response.send(result);
    } catch (error) {
      return customError(error, response);
    }
  }

  @Get(':id')
  async getUserById(@Param('id') id: string, @Response() response) {
    try {
      const result = await lastValueFrom(
        this.userClient.send({ cmd: 'get-user-by-id' }, { id }),
      );
      return response.send(result);
    } catch (error) {
      return customError(error, response);
    }
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() payload,
    @Response() response,
  ) {
    try {
      const result = await lastValueFrom(
        this.userClient.send({ cmd: 'update-user' }, { id, body: payload }),
      );
      return response.send(result);
    } catch (error) {
      return customError(error, response);
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Response() response) {
    try {
      const result = await lastValueFrom(
        this.userClient.send({ cmd: 'delete-user' }, { id }),
      );
      return response.send(result);
    } catch (error) {
      return customError(error, response);
    }
  }
}
