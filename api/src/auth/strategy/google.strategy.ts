import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: 'http://localhost:3000/auth/google-redirect',
      scope: ['email', 'profile', 'https://www.googleapis.com/auth/user.birthday.read',
        'https://www.googleapis.com/auth/user.gender.read',],
    });
  }
  
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const account_id = profile.id
   
  const additionalInfo = await this.fetchAdditionalUserInfo(accessToken, account_id)
  console.log(additionalInfo);
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      birthday: additionalInfo.birthday,
      gender: additionalInfo.gender,
      accessToken,
      refreshToken,
    };
    done(null, user);
  }
  private async fetchAdditionalUserInfo(accessToken: string, account_id: string) {
    try {
      const response = await fetch(
        `https://people.googleapis.com/v1/people/${account_id}?personFields=genders,birthdays&sources=READ_SOURCE_TYPE_PROFILE`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();
      
      // Extraire birthday
      const birthday = data.birthdays[0]?.date
      const formattedBirthday = birthday 
        ? `${String(birthday.day).padStart(2, '0')}/${String(birthday.month).padStart(2, '0')}/${birthday.year}`
        : null;

      // Extraire gender
      const gender = data.genders[0]?.value

      return {
        birthday: formattedBirthday,
        gender: gender || null,
      };
    } catch (error) {
      console.error('Error fetching additional user info:', error);
      return { birthday: null, gender: null };
    }
  }
}