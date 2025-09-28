import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeShoppingListDateNullable1758989022326 implements MigrationInterface {
    name = 'ChangeShoppingListDateNullable1758989022326'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shopping_list" ALTER COLUMN "purchaseDate" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shopping_list" ALTER COLUMN "purchaseDate" SET NOT NULL`);
    }

}
