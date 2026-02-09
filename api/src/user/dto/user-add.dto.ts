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
    @IsOptional()
    gender: string

    @IsString()
    @IsOptional()
    birthday: string

    @IsString()
    @IsOptional()
    provider: string

    @IsString()
    @IsOptional()
    password: string
}