import { LoginValidationPipe } from './pipe/login-validation.pipe';
import { UserService } from './../api/user/user.service';
import { Controller, Post, HttpStatus, HttpCode, Get, Req, Inject, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PasswordEncrypterService } from '../../utils/encryption/password-encrypter.service';
import { User } from '../api/user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService, 
    private readonly userService: UserService,
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
      return this.userService.findByEmail(credentials.email);
    }
    if ('username' in credentials) {
      return this.userService.findByUsername(credentials.username);
    }
  }
}