import { MigrationInterface, QueryRunner } from 'typeorm';
import countryAndCityData from '../mocks/country-city';

// eslint-disable-next-line import/prefer-default-export
export class SeedCountry1682726953540 implements MigrationInterface {
  name = 'SeedCountry1682726953540';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const countries = Object.keys(countryAndCityData);
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('country')
      .values(countries.map((name: string) => ({ name })))
      .execute();
  }

  public async down(): Promise<void> {
  }
}
