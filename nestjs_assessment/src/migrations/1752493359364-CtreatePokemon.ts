import { MigrationInterface, QueryRunner } from "typeorm";

export class CtreatePokemon1752493359364 implements MigrationInterface {
    name = 'CtreatePokemon1752493359364'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pokemon" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type1" character varying NOT NULL, "type2" character varying, "total" integer NOT NULL, "hp" integer NOT NULL, "attack" integer NOT NULL, "defense" integer NOT NULL, "spAttack" integer NOT NULL, "spDefense" integer NOT NULL, "speed" integer NOT NULL, "generation" integer NOT NULL, "legendary" boolean NOT NULL, "image" character varying NOT NULL, "ytbUrl" character varying NOT NULL, CONSTRAINT "PK_0b503db1369f46c43f8da0a6a0a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "pokemon"`);
    }

}
