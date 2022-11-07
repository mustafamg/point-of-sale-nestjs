import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Category } from './products/categories/Category';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './auth/auth.roles';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: 'darsh123',
      database: 'PoS',
      entities: [Category],
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
