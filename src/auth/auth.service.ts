import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { getMongoManager, getMongoRepository } from 'typeorm';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,    
    ){}

    async login(payload: any): Promise<any> {
        let show = {};
        const manager = getMongoManager();
        try {

            const user = await manager.findOne(User, { userId :payload.userId});
            const hash = await bcrypt.hash(payload.password, user.salt);

            if(hash !== user.password){
                return {show:{type:'error',message:'Incorrect password'}}
            }
            if (user) {
                const payload: JwtPayload = { userId: user.userId };
                const accessToken = await this.jwtService.sign(payload);

                const data = {
                    "accessToken": accessToken,
                    "user": user
                }
                return data;
            } else {
                show = {
                    type: 'error',
                    message: 'User does not exists'
                }
                return { show }
            }
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }

    async register(payload: any): Promise<any> {
        let show = {};
        const manager = getMongoRepository(User);
        const userId = payload.userId;
        try {
            if (userId === null || userId === undefined) {
                show = {
                    type: 'error',
                    message: 'Please enter userId'
                }
                return { show };
            }

            let user = await manager.findOne({ userId : userId });
            if (user) {
                show = {
                    type: 'error',
                    message: "User Id Already Exists"
                }
                return { show };

            }else{
                user = await new User();
                user.salt = await bcrypt.genSalt();        
                user.password = await this.hashPassword(payload.password, user.salt);
                user.userId = payload.userId
                const UserCreated = await manager.save(user);
                return {
                    "msg" : "User created",
                    UserCreated
                }
            }
           
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string>{
        return bcrypt.hash(password, salt);
    }
}
