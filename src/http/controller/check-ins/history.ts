import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeFetchUserCheckInHistoryUseCase } from "@/use-case/factories/make-fetch-user-check-in-history-use-case";

export const history = async (request: FastifyRequest, reply: FastifyReply) => {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = checkInHistoryQuerySchema.parse(request.query);

  const fetchUserCheckHistoryUseCase = makeFetchUserCheckInHistoryUseCase();

  const { checkIns } = await fetchUserCheckHistoryUseCase.execute({
    userId: request.user.sub,
    page,
  });

  return reply.status(200).send({
    checkIns,
  });
};
