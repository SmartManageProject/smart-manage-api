"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
exports.default = (error, req, res, next) => {
    const status = error.status || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error.message || "Something went wrong";
    res.status(status).send({ status, message });
};
