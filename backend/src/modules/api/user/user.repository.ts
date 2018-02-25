import { PasswordEncrypterService } from './../../../utils/encryption/password-encrypter.service';
import { Component } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async findAll(): Promise<User[]> {
    return await this.find();
  }

  async findByUsername(username: string): Promise<User> {
    return await this.createQueryBuilder()
      .select()
      .where('username = :username', {username})
      .getOne();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.createQueryBuilder()
    .select()
    .where('email = :email', {email})
    .getOne();
  }

  async removeById(userId: number) {
    await this.remove(await this.findOneById(userId));
  }

  async update(user: User) {
    await this.save(user);
  }
}