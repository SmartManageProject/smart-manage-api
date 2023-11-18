"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProjectUserRelation1697329108539 = void 0;
const typeorm_1 = require("typeorm");
class CreateProjectUserRelation1697329108539 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "project_members_user",
            columns: [
                {
                    name: "projectId",
                    type: "uuid",
                    isPrimary: true,
                },
                {
                    name: "userId",
                    type: "uuid",
                    isPrimary: true,
                },
            ],
            foreignKeys: [
                {
                    columnNames: ["projectId"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "projects",
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE",
                },
                {
                    columnNames: ["userId"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "users",
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE",
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("project_members_user");
    }
}
exports.CreateProjectUserRelation1697329108539 = CreateProjectUserRelation1697329108539;
