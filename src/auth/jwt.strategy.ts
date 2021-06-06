import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { JwtPayload } from './jwt-payload.interface';
import { getConnection } from 'typeorm';
import * as config from 'config';

//const { secret } = config.get('jwt');
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "sndk",
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { userId } = payload;
        const authConnection = getConnection('default')

        const user = await authConnection.manager.findOne(User, { userId });

        if (!user) {
            throw new UnauthorizedException();
        }

        return user
    }
}