"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProjectSchema = void 0;
const zod_1 = require("zod");
exports.createProjectSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: "Name is required.",
            invalid_type_error: "Name must be a string",
        })
            .min(1, { message: "Name must not be empty." }),
        description: zod_1.z
            .string({
            required_error: "Description is required.",
            invalid_type_error: "Description must be a string",
        })
            .min(1, { message: "Description must not be empty." }),
        membersId: zod_1.z.string().uuid().array(),
    }),
});
