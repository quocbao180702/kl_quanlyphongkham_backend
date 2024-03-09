import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema, Users } from './entities/user.entity';

@Module({
    providers: [
        UsersResolver,
        UsersService,
    ],
    imports: [
        MongooseModule.forFeature([{name: Users.name, schema: UsersSchema}])
    ],
    exports: [UsersService]
})
export class UsersModule {}
