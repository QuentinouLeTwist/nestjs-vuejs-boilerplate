import { UserManager } from './user.manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { PasswordEncrypterService } from '../../../utils/encryption/password-encrypter.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    components:[UserRepository, UserManager, PasswordEncrypterService],
})
export class UserModule {};