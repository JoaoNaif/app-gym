import fastify from "fastify";
import { PrismaClient } from "@prisma/client";

export const app = fastify();

const prisma = new PrismaClient();

prisma.user.create({
  data: {
    name: "João",
    email: "joaonaif@gmail.com",
    password_hash: "asdljfkasldf",
  },
});
