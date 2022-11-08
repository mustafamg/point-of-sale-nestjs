import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shift } from './Shift';

@Injectable()
export class ShiftsService {
    constructor(@InjectRepository(Shift) private shiftRepository: Repository<Shift>){}  

    async createShift(item){
        const {name , start_time , end_time} = item
        let shiftsBeforeCreate = await this.shiftRepository.find()
        await this.shiftRepository.save({name , start_time , end_time})
        let shiftsAfterCreate = await this.shiftRepository.find()       
        if (shiftsAfterCreate.length > shiftsBeforeCreate.length) {
            return {message: "created"}
        }
        else {
            return {message: "failed"}
        }
    }

    async updateShift(id,item) {
        const {name , start_time , end_time} = item
        const checkShift = await this.shiftRepository.findOneBy({id})
        if (checkShift) {
            await this.shiftRepository.save({name , start_time , end_time, id:checkShift.id})
            return {message: "updated"}
        }
        else {
            return {message: "id yok"}
        }
    }

    async deleteShift(id) {
        const checkShift = await this.shiftRepository.findOneBy({id})
        if (checkShift) {
            await this.shiftRepository.delete({id})
            return {message: "deleted"}
        }
        else {
            return {message: "id yok"}
        }
    }


    async getAll() {
        return await this.shiftRepository.find()
    }

    
}
