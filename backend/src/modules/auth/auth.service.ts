import { User } from './../api/user/user.entity';
import { AuthTokenStorage } from './auth-token-storage.service';
import * as jwt from 'jsonwebtoken';
import { Component } from '@nestjs/common';

@Component()
export class AuthService {
  async createToken(user: User) {
    const expiresIn = 60 * 60, secretOrKey = 'theSecretKeyShouldBeInEnv';
    const token = jwt.sign({ id: user.id, logged_time: Math.floor(new Date().getTime() / 1000) }, secretOrKey, { expiresIn });
    return {
      expires_in: expiresIn,
      access_token: token,
    };
  }

  async validateUser(signedUser): Promise<boolean> {
    // put some validation logic here
    // for example query user by id / email / username
    return true;
  }
}