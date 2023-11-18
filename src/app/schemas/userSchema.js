"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByIdSchema = exports.listUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
const User_1 = require("../models/User");
exports.createUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: "Name is required.",
            invalid_type_error: "Name must be a string",
        })
            .min(1, { message: "Name must not be empty." }),
        email: zod_1.z
            .string({
            required_error: "Email is required.",
            invalid_type_error: "Email must be a string",
        })
            .email(),
        password: zod_1.z
            .string({
            required_error: "Password is required.",
            invalid_type_error: "Password must be a string",
        })
            .min(1, { message: "Password must not be empty." }),
        role: zod_1.z.enum(User_1.UserRoles).default("fullstack"),
    }),
});
exports.listUserSchema = zod_1.z.object({
    query: zod_1.z.object({
        search: zod_1.z.string().optional(),
        page: zod_1.z.coerce.number().min(1).optional(),
        limit: zod_1.z.coerce.number().positive().optional(),
    }),
});
exports.getUserByIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().uuid(),
    }),
});
