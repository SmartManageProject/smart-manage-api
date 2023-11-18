"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserRoleField1697116036795 = void 0;
class CreateUserRoleField1697116036795 {
    name = "CreateUserRoleField1697116036795";
    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('frontend', 'backend', 'fullstack', 'manager', 'productOwner')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" "public"."users_role_enum" NOT NULL DEFAULT 'fullstack'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }
}
exports.CreateUserRoleField1697116036795 = CreateUserRoleField1697116036795;
