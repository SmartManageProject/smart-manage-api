"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllUsersService = void 0;
const database_1 = require("../../database");
const User_1 = __importDefault(require("../models/User"));
const typeorm_1 = require("typeorm");
class GetAllUsersService {
    async execute({ search = "", page = 1, limit = 10 }) {
        const skip = (page - 1) * limit;
        const repository = database_1.AppDataSource.getRepository(User_1.default);
        const [users, count] = await repository.findAndCount({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            },
            order: { name: "ASC" },
            where: [{ name: (0, typeorm_1.ILike)(`%${search}%`) }, { email: (0, typeorm_1.ILike)(`%${search}%`) }],
            take: limit,
            skip,
        });
        return [users, count];
    }
}
exports.GetAllUsersService = GetAllUsersService;
