import { expect, describe, it, beforeEach } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { UserAlreadyExistError } from "./err/user-already-exist";

let usersRepository: InMemoryUserRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it("should be able to register", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const isPasswordCorrectyHashed = await compare(
      "123456",
      user.password_hash,
    );

    expect(isPasswordCorrectyHashed).toBe(true);
  });

  it("should not be able to register with same email twice", async () => {
    const email = "johndoe@example.com";

    await sut.execute({
      name: "John Doe",
      email,
      password: "123456",
    });

    await expect(() =>
      sut.execute({
        name: "John Doe",
        email,
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistError);
  });
});
