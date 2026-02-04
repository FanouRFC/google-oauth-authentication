import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import type {Request} from "express"
import { userAddDTO } from './dto/user-add.dto';
import { userUpdateDTO } from './dto/user-update.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}
    @Get("")
    async getAllUsers(){
        return await this.userService.getAll()
    }

    @Get(":id")
    async getOneUser(@Param("id", ParseIntPipe) id){
        return await this.userService.getOne(id) 
    }

    @Post("")
    async addOneUser(@Body(ValidationPipe) body : userAddDTO){
        return await this.userService.add(body)
    }

    @Delete(":id")
    async deleteUser(@Param("id", ParseIntPipe) id){
        return await this.userService.delete(id)
    }

    @Patch(":id")
    async updateUser(@Param("id", ParseIntPipe) id, @Body(ValidationPipe) body: userUpdateDTO){
        return await this.userService.update(id, body)
    }
}
