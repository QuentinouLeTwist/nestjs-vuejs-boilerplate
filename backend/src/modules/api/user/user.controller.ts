import { User } from './user.entity';
import { ApiResourceInterface } from './../api-resource.interface';
import { Controller, Get, Param, Post, Delete, Patch, Req } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController implements ApiResourceInterface {
  constructor(private userService: UserService){}

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return users.map((user: User) => {
      delete user.password;
      return user;
    });
  }

  @Get(':id')
  async findOne(@Param() params) {
    const user = await this.userService.findOne(params.id);
    delete user.password;
    
    return user;
  }

  @Post()
  async create(@Req() request) {
    //return await this.userService.create(request.body);
  }

  @Patch()
  update() {
      
  }

  @Delete()
  remove() {

  }
}