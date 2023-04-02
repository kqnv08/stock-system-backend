import { Module } from '@nestjs/common';
import { UserRegisterTokenService } from './user-register-token.service';
import { UserRegisterTokenResolver } from './user-register-token.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRegisterToken } from './entities/user-register-token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserRegisterToken])],
  providers: [UserRegisterTokenService, UserRegisterTokenResolver],
  exports: [UserRegisterTokenService]
})
export class UserRegisterTokenModule { }
