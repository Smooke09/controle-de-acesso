import { MigrationInterface, QueryRunner } from "typeorm";

export class default1675339788514 implements MigrationInterface {
    name = 'default1675339788514'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users_roles" DROP CONSTRAINT "FK_e4435209df12bc1f001e5360174"`);
        await queryRunner.query(`ALTER TABLE "users_permissions" DROP CONSTRAINT "FK_4de7d0b175f702be3be55270023"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "users_roles" DROP CONSTRAINT "PK_c525e9373d63035b9919e578a9c"`);
        await queryRunner.query(`ALTER TABLE "users_roles" ADD CONSTRAINT "PK_1cf664021f00b9cc1ff95e17de4" PRIMARY KEY ("role_id")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e4435209df12bc1f001e536017"`);
        await queryRunner.query(`ALTER TABLE "users_roles" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "users_roles" ADD "user_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_roles" DROP CONSTRAINT "PK_1cf664021f00b9cc1ff95e17de4"`);
        await queryRunner.query(`ALTER TABLE "users_roles" ADD CONSTRAINT "PK_c525e9373d63035b9919e578a9c" PRIMARY KEY ("role_id", "user_id")`);
        await queryRunner.query(`ALTER TABLE "users_permissions" DROP CONSTRAINT "PK_7f3736984cd8546a1e418005561"`);
        await queryRunner.query(`ALTER TABLE "users_permissions" ADD CONSTRAINT "PK_b09b9a210c60f41ec7b453758e9" PRIMARY KEY ("permission_id")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4de7d0b175f702be3be5527002"`);
        await queryRunner.query(`ALTER TABLE "users_permissions" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "users_permissions" ADD "user_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_permissions" DROP CONSTRAINT "PK_b09b9a210c60f41ec7b453758e9"`);
        await queryRunner.query(`ALTER TABLE "users_permissions" ADD CONSTRAINT "PK_7f3736984cd8546a1e418005561" PRIMARY KEY ("permission_id", "user_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_e4435209df12bc1f001e536017" ON "users_roles" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_4de7d0b175f702be3be5527002" ON "users_permissions" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "users_roles" ADD CONSTRAINT "FK_e4435209df12bc1f001e5360174" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_permissions" ADD CONSTRAINT "FK_4de7d0b175f702be3be55270023" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_permissions" DROP CONSTRAINT "FK_4de7d0b175f702be3be55270023"`);
        await queryRunner.query(`ALTER TABLE "users_roles" DROP CONSTRAINT "FK_e4435209df12bc1f001e5360174"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4de7d0b175f702be3be5527002"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e4435209df12bc1f001e536017"`);
        await queryRunner.query(`ALTER TABLE "users_permissions" DROP CONSTRAINT "PK_7f3736984cd8546a1e418005561"`);
        await queryRunner.query(`ALTER TABLE "users_permissions" ADD CONSTRAINT "PK_b09b9a210c60f41ec7b453758e9" PRIMARY KEY ("permission_id")`);
        await queryRunner.query(`ALTER TABLE "users_permissions" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "users_permissions" ADD "user_id" integer NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_4de7d0b175f702be3be5527002" ON "users_permissions" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "users_permissions" DROP CONSTRAINT "PK_b09b9a210c60f41ec7b453758e9"`);
        await queryRunner.query(`ALTER TABLE "users_permissions" ADD CONSTRAINT "PK_7f3736984cd8546a1e418005561" PRIMARY KEY ("user_id", "permission_id")`);
        await queryRunner.query(`ALTER TABLE "users_roles" DROP CONSTRAINT "PK_c525e9373d63035b9919e578a9c"`);
        await queryRunner.query(`ALTER TABLE "users_roles" ADD CONSTRAINT "PK_1cf664021f00b9cc1ff95e17de4" PRIMARY KEY ("role_id")`);
        await queryRunner.query(`ALTER TABLE "users_roles" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "users_roles" ADD "user_id" integer NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_e4435209df12bc1f001e536017" ON "users_roles" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "users_roles" DROP CONSTRAINT "PK_1cf664021f00b9cc1ff95e17de4"`);
        await queryRunner.query(`ALTER TABLE "users_roles" ADD CONSTRAINT "PK_c525e9373d63035b9919e578a9c" PRIMARY KEY ("user_id", "role_id")`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "users_permissions" ADD CONSTRAINT "FK_4de7d0b175f702be3be55270023" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_roles" ADD CONSTRAINT "FK_e4435209df12bc1f001e5360174" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
    }

}
