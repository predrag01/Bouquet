import { City } from "src/city/models/city.entity";
import { DataSourceOptions } from "typeorm";

export const typeOrmConfig: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'bouquet',
    password: 'mysecretpassword',
    database: 'bouquet',
    entities: [City],
    synchronize: true,
  };