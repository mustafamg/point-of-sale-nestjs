import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessControlModule } from 'nest-access-control';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { roles } from './auth/auth.roles';
import { Category } from './products/categories/Category';
import { Product } from './products/Product';
import { ProductsModule } from './products/products.module';
import { Shift } from './users/shifts/Shift';
import { User } from './users/User';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: 'darsh123',
      database: 'PoS',
      entities: [Category, Product, User, Shift],
      synchronize: true,
    }),
    AccessControlModule.forRoles(roles), 
    ProductsModule,    
    AuthModule,    
    UsersModule,   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
