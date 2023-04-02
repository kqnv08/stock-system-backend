import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

import { User } from "src/graphql/sys/user/entities/user.entity";
import { UserService } from "src/graphql/sys/user/user.service";
import { PayloadTokenInterface } from "../interfaces/token.interface";
import { RoleEnum } from "src/core/enums/role.enum";

type loginResponseType = { user?: User | any, access_token?: string }

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  async validateUser(email: string, password: string) {
    const user: User = await this.userService.findByEmail(email)
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password)
      if (isMatch) {
        const role = await user.role
        const { password, ...rta } = user
        return { ...rta, role }
      }
    }
    return null
  }

  generateJWT(user: User): { access_token: string, user: User } {
    const payload: PayloadTokenInterface = { roleId: user.roleId, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload),
      user,
    }

  }

  async socialNetworkGenericLogin(req: any): Promise<loginResponseType> {
    try {

      const email = req?.user?.email
      if (!email) {
        return { access_token: "" }
      }

      let user: User = await this.userService.findByEmail(email)

      if (!user) {
        user = await this.userService.create({ password: "", email: email, roleId: RoleEnum.INVESTOR, active: true })
      } else {
        if (!user.enabled) {
          return { access_token: "", user }
        }
      }
      const { password, ...userResponse } = user

      const response = this.generateJWT(user)
      return {
        access_token: response.access_token,
        user: userResponse as User
      }


    } catch (error) {
      console.log(error)
      return { access_token: "" }
    }

  }
}
