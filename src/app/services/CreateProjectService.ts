import { In } from "typeorm";
import { AppDataSource } from "../../database";
import Project from "../models/Project";
import User from "../models/User";
import MemberDoesNotExistException from "../exceptions/MemberDoesNotExistException";

type CreateProjectRequest = {
  name: string;
  description: string;
  membersId: string[];
};

export class CreateProjectService {
  async execute({ name, description, membersId }: CreateProjectRequest) {
    const projectRepository = AppDataSource.getRepository(Project);
    const userRepository = AppDataSource.getRepository(User);

    const members = await userRepository.findBy({ id: In(membersId) });

    if (members.length !== membersId.length) {
      throw new MemberDoesNotExistException();
    }

    const project = projectRepository.create({ name, description, members });
    await projectRepository.save(project);

    return project;
  }
}
