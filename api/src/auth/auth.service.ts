import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private UserService : UserService, private jwtService : JwtService){}
    async googleLogin(req) {
    if (!req.user) {
      return 0
    }

    const {firstName, lastName, picture, email, gender, birthday} = req.user
    var data = {
      email,
      name: firstName + " " + lastName,
      picture,
      gender,
      birthday,
      provider: "google"
    }
  
    var EmailExist = await this.UserService.checkEmailExist(email, "google")
    if(EmailExist == 0){
      const addedUser = await this.UserService.add(data)
      return addedUser.id
    }
    else{
      return EmailExist
    }
  }

  async facebookLogin(req){
    if(!req.user){
        return 0
    }
  
    const {profile} = req.user
    const {displayName} = profile
    const picture = profile.photos[0].value
    const email = profile.emails[0].value

    var data = {
      email,
      name: displayName,
      picture,
      gender: profile.gender,
      birthday: profile?._json?.birthday,
      provider: "facebook"
    }

    var EmailExist = await this.UserService.checkEmailExist(email, "facebook")
    if(EmailExist==0){
      const addedUser = await this.UserService.add(data)
      const user = await this.UserService.getId(addedUser.id)
      return user?.id
    }
    else{
      return EmailExist //contient id 
    }
  }


  async genererJWTToken(id: number){
    return this.jwtService.signAsync({id})
  }
}
