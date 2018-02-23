import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PasswordEncrypterService } from '../../../utils/encryption/password-encrypter.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    components:[UserService],
})
export class UserModule {};