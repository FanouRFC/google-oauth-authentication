import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy, ExtractJwt } from "passport-jwt"

export class JWTStrategy extends PassportStrategy(Strategy){
    constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY!,
    });
  }

  validate(payload: any): unknown {
      return {
      userId: payload.id,  
    };
  }
}