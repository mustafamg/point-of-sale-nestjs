import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PaginatedProductsResultDto } from './dto/paginated-products-result.dto';
import { PaginationDto } from './dto/pagination.dto';
import { ProductDto } from './dto/product.dto';
import { Product } from './product';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private productsService:ProductsService){}

    @Post()
    createProduct(@Body() newProduct:ProductDto){
        return this.productsService.createProduct(newProduct)
        // return true
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
        paginationDto.page = paginationDto.page === undefined ? paginationDto.page: 0;
        paginationDto.pageSize = paginationDto.pageSize == NaN ? paginationDto.pageSize : 20;
        paginationDto.page = Number(paginationDto.page);
        paginationDto.pageSize = Number(paginationDto.pageSize);

        console.log(paginationDto.page)
        console.log(paginationDto.pageSize)
        return this.productsService.getProducts({
            page: paginationDto.page, //  ...paginationDto
            pageSize: paginationDto.pageSize > 100 ? 100 : paginationDto.pageSize
          });
        
    }

}
