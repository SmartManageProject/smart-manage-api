"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserByIdService = void 0;
const database_1 = require("../../database");
const UserDoesNotExistException_1 = __importDefault(require("../exceptions/UserDoesNotExistException"));
const User_1 = __importDefault(require("../models/User"));
class GetUserByIdService {
    async execute({ id }) {
        const repository = database_1.AppDataSource.getRepository(User_1.default);
        const user = await repository.findOne({
            relations: ["projects"],
            where: {
                id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                projects: true,
            },
        });
        if (!user) {
            throw new UserDoesNotExistException_1.default();
        }
        return user;
    }
}
exports.GetUserByIdService = GetUserByIdService;
