import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { ResourceNotFoundError } from '@/use-cases/erros/resource-not-found-error';
import { GetUserProfileUseCase } from '@/use-cases/get-user-profile';
import { hash } from 'bcryptjs';

import { beforeEach, describe, expect, it } from "vitest";


let usersRepository: InMemoryUsersRepository;
let getUserProfileUseCase: GetUserProfileUseCase;

describe("GetUserProfile Use Case", () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    getUserProfileUseCase = new GetUserProfileUseCase(usersRepository);
  })

  it("should be able to get profile user", async () => {

    const createUser = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    })

    const { user } = await getUserProfileUseCase.execute({
      userId: createUser.id
    })

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual("John Doe");
  })

  it("should not be able to get profile user with wrong id", async () => {

    await expect(() => getUserProfileUseCase.execute({
      userId: "not-existing-user-id"
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

})