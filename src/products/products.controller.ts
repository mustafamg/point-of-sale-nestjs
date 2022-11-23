import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./Product";

@Controller('products')
export class ProductsController{

    constructor(@InjectRepository(Product)
    private productsRepository : Repository<Product>){}


    /*@Get()
    async GetAllProducts(){
        

        return this.productsRepository.find();
    }*/
    
    @Get(":name")
    GetProductByname(@Param() params : Product): Promise<Product>{
        return this.productsRepository.findOneBy({name:params.name});
    }

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

    @Patch(":id")
    async Update(@Param() params, @Body() updatedProduct: Product){
        const oldProduct = await this.productsRepository.findOneBy({id: params.id});
        if(oldProduct)
        await this.productsRepository.save({id:oldProduct.id, ...updatedProduct});
        
        else
        console.warn("This item does not exist!");
    }

    @Delete(":id")
    async Delete(@Param() params){
        const existingProduct = await this.productsRepository.findOneBy({id: params.id});
        if(existingProduct)
        await this.productsRepository.delete(existingProduct);
        
    }

}
