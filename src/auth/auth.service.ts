import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginUserInput } from './dto/createLogin.input';
import { access } from 'fs';
import { JwtService } from '@nestjs/jwt';
import { Context } from '@nestjs/graphql';
import { comparePasswords } from 'src/HashPassword/hash';
import { Users } from 'src/users/entities/user.entity';
import { TypeImage, UserRole } from 'src/types/Users.types';
import { LinkImage } from 'src/types/LinkImage.types';

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

    async loginwithGoogle(user: any) {
        const emailParts = user.email.split('@');
        const username = emailParts[0];
        let existingUser = await this.userService.getUserByUsername(username);

        if (!existingUser) {
            existingUser = await this.userService.createUserGoogle(
                username,
                user.email,
                {
                    url: user.picture,
                    fileName: `${user.email}_phongkhamdakhoa_google`,
                    type: TypeImage.LINK
                }
            );
        }

        const payload = {
            username: existingUser.username,
            sub: {
                _id: existingUser._id,
            },
            roles: existingUser.role
        }

        return {
            access_token: this.jwtService.sign(payload)
        }
    }


    getUrlGoogle(){
        const url = process?.env?.CALLBACK_URL
        return url;
    }

    async decodeToken(token: string) {

    }

    async createRefreshToken(user: Users) {

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
        }
    };


}
