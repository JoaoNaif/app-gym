import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repotory";
import { AuthenticateUseCase } from "../authenticate";

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUserRepository();
  const authenticateUsecase = new AuthenticateUseCase(usersRepository);

  return authenticateUsecase;
}
