import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { Users } from "./entities/user.entity";
import { Query } from "@nestjs/graphql";
import { UsersService } from "./users.service"
import { NewUserInput } from "./dto/new-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { LinkImage } from "src/types/LinkImage.types";
import { FetchUsersArgs } from "./dto/fetch_user.input";


@Resolver(() => Users)
export class UsersResolver {

    constructor(private readonly userService: UsersService) { }


    @Query(() => Number, {name: 'countUser'})
    async getCount(): Promise<number>{
        return this.userService.getCount();
    }

    @Query(() => [Users])
    @UseGuards(JwtAuthGuard)
    async getAllUsers(@Args('fetchUsersArgs') fetchUsersArgs: FetchUsersArgs): Promise<Users[]> {
        return await this.userService.getAllUsers(fetchUsersArgs);
    }

    @Query(() => Users)
    async getUserByUsername(@Args('username') username: string): Promise<Users>{
        return await this.userService.getUserByUsername(username);
    }
    
    @Query(() => Users)
    async getUserByEmail(@Args('email') email: string): Promise<Users>{
        return await this.userService.getUserByEmail(email);
    }


    @Query(() => Users)
    async getUserById(@Args('_id') _id: string): Promise<Users>{
        return await this.userService.getUserById(_id);
    }

    @Mutation(() => Users)
    async createUser(@Args('newUserInput') newUserInput: NewUserInput): Promise<Users> {
        const user = await this.userService.createUser(newUserInput);
        return user;
    }

    @Mutation(() => Users)
    async updateUser(@Args('input') input: UpdateUserInput): Promise<Users> {
        const update = await this.userService.updateUser(input);
        if (!update) {
            throw new Error(`User with ID ${input.id} not found.`);
        }
        return update;
    }

    @Mutation(() => Users)
    async xulyKhoa(@Args('id') id: string): Promise<Users>{
        return this.userService.xuly_Khoa(id);
    }

    @Mutation(() => Boolean)
    async deleteUser(@Args('_id') _id: string): Promise<boolean> {
        await this.userService.deleteUser(_id);
        return true;
    }



}