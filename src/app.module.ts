import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Category } from './products/categories/Category';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'PoS',
      entities: [Category],
      synchronize: true,
    }),    
    ProductsModule,    
    AuthModule,    
    UsersModule,    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
