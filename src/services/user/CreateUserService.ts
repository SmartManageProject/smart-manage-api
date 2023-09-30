import { AppDataSource } from "../../database";
import { Repository } from "typeorm";
import { User } from "../../entities/User";
import bcrypt from "bcrypt";

type CreateUserRequest = {
  name: string;
  email: string;
  password: string;
};

export class CreateUserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async execute({ name, email, password }: CreateUserRequest): Promise<User> {
    if (await this.userRepository.findOne({ where: { email } })) {
      throw new Error("Email already exists");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      name,
      email,
      password_hash: passwordHash,
    });

    await this.userRepository.save(user);

    return user;
  }
}
