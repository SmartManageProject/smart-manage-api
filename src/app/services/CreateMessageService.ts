import { AppDataSource } from "../../database";
import Message from "../models/Message";
import Project from "../models/Project";
import User from "../models/User";
import { MessageArgs } from "../schemas/chatSchema";

export class CreateMessageService {
  async execute({ userId, projectId, text }: MessageArgs) {
    const userRepository = AppDataSource.getRepository(User);
    const projectRepository = AppDataSource.getRepository(Project);
    const messageRepository = AppDataSource.getRepository(Message);

    const user = await userRepository.findOneBy({
      id: userId,
    });
    const project = await projectRepository.findOneBy({
      id: projectId,
    });

    if (!user || !project) {
      throw new Error();
    }

    const message = messageRepository.create({
      userId,
      roomId: projectId,
      text,
    });
    await messageRepository.save(message);

    return message;
  }
}
