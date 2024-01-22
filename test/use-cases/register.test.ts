import { InMemoryRepositories } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from '@/use-cases/erros/user-already-exists-error';
import { RegisterUserUseCase } from '@/use-cases/register-user';
import { compare } from 'bcryptjs';
import { describe, expect, it } from "vitest";

describe("register Use Case", () => {

  it("should be able to register", async () => {

    const usersRepository = new InMemoryRepositories();
    const registerUserUseCase = new RegisterUserUseCase(usersRepository);

    const { user } = await registerUserUseCase.execute({
      name: "John Doe",
      email: "johndoe4@example.com",
      password: "1234561234",
    })

    expect(user.id).toEqual(expect.any(String));
    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("email");
    expect(user).toHaveProperty("name");
  })
  it("should hash user password upon registration", async () => {

    const usersRepository = new InMemoryRepositories();
    const registerUserUseCase = new RegisterUserUseCase(usersRepository);

    const { user } = await registerUserUseCase.execute({
      name: "John Doe",
      email: "johndoe4@example.com",
      password: "1234561234",
    })

    const isPasswordCorrectlyHashed = await compare("1234561234", user.password_hash);

    expect(isPasswordCorrectlyHashed).toBe(true);
  })

  it("should not be able to register with same email twice", async () => {

    const usersRepository = new InMemoryRepositories();
    const registerUserUseCase = new RegisterUserUseCase(usersRepository);

    const email = "johndoe4@example.com";

    await registerUserUseCase.execute({
      name: "John Doe",
      email,
      password: "1234561234",
    })


    await expect(() => registerUserUseCase.execute({
      name: "John Doe",
      email,
      password: "1234561234",
    })).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})