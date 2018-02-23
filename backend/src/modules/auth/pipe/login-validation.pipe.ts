import { PipeTransform, Pipe, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Pipe()
export class LoginValidationPipe implements PipeTransform<any> {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!this.isUsernameValid(value) && !this.isEmailValid(value)) {
        throw new BadRequestException('Username or email not valid');
    }
    if (!this.isPasswordValid(value)) {
        throw new BadRequestException('Password not valid');
    }
    return value;
  }

  private isUsernameValid(body: any): boolean {
    return 'username' in body && body.username !== '';
  }

  private isEmailValid(body: any): boolean {
    return 'email' in body && body.email !== '';
  }

  private isPasswordValid(body: any): boolean {
    return 'password' in body && body.password !== '';
  }
}