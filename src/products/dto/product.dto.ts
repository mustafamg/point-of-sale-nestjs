import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ProductDto {
    @IsNotEmpty()
    @IsString() 
    name: string; 
    
    @IsNotEmpty()
    @IsNumber() 
    price: number;

    @IsNotEmpty()
    @IsString() 
    barcode: string; 
   
    @IsNotEmpty()
    @IsNumber() 
    category_id: number

    @IsNotEmpty()
    @IsString() 
    stock_type: string

    @IsOptional()
    @IsNumber() 
    low_stock: number;

    @IsOptional()
    @IsNumber() 
    optimal_stock: number;
}