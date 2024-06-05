import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repotory";
import { RegisterUseCase } from "../register";

export function makeRegisterUseCase() {
  const prismaUserRepository = new PrismaUserRepository();
  const registerUseCase = new RegisterUseCase(prismaUserRepository);

  return registerUseCase;
}
