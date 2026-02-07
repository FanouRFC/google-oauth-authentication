import { Injectable } from '@nestjs/common';
import { Prisma, User } from 'src/generated/prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){}
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

    async add(userData: Prisma.UserCreateInput): Promise<User>{
        return this.prisma.user.create({data: userData})
    }

    async checkEmailExist(email:string): Promise<boolean>{
        var data = await this.prisma.user.findUnique({where: {email}})
        console.log(data)
        if(!data){
            return false 
        }
        return true
    }

    async delete(id: number):Promise<User>{
        return this.prisma.user.delete({where: {id}})
    }

    async update(id: number ,userData: Prisma.UserUpdateInput): Promise<User>{
        return this.prisma.user.update({where: {id: id}, data:userData})
    }
}
