import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeCheckInUseCase } from "@/use-case/factories/make-ckeck-in-use-case";

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const createCheckInsParamsSchema = z.object({
    gymId: z.string().uuid(),
  });

  const createCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { latitude, longitude } = createCheckInBodySchema.parse(request.body);
  const { gymId } = createCheckInsParamsSchema.parse(request.params);

  const checkInUseCase = makeCheckInUseCase();

  await checkInUseCase.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(201).send();
};
