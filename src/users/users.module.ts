import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Shift } from "./shifts/Shift";
import { ShiftsController } from "./shifts/shifts.controller";
import { User } from "./User";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
    imports:[TypeOrmModule.forFeature([User, Shift])],
    controllers:[UsersController, ShiftsController],
    providers:[UsersService],
    exports:[UsersService]
})
export class UsersModule{}
