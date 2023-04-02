import { Controller, Post, Req, UseGuards, Get, HttpStatus, Res, Redirect } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RoleEnum } from "src/core/enums/role.enum";
import { Roles } from "../decorators/role.decorator";
import { RoleGuard } from "../guards/roles.guard";
import { AuthService } from "../services/auth.service";
import { User } from "src/graphql/sys/user/entities/user.entity";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @UseGuards(AuthGuard('local'), RoleGuard)
  @Roles(RoleEnum.INVESTOR)
  login(@Req() req): { access_token: string, user: User } {
    return this.authService.generateJWT(req.user)
  }

  @Post('login-admin')
  @UseGuards(AuthGuard('local'), RoleGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN)
  loginAdmin(@Req() req): { access_token: string, user: User } {
    return this.authService.generateJWT(req.user)
  }

  @Get('google')
  @UseGuards(AuthGuard('google'), RoleGuard)
  async googleAuth(@Req() req) {
    return HttpStatus.OK
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'), RoleGuard)
  @Redirect("", 302)
  async googleAuthRedirect(@Req() req) {
    const result = await this.authService.socialNetworkGenericLogin(req)
    if (result.access_token == "") {
      return { url: `${process.env.FRONT_WEB_BASE_URL}/login?loginError=true&email=${result.user?.email}` }
    }
    return { url: `${process.env.FRONT_WEB_BASE_URL}/${process.env.SOCIAL_NETWORK_CALLBACK_FRONT}?token=${result.access_token}` }
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'), RoleGuard)
  async facebookAuth(@Req() req) {
    return HttpStatus.OK
  }

  @Get('facebook/redirect')
  @UseGuards(AuthGuard('facebook'), RoleGuard)
  @Redirect("", 302)
  async facebookAuthRedirect(@Req() req) {
    const result = await this.authService.socialNetworkGenericLogin(req)
    if (result.access_token == "") {
      return { url: `${process.env.FRONT_WEB_BASE_URL}/login?loginError=true&email=${result.user?.email}` }
    }
    return { url: `${process.env.FRONT_WEB_BASE_URL}/${process.env.SOCIAL_NETWORK_CALLBACK_FRONT}?token=${result.access_token}` }

  }
}
