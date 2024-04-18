import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/createLogin.input';
import { Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlAuthGuard } from './guards/local-auth.guard';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { BacSi } from 'src/bacsi/entities/bacsi.entity';
import { BacsiService } from 'src/bacsi/bacsi.service';
import { NhanVien } from 'src/nhanvien/entities/nhanvien.entity';
import { BenhNhan } from 'src/benhnhan/entities/benhnhan.entity';
import { BenhnhanService } from 'src/benhnhan/benhnhan.service';
import { NhanvienService } from 'src/nhanvien/nhanvien.service';
import { OnlyUserUnion } from 'src/types/unions.types';
import { Users } from 'src/users/entities/user.entity';
import { GoogleOauthGuard } from './guards/google-oauth.guard';

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService,
        private userService: UsersService,
        private benhnhanService: BenhnhanService,
        private bacsiService: BacsiService,
        private nhanvienService: NhanvienService) { }

    @Mutation(() => LoginResponse)
    @UseGuards(GqlAuthGuard)
    async login(@Args('loginUserInput') loginUserInput: LoginUserInput, @Context() ctx) {
        if (!ctx.user) {
            throw new Error('Request not found in context');
        }

        const loginResponse = await this.authService.login(ctx.user);

        if (loginResponse?.access_token) {
            const refresh_token = await this.authService.createRefreshToken(ctx.user)

            ctx.res.cookie('refresh_token', refresh_token, {
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                path: '/refresh_token'
            });
        }
        return {
            access_token: loginResponse.access_token,
            success: true,
            code: 200
        };
    }

    /* @Mutation()
    async loginwithGoogle() {
        const response = this.authService.getUrlGoogle();
        return response;
    } */

    @Mutation(() => LoginResponse)
    @UseGuards(GoogleOauthGuard)
    async loginwithGoogleCallback(@Context() ctx) {
        try {
            const token = await this.authService.loginwithGoogle(ctx?.user);
            return { access_token: token.access_token };
        } catch (err) {
            console.error("Error logging in with Google:", err);
            throw new Error("Internal Server Error");
        }
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => OnlyUserUnion, { nullable: true })
    async onlyUser(@Context() ctx): Promise<typeof OnlyUserUnion | null> {
        
        try {
            switch (ctx.req.user?.roles) {
                case "USER":
                    return await this.benhnhanService.getBenhNhanbyUserId(ctx.req.user?.user?._id);
                case "DOCTOR":
                    return await this.bacsiService.getBacSibyUserId(ctx.req.user?.user?._id);
                case "STAFF":
                    return await this.nhanvienService.getNhanVienbyUserId(ctx.req.user?.user?._id);
                case "ADMIN":
                    return await this.userService.getUserByUsername(ctx.req.user?.username);
                default:
                    return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }


    @Mutation(() => Boolean, { nullable: true })
    async logout(@Context('res') res: Response): Promise<boolean> {
        res.clearCookie('refresh_token', {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/refresh_token'
        });
        return true;
    }


}
