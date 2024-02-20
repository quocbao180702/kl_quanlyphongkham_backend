import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/createLogin.input';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlAuthGuard } from './guards/local-auth.guard';
import { response } from 'express';
import { retry } from 'rxjs';

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) { }

    @Mutation(() => LoginResponse)
    @UseGuards(GqlAuthGuard)
    login(@Args('loginUserInput') loginUserInput: LoginUserInput, @Context() context) {
        return this.authService.login(context.user);
    }

    /* @Mutation(() => LoginResponse)
    async refreshToken(@Args('refreshToken') refreshToken: string) {
        return await this.authService.refreshTokens();
    } */

    @Mutation()
    async logout(): Promise<boolean> {
        return this.authService.logout();
    }

}
