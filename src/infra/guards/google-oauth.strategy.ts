import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { configDotenv } from 'dotenv';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';

configDotenv();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.CALLBACK_URL as string,
      scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar', 'openid'],
      accessType: 'offline',
      prompt: 'consent',
      includeGrantedScopes: true,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, name, emails, photos } = profile;
    const user = {
      provider: 'google',
      providerId: id,
      email: emails[0].value,
      name: `${name.givenName} ${name.familyName}`,
      picture: photos[0].value,
      accessToken,     // Include access token
      refreshToken,    // Include refresh token
    };

    done(null, user);
  }
}
