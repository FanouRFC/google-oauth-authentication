import { Injectable } from '@nestjs/common';
import { Prisma, User } from 'src/generated/prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){}
    async getAll(): Promise<User[]>{
        return (await this.prisma.user.findMany({orderBy: {id: 'asc'}}))
    }

    async getOne(id: number): Promise<User | null>{
        return this.prisma.user.findUnique({where: {id}})
    }

    async add(userData: Prisma.UserCreateInput): Promise<User>{
        return this.prisma.user.create({data: userData})
    }

    async delete(id: number):Promise<User>{
        return this.prisma.user.delete({where: {id}})
    }

    async update(id: number ,userData: Prisma.UserUpdateInput): Promise<User>{
        return this.prisma.user.update({where: {id: id}, data:userData})
    }
}
