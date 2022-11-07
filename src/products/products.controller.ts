import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PaginatedProductsResultDto } from './dto/paginated-products-result.dto';
import { PaginationDto } from './dto/pagination.dto';
import { ProductDto } from './dto/product.dto';
import { ProductsService } from './products.service';

@UseGuards(AuthGuard('jwt'))
@Controller('products')
export class ProductsController {
    constructor(private productsService:ProductsService){}

    @Post()
    createProduct(@Body() newProduct:ProductDto){
        return this.productsService.createProduct(newProduct)
    }

    @Patch(':id')
    updateProduct(@Param() param ,@Body() item){
        return this.productsService.updateProduct(param.id, item)
    }

    @Get(':id')
    getProductById(@Param() param){       
        return this.productsService.getProductById(param.id)
        // return true
    }

    @Get()
    getProducts(@Query() paginationDto: PaginationDto): Promise<PaginatedProductsResultDto>{
        paginationDto.page = paginationDto.page == undefined ? paginationDto.page: 0;
        paginationDto.pageSize = paginationDto.pageSize == undefined ? paginationDto.pageSize : 10;
        paginationDto.page = Number(paginationDto.page);
        paginationDto.pageSize = Number(paginationDto.pageSize);

        return this.productsService.getProducts({
            page: paginationDto.page, //  ...paginationDto
            pageSize: paginationDto.pageSize > 100 ? 100 : paginationDto.pageSize
          });
        
    }

}
