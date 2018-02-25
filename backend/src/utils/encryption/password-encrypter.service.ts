import { EncryptionException } from './encryption.exception';
import { Component } from '@nestjs/common';
import { Bcrypt } from './bcrypt'

@Component()
export class PasswordEncrypterService {
  private bcrypt: Bcrypt;

  constructor() {
    this.bcrypt = new Bcrypt();
  }

  async hash(password: string, callback?: Function): Promise<string> {
    try {
      return await this.bcrypt.hash(password, callback);
    } catch (error) {
      throw new EncryptionException(error);
    }
  }
  
  async verify(password: string, encrypted: string, callback?: Function): Promise<boolean> {
    try {
      return await this.bcrypt.compare(password, encrypted, callback);
    } catch (error) {
      throw new EncryptionException(error);
    }
  }
}