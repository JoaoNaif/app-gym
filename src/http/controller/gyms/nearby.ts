import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeFetchNearbyGymsUseCase } from "@/use-case/factories/make-fetch-nearby-gyms-use-case";

export const nearby = async (request: FastifyRequest, reply: FastifyReply) => {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query);

  const searchGymUseCase = makeFetchNearbyGymsUseCase();

  const { gyms } = await searchGymUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(200).send({
    gyms,
  });
};
