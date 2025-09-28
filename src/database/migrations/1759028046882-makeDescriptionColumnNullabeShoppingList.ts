import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeDescriptionColumnNullabeShoppingList1759028046882 implements MigrationInterface {
    name = 'MakeDescriptionColumnNullabeShoppingList1759028046882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shopping_list" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shopping_list_item" DROP CONSTRAINT "FK_d23803fe6548e4af1281a6e5139"`);
        await queryRunner.query(`ALTER TABLE "shopping_list_item" ALTER COLUMN "unitId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shopping_list_item" ADD CONSTRAINT "FK_d23803fe6548e4af1281a6e5139" FOREIGN KEY ("unitId") REFERENCES "unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shopping_list_item" DROP CONSTRAINT "FK_d23803fe6548e4af1281a6e5139"`);
        await queryRunner.query(`ALTER TABLE "shopping_list_item" ALTER COLUMN "unitId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shopping_list_item" ADD CONSTRAINT "FK_d23803fe6548e4af1281a6e5139" FOREIGN KEY ("unitId") REFERENCES "unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shopping_list" ALTER COLUMN "description" SET NOT NULL`);
    }

}
