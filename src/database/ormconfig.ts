import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const cfg = new ConfigService();
const config: DataSourceOptions = {
  type: 'postgres',
  host: cfg.get('POSTGRESQL_HOST'),
  port: (cfg.get('POSTGRESQL_PORT') as unknown) as number,
  database: cfg.get('POSTGRESQL_DB'),
  username: cfg.get('POSTGRESQL_ROOT_USER'),
  password: cfg.get('POSTGRESQL_PASSWORD'),
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/**/migrations/*{.ts,.js}'],
  migrationsRun: false,
  synchronize: true,
  logging: true,
};

export default config;
