import { Injectable } from '@nestjs/common';
import { Prisma, User } from 'src/generated/prisma/client';
import { PrismaService } from 'src/prisma.service';
import {JwtService} from "@nestjs/jwt"

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService, private jwtService: JwtService){}
    async getAll(): Promise<User[]>{
        return (await this.prisma.user.findMany({orderBy: {id: 'asc'}}))
    }

    async getSome(search: string): Promise<User[] | null>{
        return this.prisma.user.findMany({where: 
            {OR: [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
            ]
            }
        }
        )
    }

    async getId(id:number): Promise<User | null>{
        return this.prisma.user.findUnique({where: {id}})
    }

    async add(userData: Prisma.UserCreateInput): Promise<User>{
        return await this.prisma.user.create({data: userData})
    }

    async addNoOuth(userData: Prisma.UserCreateInput): Promise<{user: User, token: string}>{
        const user = await this.prisma.user.create({data: userData})
        const token = await this.genererJWTToken(user.id)
        return {user, token}
    }

    async checkEmailExist(email:string, provider: string): Promise<number>{
        var data = await this.prisma.user.findFirst({where: {email, provider}})
        if(!data){
            return 0 
        }
        return data.id
    }

    async delete(id: number):Promise<User>{
        return this.prisma.user.delete({where: {id}})
    }

    async update(id: number ,userData: Prisma.UserUpdateInput): Promise<User>{
        return this.prisma.user.update({where: {id: id}, data:userData})
    }

    async genererJWTToken(id: number){
    return this.jwtService.signAsync({id})
  }
}
