import { UserRepository } from './user.repository';
import { PasswordEncrypterService } from './../../../utils/encryption/password-encrypter.service';
import { User } from './user.entity';
import { Component } from "@nestjs/common";

@Component()
export class UserManager {
  constructor(private userRepository: UserRepository, private passwordEncrypter: PasswordEncrypterService) {}

  async getAll() {
    const users = await this.userRepository.findAll();
    return users.map((user: User) => {
      delete user.password;
      return user;
    });
  }

  async getOne(userId: number) {
    const user = await this.userRepository.findOne(userId);
    delete user.password;
    
    return user;
  }

  async createUser(data: any) {
    const user = new User();
    user.email = data.email;
    user.username = data.username;
    user.password = await this.passwordEncrypter.hash(data.password);
    user.isActive = true;
    return await this.userRepository.create(user);
  }

  async updateUser(data: any) {
    const user = await this.userRepository.findOne(data.id);
    this.userRepository.update(user);
  }

  async removeUser(userId: number) {
    return await this.userRepository.remove(await this.userRepository.findOne(userId));
  }
}