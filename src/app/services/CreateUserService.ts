import { AppDataSource } from "../../database";
import User from "../models/User";

type CreateUserRequest = {
  name: string;
  email: string;
  password: string;
};

export class CreateUserService {
  async execute({ name, email, password }: CreateUserRequest) {
    const repository = AppDataSource.getRepository(User);
    const userExists = await repository.findOne({ where: { email } });

    if (userExists) {
      throw new Error("Email already exists");
    }

    const user = repository.create({ name, email, password });
    await repository.save(user);

    return user;
  }
}
