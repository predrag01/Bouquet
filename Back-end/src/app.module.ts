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
import { ShoppingCartService } from './shopping-cart/shopping-cart.service';
import { ShoppingCartController } from './shopping-cart/shopping-cart.controller';

@Module({
  imports: [ 
    TypeOrmModule.forRoot(typeOrmConfig),
     CityModule,
     AuthModule,
     UserModule,
     StoreModule,
     BouquetTypeModule,
     BouquetModule,
     ShoppingCartModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
