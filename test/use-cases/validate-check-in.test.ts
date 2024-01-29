import { ResourceNotFoundError } from '@/use-cases/erros/resource-not-found-error';
import { ValidateCheckInUseCase } from '@/use-cases/validate-check-in';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { InMemoryCheckInsRepository } from './../../src/repositories/in-memory/in-memory-check-in-repository';

let checkInsRepository: InMemoryCheckInsRepository;
let validateCheckInUseCase: ValidateCheckInUseCase;

describe('ValidateCheckInUseCase', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    validateCheckInUseCase = new ValidateCheckInUseCase(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to validate check-in ', async () => {
    vi.setSystemTime(new Date(2024, 0, 25, 8, 0, 0));

    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-id',
      user_id: 'user-id',
      created_at: new Date(),
      validated_at: null,
    });

    const { checkIn } = await validateCheckInUseCase.execute({
      checkInId: createdCheckIn.id,
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(checkIn.validated_at).toEqual(new Date(2024, 0, 25, 8, 0, 0));
  });

  it('should be able to validate an inexistent check-in ', async () => {
    await expect(() =>
      validateCheckInUseCase.execute({
        checkInId: 'inexistent-check-in-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
