import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1731592144690 implements MigrationInterface {
  name = 'InitialMigration1731592144690';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "version" integer NOT NULL DEFAULT '1', "created_at" bigint NOT NULL, "updated_at" bigint NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "artist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artist_id" character varying, CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "favs" ("id" SERIAL NOT NULL, CONSTRAINT "PK_2fde25c80bd089c0fa0e7986409" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "track" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "duration" double precision NOT NULL, "artist_id" character varying, "album_id" character varying, CONSTRAINT "PK_0631b9bcf521f8fab3a15f2c37e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "favs_artists_artist" ("favs_id" integer NOT NULL, "artist_id" uuid NOT NULL, CONSTRAINT "PK_49e15c54e5d2d2a8bc9034fd391" PRIMARY KEY ("favs_id", "artist_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9956d792225d294cb173514209" ON "favs_artists_artist" ("favs_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3313defbd9287716cb8041ecc2" ON "favs_artists_artist" ("artist_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "favs_albums_album" ("favs_id" integer NOT NULL, "album_id" uuid NOT NULL, CONSTRAINT "PK_ad91db9d83ea5a9fd9898246b02" PRIMARY KEY ("favs_id", "album_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d4a433b25c317115005fb617b2" ON "favs_albums_album" ("favs_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9ccc78077fb62f9974f9991526" ON "favs_albums_album" ("album_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "favs_tracks_track" ("favs_id" integer NOT NULL, "track_id" uuid NOT NULL, CONSTRAINT "PK_97f5e9f9b0fa9fee9246e8aba16" PRIMARY KEY ("favs_id", "track_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6416d311c864cef3146a34f178" ON "favs_tracks_track" ("favs_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_844db63e76291fb4334f6c837c" ON "favs_tracks_track" ("track_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "favs_artists_artist" ADD CONSTRAINT "FK_9956d792225d294cb1735142090" FOREIGN KEY ("favs_id") REFERENCES "favs"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favs_artists_artist" ADD CONSTRAINT "FK_3313defbd9287716cb8041ecc2b" FOREIGN KEY ("artist_id") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favs_albums_album" ADD CONSTRAINT "FK_d4a433b25c317115005fb617b2b" FOREIGN KEY ("favs_id") REFERENCES "favs"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favs_albums_album" ADD CONSTRAINT "FK_9ccc78077fb62f9974f99915261" FOREIGN KEY ("album_id") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favs_tracks_track" ADD CONSTRAINT "FK_6416d311c864cef3146a34f1785" FOREIGN KEY ("favs_id") REFERENCES "favs"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favs_tracks_track" ADD CONSTRAINT "FK_844db63e76291fb4334f6c837c3" FOREIGN KEY ("track_id") REFERENCES "track"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "favs_tracks_track" DROP CONSTRAINT "FK_844db63e76291fb4334f6c837c3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favs_tracks_track" DROP CONSTRAINT "FK_6416d311c864cef3146a34f1785"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favs_albums_album" DROP CONSTRAINT "FK_9ccc78077fb62f9974f99915261"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favs_albums_album" DROP CONSTRAINT "FK_d4a433b25c317115005fb617b2b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favs_artists_artist" DROP CONSTRAINT "FK_3313defbd9287716cb8041ecc2b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favs_artists_artist" DROP CONSTRAINT "FK_9956d792225d294cb1735142090"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_844db63e76291fb4334f6c837c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6416d311c864cef3146a34f178"`,
    );
    await queryRunner.query(`DROP TABLE "favs_tracks_track"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9ccc78077fb62f9974f9991526"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d4a433b25c317115005fb617b2"`,
    );
    await queryRunner.query(`DROP TABLE "favs_albums_album"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3313defbd9287716cb8041ecc2"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9956d792225d294cb173514209"`,
    );
    await queryRunner.query(`DROP TABLE "favs_artists_artist"`);
    await queryRunner.query(`DROP TABLE "track"`);
    await queryRunner.query(`DROP TABLE "favs"`);
    await queryRunner.query(`DROP TABLE "album"`);
    await queryRunner.query(`DROP TABLE "artist"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
