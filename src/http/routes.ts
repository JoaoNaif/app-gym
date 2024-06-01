import { FastifyInstance } from "fastify";
import { register } from "./controller/register";
import { authenticate } from "./controller/authenticate";

export const apiRoutes = async (app: FastifyInstance) => {
  app.post("/users", register);
  app.post("/sessions", authenticate);
};
