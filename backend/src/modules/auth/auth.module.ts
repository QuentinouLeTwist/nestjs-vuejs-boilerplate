import { PasswordEncrypterService } from './../../utils/encryption/password-encrypter.service';
import { User } from './../api/user/user.entity';
import { UserRepository } from './../api/user/user.repository';
import { UserModule } from './../api/user/user.module';
import { ApiModule } from './../api/api.module';
import { AuthTokenStorage } from './auth-token-storage.service';
import * as passport from 'passport';
import {
  Module,
  NestModule,
  MiddlewaresConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './passport/jwt.strategy';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  components: [AuthService, UserRepository, PasswordEncrypterService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(passport.authenticate('jwt', { session: false }))
      .forRoutes(
        { path: '/api/*', method: RequestMethod.ALL }
      );
  }
}