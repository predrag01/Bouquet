import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'typeorm.config';
import { CityModule } from './city/city.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { StoreModule } from './store/store.module';
import { BouquetTypeModule } from './bouquet-type/bouquet-type.module';
import { BouquetModule } from './bouquet/bouquet.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { OrderModule } from './order/order.module';
import { ROOT_PATH } from 'config';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [ 
    TypeOrmModule.forRoot(typeOrmConfig),
    ServeStaticModule.forRoot({
      rootPath: ROOT_PATH,
      renderPath: '/'
    }),
     CityModule,
     AuthModule,
     UserModule,
     StoreModule,
     BouquetTypeModule,
     BouquetModule,
     ShoppingCartModule, 
    OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
