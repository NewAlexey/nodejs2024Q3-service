import { MigrationInterface, QueryRunner } from 'typeorm';

import DataSourceInstance from 'src/config/ormseedconfig';
import { favoritesSeed } from 'src/seeds/favorites.seed';

export class SeedDb1731657161653 implements MigrationInterface {
  name = 'SeedDb1731657161653';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await DataSourceInstance.manager.getRepository('favs').save(favoritesSeed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
