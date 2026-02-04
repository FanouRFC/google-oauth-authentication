import { IsAlpha, IsEmail, IsEmpty, IsOptional} from "class-validator";

export class userUpdateDTO {
    @IsEmail()
    @IsOptional()
    email: string

    @IsAlpha()
    @IsOptional()
    name: string
}