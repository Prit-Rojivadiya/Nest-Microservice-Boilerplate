import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
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

  @MessagePattern({ cmd: 'create-user' })
  @Post('create-user')
  async create(@Body() payload) {
    const createUserDto = payload?.body || {};
    return await this.usersService.create(createUserDto);
  }

  @MessagePattern({ cmd: 'get-all-users' })
  @Get('get-all-users')
  async findAll() {
    return await this.usersService.findAll();
  }

  @MessagePattern({ cmd: 'get-user-by-id' })
  @Get('get-user-by-id')
  async getUserById(@Body() payload) {
    const { id = '' } = payload;
    return await this.usersService.getUserById(id);
  }

  @MessagePattern({ cmd: 'update-user' })
  @Patch('update-user')
  async updateUser(@Body() payload) {
    const { id = '', body = {} } = payload;
    return this.usersService.updateUser(id, body);
  }

  @MessagePattern({ cmd: 'delete-user' })
  @Delete('delete-user')
  async deleteUser(@Body() payload) {
    const { id = '' } = payload;
    return this.usersService.deleteUser(id);
  }
}
