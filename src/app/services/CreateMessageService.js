"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMessageService = void 0;
const database_1 = require("../../database");
const Message_1 = __importDefault(require("../models/Message"));
const Project_1 = __importDefault(require("../models/Project"));
const User_1 = __importDefault(require("../models/User"));
class CreateMessageService {
    async execute({ userId, projectId, text }) {
        const userRepository = database_1.AppDataSource.getRepository(User_1.default);
        const projectRepository = database_1.AppDataSource.getRepository(Project_1.default);
        const messageRepository = database_1.AppDataSource.getRepository(Message_1.default);
        const user = await userRepository.findOneBy({
            id: userId,
        });
        const project = await projectRepository.findOneBy({
            id: projectId,
        });
        if (!user || !project) {
            throw new Error();
        }
        const newMessage = messageRepository.create({
            userId,
            roomId: projectId,
            text,
        });
        await messageRepository.save(newMessage);
        const message = await messageRepository.findOne({
            relations: ["user"],
            where: {
                id: newMessage?.id,
            },
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
        return message;
    }
}
exports.CreateMessageService = CreateMessageService;
