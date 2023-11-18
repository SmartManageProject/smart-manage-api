"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const HttpException_1 = __importDefault(require("./HttpException"));
class ValidationException extends HttpException_1.default {
    constructor(e) {
        const errors = [];
        e.errors.forEach((error) => errors.push(error.message));
        super(http_status_codes_1.StatusCodes.BAD_REQUEST, errors);
    }
}
exports.default = ValidationException;
