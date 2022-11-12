import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from './user';




@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>){}

    async createUser(item){
        const {username,password} = item
        const user = await this.userRepository.findOneBy({email:username})       
        if (user) {
            return {message: "already exists"}
        }
        const newUser = await this.userRepository.save({email:username,password})
        delete newUser.password
        return {message: "created" , newUser}
    }
    
    async getAllUsers(){
        const allUsers = await this.userRepository.find({
            relations: {
                shift: true,
            },
        })
        return {message:"all users" , allUsers}
    }

    async getUserById(id){
        const users = this.userRepository.find({
            relations: {
                shift: true,
            },
        });
        return (await users).filter(s=>s.id == id)[0];
        // return typeof userId
    }


    async getByEmail(email:string){
        return this.userRepository.findOneBy({email});
    }

    async updateUser(id , item){
        const getUser = await await this.userRepository.findOneBy({id: Number(id)})
        if (!getUser) {
            return {message : "id yok"}
        }
            await this.userRepository.save({...item , id: getUser.id})
            return {message : "updated"}
    }


}