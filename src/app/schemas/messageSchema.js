"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listMessagesSchema = exports.messageSchema = void 0;
const zod_1 = require("zod");
exports.messageSchema = zod_1.z.object({
    userId: zod_1.z.string().uuid(),
    projectId: zod_1.z.string().uuid(),
    text: zod_1.z.string(),
});
exports.listMessagesSchema = zod_1.z.object({
    projectId: zod_1.z.string().uuid(),
});
