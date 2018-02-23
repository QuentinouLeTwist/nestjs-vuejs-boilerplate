import { User } from '../api/user/user.entity';
import { Component } from '@nestjs/common';
import { Collection } from 'lokijs';

@Component()
export class AuthTokenStorage {
  private tokens: Collection;
  constructor() {
    this.tokens = new Collection('access_tokens');
  }

  addToken(user: User, token: string) {
    this.tokens.insert({ username: user.username, token: token});
  }
}