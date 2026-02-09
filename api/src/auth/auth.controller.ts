import type { Response as resp } from 'express';
import { AuthService } from './auth.service';
import { FacebookGuard } from './guard/facebook-oauth.guard';
import { GoogleOAuthGuard } from './guard/google-oauth.guard';
import { Controller, Get, Request, UseGuards, Response, Body, ValidationPipe, Post } from '@nestjs/common';
import { JWTGuard } from './guard/auth-guard';
import { UserLoginDTO } from './dto/user-login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
      @Get()
      @UseGuards(GoogleOAuthGuard)
      async googleAuth(@Request() req) {}
    
      @Get('google-redirect')
      @UseGuards(GoogleOAuthGuard)
      async googleAuthRedirect(@Request() req, @Response() res : resp) {
        const resLog = await this.authService.googleLogin(req);
        const token = await this.authService.genererJWTToken(resLog)
        return res.redirect(`http://localhost:5173/auth?token=${token}`)
      }

      @Get("facebook")
      @UseGuards(FacebookGuard)
      facebookAuth() {}

      @Get('facebook-redirect')
      @UseGuards(FacebookGuard)
      async facebookAuthRedirect(@Request() req, @Response() res : resp){
        const resLog = await this.authService.facebookLogin(req)
        const token = await this.authService.genererJWTToken(resLog!)
        return res.redirect(`http://localhost:5173/auth?token=${token}`)
      }

      @Get('me')
      @UseGuards(JWTGuard)
      getInfo(@Request() req){
        return req.user
      }

      @Post('login')
      async login(@Body(ValidationPipe) body : UserLoginDTO){
        return await this.authService.simpleLogin(body)
      }
}
