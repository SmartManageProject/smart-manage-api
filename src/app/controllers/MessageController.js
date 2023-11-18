"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
const CreateMessageService_1 = require("../services/CreateMessageService");
const GetAllMessagesService_1 = require("../services/GetAllMessagesService");
class MessageController {
    async create({ userId, projectId, text }) {
        const service = new CreateMessageService_1.CreateMessageService();
        const message = await service.execute({ userId, projectId, text });
        return message;
    }
    async list({ projectId }) {
        const service = new GetAllMessagesService_1.GetAllMessagesService();
        const messages = await service.execute({ projectId });
        return messages;
    }
}
exports.MessageController = MessageController;
