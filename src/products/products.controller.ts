import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FilterOperator, Paginate, PaginateQuery, paginate, Paginated } from 'nestjs-paginate'
import { Product } from "./Product";
import { AuthGuard } from "@nestjs/passport";
import { ACGuard, UseRoles } from "nest-access-control";

@Controller('products')
export class ProductsController{

    constructor(@InjectRepository(Product)
    private productsRepository : Repository<Product>){}


    /*
    @UseGuards(AuthGuard('jwt'), ACGuard)
      @UseRoles({
        resource:  'product',
        action:  'read',
        possession:  'any',
      })
    @Get()
    async GetAllProducts(){
        

        return this.productsRepository.find();
    }*/
    
    @UseGuards(AuthGuard('jwt'), ACGuard)
      @UseRoles({
        resource:  'product',
        action:  'read',
        possession:  'any',
      })
    @Get(":name")
    GetProductByname(@Param() params : Product): Promise<Product>{
        return this.productsRepository.findOneBy({name:params.name});
    }

    @UseGuards(AuthGuard('jwt'), ACGuard)
      @UseRoles({
        resource:  'product',
        action:  'create',
        possession:  'any',
      })
    @Post()
    async Create(@Body() newProduct: Product){
        const existingProduct = await this.productsRepository.findOneBy({barcode: newProduct.barcode});
        if(existingProduct){
            console.warn("This product already exists");
            return false;
        }
        else
        await this.productsRepository.save(newProduct);
    }

    @UseGuards(AuthGuard('jwt'), ACGuard)
      @UseRoles({
        resource:  'product',
        action:  'update',
        possession:  'any',
      })
    @Patch(":id")
    async Update(@Param() params, @Body() updatedProduct: Product){
        const oldProduct = await this.productsRepository.findOneBy({id: params.id});
        if(oldProduct)
        await this.productsRepository.save({id:oldProduct.id, ...updatedProduct});
        
        else
        console.warn("This item does not exist!");
    }

    @UseGuards(AuthGuard('jwt'), ACGuard)
      @UseRoles({
        resource:  'product',
        action:  'delete',
        possession:  'any',
      })
    @Delete(":id")
    async Delete(@Param() params){
        const existingProduct = await this.productsRepository.findOneBy({id: params.id});
        if(existingProduct)
        await this.productsRepository.delete(existingProduct);
        
    }

}
