import { BouquetType } from "src/bouquet-type/models/bouquet-type.entity";
import { Bouquet } from "src/bouquet/models/bouquet.entity";
import { City } from "src/city/models/city.entity";
import { Order } from "src/order/models/order.enity";
import { ShoppingCart } from "src/shopping-cart/models/shoppingCart.entity";
import { FlowerShop } from "src/store/models/store.entity";
import { User } from "src/user/models/user.entity";
import { DataSourceOptions } from "typeorm";

export const typeOrmConfig: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'bouquet',
    password: 'mysecretpassword',
    database: 'bouquet',
    entities: [City, Bouquet, BouquetType, FlowerShop, User, ShoppingCart, Order],
    synchronize: true,
  };