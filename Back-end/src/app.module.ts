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

@Module({
  imports: [ 
    TypeOrmModule.forRoot(typeOrmConfig),
     CityModule,
     AuthModule,
     UserModule,
     StoreModule,
     BouquetTypeModule,
     BouquetModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
