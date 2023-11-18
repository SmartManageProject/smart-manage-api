"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllProjectsService = void 0;
const database_1 = require("../../database");
const UserDoesNotExistException_1 = __importDefault(require("../exceptions/UserDoesNotExistException"));
const User_1 = __importDefault(require("../models/User"));
class GetAllProjectsService {
    async execute({ userId }) {
        const userRepository = database_1.AppDataSource.getRepository(User_1.default);
        const user = await userRepository.findOne({
            relations: ["projects"],
            where: {
                id: userId,
            },
        });
        if (!user) {
            throw new UserDoesNotExistException_1.default();
        }
        return user.projects;
    }
}
exports.GetAllProjectsService = GetAllProjectsService;
