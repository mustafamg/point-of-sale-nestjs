import { Controller, Get , Post , Patch , Body , Param , Delete, UseGuards } from "@nestjs/common";
import { ShiftsService } from './shifts.service';
import { Shift } from './Shift';
import { AuthGuard } from "@nestjs/passport";


@UseGuards(AuthGuard('jwt'))
@Controller('shifts')
export class ShiftsController {
    constructor(private shiftsService: ShiftsService){}

    @Post()
    createShift(@Body() item:Shift){
        return this.shiftsService.createShift(item)
    }
    
    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    updateShift(@Param() param ,@Body() item:Shift){
        return this.shiftsService.updateShift(param.id,item)
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete()
    deleteShift(@Body() id){
        return this.shiftsService.deleteShift(id.id)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    getAll(){
        return this.shiftsService.getAll();
    }
}

