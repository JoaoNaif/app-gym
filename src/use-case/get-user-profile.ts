import { UserRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./err/resource-not-found-error";

interface getUserProfileUseCaseRequest {
  userId: string;
}

interface getUserProfileUseCaseRespones {
  user: User;
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute({
    userId,
  }: getUserProfileUseCaseRequest): Promise<getUserProfileUseCaseRespones> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return { user };
  }
}
