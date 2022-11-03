import { Controller, Get , Post , Patch , Body , Param , Delete } from "@nestjs/common";
import { ShiftsService } from './shifts.service';
import { Shift } from './Shift';



@Controller('shifts')
export class ShiftsController {
    constructor(private shiftsService: ShiftsService){}

    @Post()
    createShift(@Body() item:Shift){
        return this.shiftsService.createShift(item)
    }
    
    @Patch(':id')
    updateShift(@Param() param ,@Body() item:Shift){
        return this.shiftsService.updateShift(param.id,item)
    }

    @Delete()
    deleteShift(@Body() id){
        return this.shiftsService.deleteShift(id.id)
    }

    @Get()
    getAll(){
        return this.shiftsService.getAll();
    }
}

