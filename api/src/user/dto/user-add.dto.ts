import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class userAddDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsOptional()
    picture: string

    @IsString()
    @IsNotEmpty()
    provider: string
}