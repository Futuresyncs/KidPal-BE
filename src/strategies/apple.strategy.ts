import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {Strategy } from 'passport-apple';

@Injectable()
export class AppleAuthStrategy extends PassportStrategy(Strategy, 'apple') {
  constructor() {
    super({
      clientID: process.env.APPLE_CLIENT_ID,
      teamID: process.env.APPLE_TEAM_ID,
      keyID: process.env.APPLE_KEY_ID,
      key: process.env.APPLE_PRIVATE_KEY, // Ensure key is properly formatted
      callbackURL: process.env.APPLE_CALLBACK_URL,
      scope: ['email', 'name'],
    });
  }

  async validate(accessToken: string, refreshToken: string, decodedIdToken: any, profile: any) {
    return {
      id: decodedIdToken.sub,
      email: decodedIdToken.email || null,
      name: decodedIdToken.name || null, // Name only appears on first login
    };
  }
}
