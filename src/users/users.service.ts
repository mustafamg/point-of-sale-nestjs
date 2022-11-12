import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./User";

@Injectable()
export class UsersService{

    constructor(@InjectRepository(User)
    private usersRepository : Repository<User>){}

    async findUserByEmail(email: string): Promise<any> {
        return this.usersRepository.findOneBy({email});
      }
}