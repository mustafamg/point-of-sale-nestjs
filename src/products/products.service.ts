import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginatedProductsResultDto } from './dto/paginated-products-result.dto';
import { PaginationDto } from './dto/pagination.dto';
import { Product } from './product';

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product) private productRepository:Repository<Product>){}

    async createProduct(newProduct) {
        const {name,price,barcode,category_id,stock_type,low_stock,optimal_stock} = newProduct
        const checkProduct = await this.productRepository.findOneBy({barcode})
        if (checkProduct) {
            return {message: "this barecode is already exists"}
        }
        return await this.productRepository.save({name,price,barcode,category:category_id,stock_type,low_stock,optimal_stock})
    }

    async updateProduct(id, newProduct){
        const {name,price,barcode,category_id,stock_type,low_stock,optimal_stock} = newProduct
        const ckeckProduct = await this.productRepository.findOneBy({id})
        if (!ckeckProduct) {
            return "not found"
        }
        return await this.productRepository.save({name,price,barcode,category:category_id,stock_type,low_stock,optimal_stock,id:ckeckProduct.id})
    }

    async getProductById(id){
        const products = this.productRepository.find({
            relations: {
                category: true,
            },
        });
        return (await products).filter(product => product.id == id)[0];
    }
    async getProducts(paginationDto: PaginationDto) : Promise<PaginatedProductsResultDto> {
        const skippedItems = (paginationDto.page) * paginationDto.pageSize;      
        const total = await this.productRepository.count() 
        const products = await this.productRepository.createQueryBuilder()
          .orderBy('created_at')
          .offset(skippedItems)
          .limit(paginationDto.pageSize)
          .getMany()
        return {
            total, 
            pageIndex: paginationDto.page,
            pageSize: paginationDto.pageSize,
            data: products ,
        }
    }

}
