import { LoginValidationPipe } from './pipe/login-validation.pipe';
import { UserRepository } from './../api/user/user.repository';
import { Controller, Post, HttpStatus, HttpCode, Get, Req, Inject, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PasswordEncrypterService } from '../../utils/encryption/password-encrypter.service';
import { User } from '../api/user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService, 
    private readonly userRepository: UserRepository,
    private readonly passwordEncrypter: PasswordEncrypterService
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body(new LoginValidationPipe()) credentials) {
    const user = await this.fetchUser(credentials);
    
    if (await this.passwordEncrypter.verify(credentials.password, user.password)) {
      const token = await this.authService.createToken(user);
      delete user.password;
      return { token, me: user};
    }
    
    throw new BadRequestException('Incorrect password');
  }

  private fetchUser(credentials: any) {
    if ('email' in credentials) {
      return this.userRepository.findByEmail(credentials.email);
    }
    if ('username' in credentials) {
      return this.userRepository.findByUsername(credentials.username);
    }
  }
}