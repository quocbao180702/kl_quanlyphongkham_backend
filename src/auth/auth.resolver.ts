import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/createLogin.input';
import { Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlAuthGuard } from './guards/local-auth.guard';
import { Response } from 'express';
import { retry } from 'rxjs';
import { Users } from 'src/users/entities/user.entity';

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) { }

    @Mutation(() => LoginResponse)
    @UseGuards(GqlAuthGuard)
    async login(@Args('loginUserInput') loginUserInput: LoginUserInput, @Context() ctx) {
        if (!ctx.user) {
            throw new Error('Request not found in context');
        }

        const loginResponse = await this.authService.login(ctx.user);

        // Add cookie to JWT token and send it via header
        ctx.res.cookie('refresh_token', loginResponse.refresh_token, {
            httpOnly: true,
        });

        return loginResponse;
        /* return this.authService.login(context.user); */
    }

    @Query(() => Boolean, { nullable: true })
    async logout(@Context() context) {
        return this.authService.logout(context);
    }

}
