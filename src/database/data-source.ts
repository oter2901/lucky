import { DataSource } from 'typeorm';

import config from './ormconfig';

// eslint-disable-next-line import/prefer-default-export
const AppDataSource = new DataSource(config);

export default AppDataSource;
