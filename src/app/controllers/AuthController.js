"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_codes_1 = require("http-status-codes");
const zod_1 = require("zod");
const User_1 = __importDefault(require("../models/User"));
const database_1 = require("../../database");
const ValidationException_1 = __importDefault(require("../exceptions/ValidationException"));
const UnauthorizedException_1 = __importDefault(require("../exceptions/UnauthorizedException"));
const authenticateSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
class AuthController {
    async authenticate(req, res, next) {
        try {
            const repository = database_1.AppDataSource.getRepository(User_1.default);
            const { email, password } = authenticateSchema.parse(req.body);
            const user = await repository.findOne({ where: { email } });
            if (!user) {
                return next(new UnauthorizedException_1.default());
            }
            const isValidPassword = await bcrypt_1.default.compare(password, user.password);
            if (!isValidPassword) {
                return next(new UnauthorizedException_1.default());
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET || "develop");
            return res.status(http_status_codes_1.StatusCodes.OK).json({ id: user.id, token });
        }
        catch (e) {
            if (e instanceof zod_1.ZodError) {
                return next(new ValidationException_1.default(e));
            }
            return next(e);
        }
    }
}
exports.AuthController = AuthController;
