import {IsEmail, IsOptional, IsString} from "class-validator";

export class userUpdateDTO {
    @IsEmail()
    @IsOptional()
    email: string

    @IsString()
    @IsOptional()
    name: string
}