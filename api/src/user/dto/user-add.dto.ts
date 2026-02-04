import { IsAlpha, IsEmail, IsNotEmpty } from "class-validator";

export class userAddDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsAlpha()
    @IsNotEmpty()
    name: string
}