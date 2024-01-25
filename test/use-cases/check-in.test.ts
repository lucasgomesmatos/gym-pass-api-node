import { CheckInUseCase } from '@/use-cases/check-in';
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckInsRepositories } from './../../src/repositories/in-memory/in-memory-check-in-repository';

let checkInsRepository: InMemoryCheckInsRepositories;
let checkInUserUseCase: CheckInUseCase;

describe("Check-In Use Case", () => {

  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepositories();
    checkInUserUseCase = new CheckInUseCase(checkInsRepository);

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
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

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2024, 0, 25, 8, 0, 0))

    await checkInUserUseCase.execute({
      gymId: "gym-id",
      userId: "user-id"
    })

    await expect(
      () => checkInUserUseCase.execute({
        gymId: "gym-id",
        userId: "user-id"
      })
    ).rejects.toBeInstanceOf(Error)

  })

  it("should be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2024, 0, 25, 8, 0, 0))

    await checkInUserUseCase.execute({
      gymId: "gym-id",
      userId: "user-id"
    })

    vi.setSystemTime(new Date(2024, 0, 26, 8, 0, 0))

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