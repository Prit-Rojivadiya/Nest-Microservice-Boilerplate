import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { RpcException } from '@nestjs/microservices';
// import { validateSchema } from 'src/utils/validations/schemaValidation';
import { validateSchema } from '../utils/validations/schemaValidation';
import { CreateUserSchema } from './dto/create-user.dto';
import { UpdateUserSchema } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  checkMicroServiceHealth(payload: any) {
    return payload?.message || 'User micro service working';
  }

  async create(createUserDto) {
    try {
      validateSchema(CreateUserSchema, createUserDto);
      const createdUser = new this.userModel(createUserDto);
      return await createdUser.save();
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async findAll() {
    try {
      return await this.userModel.find().exec();
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getUserById(userId) {
    try {
      const user = await this.userModel.findById(userId).exec();
      if (!user?._id) {
        throw new UnprocessableEntityException('User not found');
      }
      return user;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async updateUser(userId: string, data: any) {
    try {
      validateSchema(UpdateUserSchema, data);
      const updatedUser = await this.userModel.findByIdAndUpdate(userId, data, {
        new: true,
      });
      if (!updatedUser?._id) {
        throw new UnprocessableEntityException('User not found');
      }
      return updatedUser;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async deleteUser(userId) {
    try {
      const user = await this.getUserById(userId);
      if (user?.isDeleted) {
        throw new UnprocessableEntityException('User already deleted');
      }

      const updatedUser = await this.userModel.findByIdAndUpdate(
        userId,
        { isDeleted: true, isActive: false },
        { new: true },
      );
      if (!updatedUser?._id) {
        throw new UnprocessableEntityException('User not found');
      }
      return updatedUser;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
