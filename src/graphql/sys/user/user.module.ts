import { Module, forwardRef } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { UserService } from "./user.service"
import { UserResolver } from "./user.resolver"

import { User } from "./entities/user.entity"
import { UserRegisterTokenModule } from "../user-register-token/user-register-token.module"
import { JwtModule } from "@nestjs/jwt"
import config from 'src/config/config.config';
import { ConfigType } from "@nestjs/config"


@Module({
  imports: [TypeOrmModule.forFeature([User]),
  forwardRef(() => UserRegisterTokenModule),
  JwtModule.registerAsync({
    inject: [config.KEY],
    useFactory: (configService: ConfigType<typeof config>) => {
      return {
        secret: configService.jwtSecret,
        signOptions: {
          expiresIn: process.env.TOKEN_EXPIRATION ?? "1d",
        },
      }
    }
  })
  ],
  providers: [UserResolver, UserService],
  exports: [UserResolver, UserService],
})
export class UserModule { }
