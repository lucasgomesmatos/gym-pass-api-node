import { CheckInUseCase } from '@/use-cases/check-in';
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCheckInsRepositories } from './../../src/repositories/in-memory/in-memory-check-in-repository';

let checkInsRepository: InMemoryCheckInsRepositories;
let checkInUserUseCase: CheckInUseCase;

describe("Check-In Use Case", () => {

  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepositories();
    checkInUserUseCase = new CheckInUseCase(checkInsRepository);
  })

  it("should be able to check in", async () => {
    const { checkIn } = await checkInUserUseCase.execute({
      gymId: "gym-id",
      userId: "user-id"
    })

    expect(checkIn.id).toEqual(expect.any(String));
    expect(checkIn).toHaveProperty("id");
    expect(checkIn).toHaveProperty("gym_id");
    expect(checkIn).toHaveProperty("user_id");
  })
})