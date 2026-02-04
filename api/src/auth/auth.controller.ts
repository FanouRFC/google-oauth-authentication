import { AuthService } from './auth.service';
import { FacebookGuard } from './guard/facebook-oauth.guard';
import { GoogleOAuthGuard } from './guard/google-oauth.guard';
import { Controller, Get, Request, UseGuards } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(private readonly appService: AuthService) {}
    
      @Get()
      @UseGuards(GoogleOAuthGuard)
      async googleAuth(@Request() req) {}
    
      @Get('google-redirect')
      @UseGuards(GoogleOAuthGuard)
      googleAuthRedirect(@Request() req) {
        return this.appService.googleLogin(req);
      }

      @Get("facebook")
      @UseGuards(FacebookGuard)
      facebookAuth() {}

      @Get('facebook-redirect')
      @UseGuards(FacebookGuard)
      facebookAuthRedirect(@Request() req){
        return this.appService.facebookLogin(req)
      }
}
