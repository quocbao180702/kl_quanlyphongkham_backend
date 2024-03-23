import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginUserInput } from './dto/createLogin.input';
import { access } from 'fs';
import { JwtService } from '@nestjs/jwt';
import { Context } from '@nestjs/graphql';
import { comparePasswords } from 'src/HashPassword/hash';
import { Users } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.getUserByUsername(username);
        if (user && comparePasswords(user.password, password)) {
            const { password, ...result } = user;
            return user
        }

        return null;
    }

    async decodeToken(token: string){
        
    }

    async createRefreshToken(user: Users){

        const payload = {
            username: user.username,
            sub: {
                _id: user._id,
            },
            roles: user?.role
        };
        return {
            refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' })
        }
    }


    async login(user: Users) {

        const payload = {
            username: user.username,
            sub: {
                _id: user._id,
            },
            roles: user?.role
        };

        return {
            access_token: this.jwtService.sign(payload),
            /* refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }), */
            /* user */
        }
    };


}
