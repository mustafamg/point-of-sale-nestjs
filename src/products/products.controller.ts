import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { Product } from "./Product";

@Controller('products')
export class ProductsController{

    constructor(@InjectRepository(Product)
    private productsRepository : Repository<Product>){}

    @Get()
    async GetAll(){        
        return this.productsRepository.find();
    }
    
    @Get("filter")
    async Search(@Query() params):Promise<Product[]>{
        const searchQuery = params.searchQuery;
        return this.productsRepository.createQueryBuilder("product")
        .where("name like :name", { name:`%${searchQuery}%` })
        .getMany();
    }

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
        // else
        const data = await this.productsRepository.save(newProduct);
        return {data};
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
