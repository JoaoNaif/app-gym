import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repotory";
import { AuthenticateUseCase } from "../authenticate";

export function makeAuthenticateCase() {
  const prismaUserRepository = new PrismaUserRepository();
  const authenticateUsecase = new AuthenticateUseCase(prismaUserRepository);

  return authenticateUsecase;
}
