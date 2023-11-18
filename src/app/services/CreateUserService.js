"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserService = void 0;
const database_1 = require("../../database");
const EmailAlreadyExistsException_1 = __importDefault(require("../exceptions/EmailAlreadyExistsException"));
const User_1 = __importDefault(require("../models/User"));
class CreateUserService {
    async execute({ name, email, password, role }) {
        const repository = database_1.AppDataSource.getRepository(User_1.default);
        const userExists = await repository.findOne({ where: { email } });
        if (userExists) {
            throw new EmailAlreadyExistsException_1.default();
        }
        const user = repository.create({ name, email, password, role });
        await repository.save(user);
        return user;
    }
}
exports.CreateUserService = CreateUserService;
