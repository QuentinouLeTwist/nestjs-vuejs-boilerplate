import { AuthModule } from './modules/auth/auth.module';
import { ApiModule } from './modules/api/api.module';
import { UserModule } from './modules/api/user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm/connection/Connection';

@Module({
  imports: [TypeOrmModule.forRoot(), ApiModule, AuthModule],
  controllers: [AppController],
  components: [],
})
export class ApplicationModule {
  constructor(private readonly connection: Connection) {}
}
