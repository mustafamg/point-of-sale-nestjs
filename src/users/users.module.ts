import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user";
import { userController } from './users.controller';
import { UserService } from "./users.service";
import { Shift } from './../shifts/Shift';


@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers:[userController],
    providers:[UserService],
    exports:[UserService]
})

export class UsersModule {}
