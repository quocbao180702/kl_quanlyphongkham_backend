import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { Users } from "./schemas/user.schema";
import { Query } from "@nestjs/graphql";
import { UsersService } from "./users.service"
import { NewUserInput } from "./dto/new-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";


@Resolver(() => Users)
export class UsersResolver {

    constructor(private readonly userService: UsersService) { }

    @Query(() => [Users])
    @UseGuards(JwtAuthGuard)
    async getAllUsers(): Promise<Users[]> {
        return await this.userService.getAllUsers();
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
    async updateUser(@Args('_id') _id: string, @Args('input') input: UpdateUserInput): Promise<Users> {
        const update = await this.userService.updateUser(_id, input);
        if (!update) {
            throw new Error(`User with ID ${_id} not found.`);
        }
        return update;
    }

    @Mutation(() => Boolean)
    async deleteUser(@Args('_id') _id: string): Promise<boolean> {
        await this.userService.deleteUser(_id);
        return true;
    }




}