import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'typeorm.config';
import { CityModule } from './city/city.module';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { StoreModule } from './store/store.module';
import { BouquetTypeController } from './bouquet-type/bouquet-type.controller';
import { BouquetTypeService } from './bouquet-type/bouquet-type.service';
import { BouquetTypeModule } from './bouquet-type/bouquet-type.module';
import { BouquetModule } from './bouquet/bouquet.module';

@Module({
  imports: [ 
    TypeOrmModule.forRoot(typeOrmConfig),
     CityModule,
     AuthModule,
     UserModule,
     StoreModule,
     BouquetTypeModule,
     BouquetModule ],
  controllers: [AppController, UserController, BouquetTypeController],
  providers: [AppService, UserService, BouquetTypeService],
})
export class AppModule {}
