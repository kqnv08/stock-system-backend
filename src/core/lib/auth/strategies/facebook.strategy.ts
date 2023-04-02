import { Inject, Injectable } from "@nestjs/common"
import { ConfigType } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { Strategy, VerifyCallback, Profile } from "passport-facebook"
import config from 'src/config/config.config';
@Injectable()

export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(
    @Inject(config.KEY) configService: ConfigType<typeof config>
  ) {
    super({
      clientID: configService.auth.facebook.clientID,
      clientSecret: configService.auth.facebook.clientSecret,
      callbackURL: configService.auth.facebook.callbackURL,
      profileFields: ['name', 'photos', "emails"],
      scope: ["email"]
    })
  }
  async validate(accesToken: string, refreshToken: string, profile: Profile, done: VerifyCallback): Promise<any> {

    const { name, emails, photos } = profile
    const user = {
      email: emails?.length ? emails[0]?.value : "",
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos?.length ? photos[0].value : "",
      accesToken
    }
    done(null, user)
  }
}
