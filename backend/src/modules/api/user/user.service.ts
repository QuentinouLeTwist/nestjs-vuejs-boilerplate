import { Entity } from 'typeorm';
import { Component, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { User } from './user.entity';
import { PasswordEncrypterService } from '../../../utils/encryption/password-encrypter.service';

@Component()
export class UserService {
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

  /*
  create(body: {}): {
    /*
    if (body.encrypted === '') {
      return await this.passwordEncrypter.hash(body.password);
    }
    return await this.passwordEncrypter.verify(body.password, body.encrypted);
  }
    */
}