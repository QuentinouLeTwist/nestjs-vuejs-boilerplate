import { PasswordEncrypterService } from './../../../utils/encryption/password-encrypter.service';
import { User } from './user.entity';
import { ApiResourceInterface } from './../api-resource.interface';
import { Controller, Get, Param, Post, Delete, Patch, Req, Body, BadRequestException } from '@nestjs/common';
import { UserManager } from './user.manager';

@Controller('api/user')
export class UserController implements ApiResourceInterface {
  constructor(private userManager: UserManager){}

  @Get()
  async getAll() {
    return await this.userManager.getAll();
  }

  @Get(':id')
  async getOne(@Param() params) {
    return await this.userManager.getOne(params.id);
  }

  @Post()
  async create(@Body() body) {
    try {
      return this.userManager.createUser(body);
    } catch (error) {
      if ('name' in error && error.name === 'QueryFailedError') {
        throw new BadRequestException('Resource cannot be created');
      }

      throw new BadRequestException(error);
    }
  }

  @Patch(':id')
  async update(@Body() body) {
    try {
      return await this.userManager.updateUser(body);
    } catch (error) {
      if ('name' in error && error.name === 'QueryFailedError') {
        throw new BadRequestException('Resource cannot be updated');
      }

      throw new BadRequestException(error);
    }
  }

  @Delete(':id')
  async remove(@Param() params) {
    try {
      return await this.userManager.removeUser(params.id);
    } catch (error) {
      if ('name' in error && error.name === 'QueryFailedError') {
        throw new BadRequestException('Resource cannot be removed');
      }

      throw new BadRequestException(error);
    }
  }
}