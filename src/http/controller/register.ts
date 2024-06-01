import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { UserAlreadyExistError } from "@/use-case/err/user-already-exist";
import { makeRegisterUserCase } from "@/use-case/factories/make-register-use-case";

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterUserCase();

    await registerUseCase.execute({
      name,
      email,
      password,
    });
  } catch (err) {
    if (err instanceof UserAlreadyExistError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(201).send();
};
