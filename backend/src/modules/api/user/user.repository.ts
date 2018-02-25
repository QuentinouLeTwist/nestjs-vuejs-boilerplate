import { PasswordEncrypterService } from './../../../utils/encryption/password-encrypter.service';
import { Component } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Component()
export class UserRepository {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneById(id);
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userRepository
      .createQueryBuilder()
      .select()
      .where('username = :username', {username})
      .getOne();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository
    .createQueryBuilder()
    .select()
    .where('email = :email', {email})
    .getOne();
  }

  async removeById(userId: number) {
    await this.userRepository.remove(await this.findOne(userId));
  }

  async create(user: User) {
    await this.userRepository.save(user);
  }

  async remove(user: User) {
    await this.userRepository.remove(user);
  }

  async update(user: User) {
    await this.userRepository.save(user);
  }
}