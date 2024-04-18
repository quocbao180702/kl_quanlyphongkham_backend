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
import { HasRoles } from "src/auth/dto/has-roles.decorator";
import { UserRole } from "src/types/Users.types";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { RegisterInput } from "./dto/registerInput";


@Resolver(() => Users)
export class UsersResolver {

    constructor(private readonly userService: UsersService) { }


    @Query(() => Number, { name: 'countUser' })
    async getCount(): Promise<number> {
        return this.userService.getCount();
    }

    @Query(() => [Users])
    @HasRoles(UserRole.ADMIN, UserRole.STAFF)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getAllUsers(@Args('fetchUsersArgs') fetchUsersArgs: FetchUsersArgs): Promise<Users[]> {
        return await this.userService.getAllUsers(fetchUsersArgs);
    }

    @Query(() => Users, { nullable: true })
    @HasRoles(UserRole.ADMIN, UserRole.STAFF)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getUserByUsername(@Args('username') username: string): Promise<Users> {
        return await this.userService.getUserByUsername(username);
    }

    @Query(() => Users)
    @HasRoles(UserRole.ADMIN, UserRole.STAFF)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getUserByEmail(@Args('email') email: string): Promise<Users> {
        return await this.userService.getUserByEmail(email);
    }


    @Query(() => Users)
    @HasRoles(UserRole.ADMIN, UserRole.STAFF)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getUserById(@Args('_id') _id: string): Promise<Users> {
        return await this.userService.getUserById(_id);
    }

    @Mutation(() => Users)
    /* @HasRoles(UserRole.ADMIN, UserRole.STAFF)
    @UseGuards(JwtAuthGuard, RolesGuard) */
    async createUser(@Args('newUserInput') newUserInput: NewUserInput): Promise<Users> {
        const user = await this.userService.createUser(newUserInput);
        return user;
    }

    @Mutation(() => Users)
    async registerUser(@Args('registerInput') registerInput: RegisterInput): Promise<Users> {
        const user = await this.userService.registerUser(registerInput);
        return user;
    }

    @Mutation(() => Users)
    async updateTrangThaiThongTinUser(@Args('id') id: string): Promise<Users | null>{
        const user = await this.userService.updateTrangThaiThongTinUser(id);
        return user;
    }

    @Mutation(() => Users)
    @HasRoles(UserRole.ADMIN, UserRole.STAFF)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async updateUser(@Args('input') input: UpdateUserInput): Promise<Users> {
        const update = await this.userService.updateUser(input);
        if (!update) {
            throw new Error(`User with ID ${input.id} not found.`);
        }
        return update;
    }

    @Mutation(() => Users)
    @HasRoles(UserRole.ADMIN, UserRole.STAFF)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async xulyKhoa(@Args('id') id: string): Promise<Users> {
        return this.userService.xuly_Khoa(id);
    }

    @Mutation(() => Boolean)
    @HasRoles(UserRole.ADMIN, UserRole.STAFF)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async deleteUser(@Args('_id') _id: string): Promise<boolean> {
        await this.userService.deleteUser(_id);
        return true;
    }


}