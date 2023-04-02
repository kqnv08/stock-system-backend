import { ForbiddenException, Inject, Injectable } from "@nestjs/common"
import { ConfigType } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { Strategy, VerifyCallback, Profile } from "passport-google-oauth20"
import config from 'src/config/config.config';
@Injectable()

export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(config.KEY) configService: ConfigType<typeof config>
  ) {
    super({
      clientID: configService.auth.google.clientID,
      clientSecret: configService.auth.google.clientSecret,
      callbackURL: configService.auth.google.callbackURL,
      scope: ['email', 'profile']
    })
  }
  async validate(accesToken: string, refreshToken: string, profile: Profile, done: VerifyCallback): Promise<any> {
    const { name, emails, photos } = profile
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accesToken
    }
    done(null, user)
  }
}
