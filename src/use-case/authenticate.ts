import { UserRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./err/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseRespones {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseRespones> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    // Boolean => faça sempre uma pergunta (Clean Code)

    const doesPasswordMatches = await compare(password, user.password_hash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return { user };
  }
}
