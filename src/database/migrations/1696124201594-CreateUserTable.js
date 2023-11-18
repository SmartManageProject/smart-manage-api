"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserTable1696124201594 = void 0;
const typeorm_1 = require("typeorm");
class CreateUserTable1696124201594 {
    async up(queryRunner) {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(new typeorm_1.Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: "uuid",
                    default: "uuid_generate_v4()",
                },
                {
                    name: "name",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "email",
                    type: "varchar",
                    isNullable: false,
                    isUnique: true,
                },
                {
                    name: "password",
                    type: "varchar",
                    isNullable: false,
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("users");
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');
    }
}
exports.CreateUserTable1696124201594 = CreateUserTable1696124201594;
