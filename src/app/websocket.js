"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-floating-promises */
const _1 = require(".");
const MessageController_1 = require("./controllers/MessageController");
_1.io.on("connection", (socket) => {
    socket.on("selectRoom", async ({ projectId }, callback) => {
        const rooms = _1.io.sockets.adapter.sids.get(socket.id);
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        rooms?.forEach(async (room) => await socket.leave(room));
        socket.join(projectId);
        const messages = await new MessageController_1.MessageController().list({ projectId });
        callback(messages);
    });
    socket.on("message", async ({ userId, projectId, text }) => {
        const message = await new MessageController_1.MessageController().create({
            userId,
            projectId,
            text,
        });
        _1.io.to(projectId).emit("message", message);
    });
});
