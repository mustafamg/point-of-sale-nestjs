import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from '../categories/Category';


export enum stockType {
    L = "l",
    Kg = "kg",
    Piese = "pcs",
}

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    name: string; 
    
    @Column()
    price: number;

    @Column()
    barcode: string; 
   
    @ManyToOne(() => Category , (category) => category.name) //(user) => user.photos 
    category: Category

    @Column({
        type: "enum",
        enum: stockType,
    })
    stock_type: stockType

    @Column({default: 0})
    low_stock: number;

    @Column({default: 10})
    optimal_stock: number;     
}











// export interface ProductDetails {
//     id: number;
//     name: string;
//     price: number;
//     low_stock: number;
//     optimal_stock: number;
//     barcode: string;
//     category_id: number;
//     created_at?: any;
//     updated_at?: any;
//     stock: Stock;
//     category: {
//       id: number;
//       name: string;
//     };
//   }