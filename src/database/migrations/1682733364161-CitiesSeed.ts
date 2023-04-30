import { MigrationInterface, QueryRunner } from 'typeorm';
import CountryEntity from 'src/modules/v1/countries/schemas/country.entity';
import countryAndCityData from '../mocks/country-city';

// eslint-disable-next-line import/prefer-default-export
export class CitiesSeed1682733364161 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const countries = await queryRunner.query('SELECT * FROM country');
    const promises = countries.map(async (country: CountryEntity) => {
      const cities = countryAndCityData[country.name];
      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into('city')
        .values(cities.map((city: string) => ({ country, name: city })))
        .execute();
    });

    await Promise.all(promises);
  }

  public async down(): Promise<void> {
  }
}
