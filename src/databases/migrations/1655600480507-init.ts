import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1655600480507 implements MigrationInterface {
  name = 'init1655600480507';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "lastname" character varying(255) NOT NULL, "age" integer NOT NULL, "birthdate" date NOT NULL, "married" boolean NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
