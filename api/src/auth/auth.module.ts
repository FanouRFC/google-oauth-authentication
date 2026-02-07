import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategy/google.strategy';
import { FacebookStrategy } from './strategy/facebook.strategy';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[UserModule,],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, FacebookStrategy]
})
export class AuthModule {}
