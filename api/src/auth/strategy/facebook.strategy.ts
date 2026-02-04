import { Injectable } from "@nestjs/common";
import {Strategy} from "passport-facebook"
import { PassportStrategy } from "@nestjs/passport";

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, "facebook"){
    
    constructor(){
        super({
            clientID: process.env.FACEBOOK_APP_ID!,
            clientSecret: process.env.FACEBOOK_APP_SECRET!,
            callbackURL: "http://localhost:3000/auth/facebook-redirect",
            profileFields: ["id", "emails", "name", "displayName"],
        })
    }
    validate(accessToken:string, refreshToken:string, profile:any): any {
        return {
            accessToken,
            refreshToken,
            profile,
        }
    }
}