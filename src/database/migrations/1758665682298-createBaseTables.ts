import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBaseTables1758665682298 implements MigrationInterface {
    name = 'CreateBaseTables1758665682298'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shopping_list" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "purchaseDate" TIMESTAMP NOT NULL, "userId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_87d9431f2ea573a79370742b474" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "image" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "unit" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "symbol" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4252c4be609041e559f0c80f58a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shopping_list_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "shoppingListId" uuid NOT NULL, "productId" uuid NOT NULL, "quantity" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "unitId" uuid, CONSTRAINT "PK_49653e92ab95247ceaea6700e2c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "shopping_list" ADD CONSTRAINT "FK_38e60f213f35fb8fe51d3bf41e4" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shopping_list_item" ADD CONSTRAINT "FK_d23803fe6548e4af1281a6e5139" FOREIGN KEY ("unitId") REFERENCES "unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shopping_list_item" ADD CONSTRAINT "FK_033f63ed42e52b04a8c6cd4bde3" FOREIGN KEY ("shoppingListId") REFERENCES "shopping_list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shopping_list_item" ADD CONSTRAINT "FK_32518cd1ef0b1be4c7a33492182" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shopping_list_item" DROP CONSTRAINT "FK_32518cd1ef0b1be4c7a33492182"`);
        await queryRunner.query(`ALTER TABLE "shopping_list_item" DROP CONSTRAINT "FK_033f63ed42e52b04a8c6cd4bde3"`);
        await queryRunner.query(`ALTER TABLE "shopping_list_item" DROP CONSTRAINT "FK_d23803fe6548e4af1281a6e5139"`);
        await queryRunner.query(`ALTER TABLE "shopping_list" DROP CONSTRAINT "FK_38e60f213f35fb8fe51d3bf41e4"`);
        await queryRunner.query(`DROP TABLE "shopping_list_item"`);
        await queryRunner.query(`DROP TABLE "unit"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "shopping_list"`);
    }

}
