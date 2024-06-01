import { UserRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistError } from "./err/user-already-exist";
import { User } from "@prisma/client";

interface RegisterUserCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUserCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUserCaseRequest): Promise<RegisterUserCaseResponse> {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistError();
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    return { user };
  }
}
