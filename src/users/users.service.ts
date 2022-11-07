import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
//import { User } from "./User";

@Injectable()
export class UsersService{

    //constructor(@InjectRepository(User)
    //private usersRepository : Repository<User>){}
    private readonly users = [
        {
          userId: 1,
          username: 'Mustafa',
          password: 'darsh',
        },
        {
          userId: 2,
          username: 'Ali',
          password: 'march',
        },
      ];

    async findOne(username: string): Promise<any> {
        return this.users.find(user => user.username === username);
      }
}