import { ConfigService } from "@nestjs/config";
import { AuthGuard } from "@nestjs/passport";

export class FacebookGuard extends AuthGuard("facebook"){
    constructor(private configService: ConfigService) {
        super()
      }
}