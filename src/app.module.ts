import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Category } from './categories/Category';
import { CategoriesModule } from './categories/categories.module';
import { Shift } from './shifts/Shift';
import { ShiftsModule } from './shifts/shifts.module';
import { User } from './users/user';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { Product } from './products/product';
import { AuthModule } from './auth/auth.module';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './authorization/nest-access-control/app.roles';
// import { RolesGuard } from './authorization/RBAC/roles.guard';
// import { AccessControlModule } from 'nest-access-control';
// import { roles } from './authorization/nest-access-control/app.roles';

const dbConnection = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'root',
  password: 'darsh123',
  database: 'PoS',
  entities: [Category, Product, Shift, User],
  synchronize: true,
})
   



const nestAccess = AccessControlModule.forRoles(roles)

@Module({
  imports: [ 
    dbConnection,
    CategoriesModule,
    ShiftsModule,
    UsersModule,
    ProductsModule,
    AuthModule,
    nestAccess    
 ],
  controllers: [AppController],
  providers: [AppService], //RolesGuard --- for testing authorization with RBAC
})
export class AppModule {}
