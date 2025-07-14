import 'dotenv/config';
import { DataSource } from 'typeorm';
import { join } from 'path';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [join(__dirname, 'src/**/*.entity.ts')],
    migrations: [join(__dirname, 'src/migrations/*.ts')],
    synchronize: false,
    ssl: {
        rejectUnauthorized: false,
    },
});
