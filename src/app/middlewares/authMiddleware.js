"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../../database");
const User_1 = __importDefault(require("../models/User"));
exports.default = async (req, res, next) => {
    const { authorization } = req.headers;
    const userRepository = database_1.AppDataSource.getRepository(User_1.default);
    if (!authorization) {
        return res
            .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
            .json({ message: "Missing authorization token" });
    }
    const [, token] = authorization.split(" ");
    try {
        const { id } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await userRepository.findOneBy({
            id,
        });
        if (!user) {
            throw new Error();
        }
        req.userId = id;
        return next();
    }
    catch {
        return res
            .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
            .json({ message: "Invalid or expired token" });
    }
};
