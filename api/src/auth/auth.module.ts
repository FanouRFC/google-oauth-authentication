import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategy/google.strategy';
import { FacebookStrategy } from './strategy/facebook.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, FacebookStrategy]
})
export class AuthModule {}
