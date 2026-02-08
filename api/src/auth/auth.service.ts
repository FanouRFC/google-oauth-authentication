import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private UserService : UserService){}
    async googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
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
  if(!EmailExist){
    await this.UserService.add(data)
     return {
       message: 'User information from google',
       user: req.user,
     };
  }
  else{
    return {
       message: 'COMPTE DEJA EXISTANT AVEC LES RENSEIGNEMENTS SUIVANTS !!! ',
       user: req.user,
     };
  }
  }

  async facebookLogin(req){
    if(!req.user){
        return "No user found"
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
  if(!EmailExist){
    await this.UserService.add(data)
     return {
       message: 'User information from google',
       user: req.user,
     };
  }
  else{
    return {
       message: 'COMPTE DEJA EXISTANT AVEC LES RENSEIGNEMENTS SUIVANTS !!! ',
       user: req.user,
     };
  }
  }
}
