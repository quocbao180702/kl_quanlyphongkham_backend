import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginUserInput } from './dto/createLogin.input';
import { access } from 'fs';
import { Users } from 'src/users/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { Context } from '@nestjs/graphql';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.getUserByUsername(username);
        if (user && user.password === password) {
            const { password, ...result } = user;
            return user
        }

        return null;
    }

    async login(user: Users) {

        const payload = {
            username: user.username,
            sub: {
                userId: user.userId,
            },
        };

        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
            user
        }
    };

    /* async refreshTokens() {

    } */

    async logout(){
        /* this.cookieService.delete('authToken'); */
        return true
    }

}
