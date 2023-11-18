"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProjectTable1697328450793 = void 0;
const typeorm_1 = require("typeorm");
class CreateProjectTable1697328450793 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "projects",
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
                    name: "description",
                    type: "varchar",
                    isNullable: false,
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("projects");
    }
}
exports.CreateProjectTable1697328450793 = CreateProjectTable1697328450793;
