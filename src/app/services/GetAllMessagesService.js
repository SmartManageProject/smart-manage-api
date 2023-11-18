"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllMessagesService = void 0;
const database_1 = require("../../database");
const Message_1 = __importDefault(require("../models/Message"));
class GetAllMessagesService {
    async execute({ projectId }) {
        const repository = database_1.AppDataSource.getRepository(Message_1.default);
        const messages = await repository.find({
            where: {
                roomId: projectId,
            },
            relations: ["user"],
            select: {
                id: true,
                text: true,
                user: {
                    name: true,
                    email: true,
                    role: true,
                },
                createdAt: true,
            },
        });
        return messages;
    }
}
exports.GetAllMessagesService = GetAllMessagesService;
