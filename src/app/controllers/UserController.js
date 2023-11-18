"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const http_status_codes_1 = require("http-status-codes");
const GetAllUsersService_1 = require("../services/GetAllUsersService");
const CreateUserService_1 = require("../services/CreateUserService");
const GetUserByIdService_1 = require("../services/GetUserByIdService");
class UserController {
    async create(req, res, next) {
        try {
            const { name, email, password, role } = req.body;
            const service = new CreateUserService_1.CreateUserService();
            const user = await service.execute({ name, email, password, role });
            return res.status(http_status_codes_1.StatusCodes.CREATED).json({
                id: user.id,
                message: "User created successfully",
            });
        }
        catch (e) {
            return next(e);
        }
    }
    async list(req, res, next) {
        try {
            const { search, page, limit } = req.query;
            const service = new GetAllUsersService_1.GetAllUsersService();
            const [users, count] = await service.execute({ search, page, limit });
            return res.status(http_status_codes_1.StatusCodes.OK).json({ count, users });
        }
        catch (e) {
            return next(e);
        }
    }
    async findById(req, res, next) {
        try {
            const { id } = req.params;
            const service = new GetUserByIdService_1.GetUserByIdService();
            const user = await service.execute({ id });
            return res.status(http_status_codes_1.StatusCodes.OK).json(user);
        }
        catch (e) {
            return next(e);
        }
    }
}
exports.UserController = UserController;
