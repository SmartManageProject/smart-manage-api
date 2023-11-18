"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMessageTable1698521312589 = void 0;
const typeorm_1 = require("typeorm");
class CreateMessageTable1698521312589 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "messages",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: "uuid",
                    default: "uuid_generate_v4()",
                },
                {
                    name: "text",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "userId",
                    type: "uuid",
                    isNullable: false,
                },
                {
                    name: "roomId",
                    type: "uuid",
                    isNullable: false,
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "now()",
                },
            ],
            foreignKeys: [
                {
                    name: "fk_messages_user",
                    columnNames: ["userId"],
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                },
                {
                    name: "fk_messages_room",
                    columnNames: ["roomId"],
                    referencedTableName: "projects",
                    referencedColumnNames: ["id"],
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("messages");
    }
}
exports.CreateMessageTable1698521312589 = CreateMessageTable1698521312589;
