import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository';
import { CheckInUseCase } from '@/use-cases/check-in';
import { Decimal } from '@prisma/client/runtime/library';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { InMemoryCheckInsRepository } from './../../src/repositories/in-memory/in-memory-check-in-repository';

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let checkInUserUseCase: CheckInUseCase;

// -17.4096384,-41.2024832

describe('Check-In Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    checkInUserUseCase = new CheckInUseCase(checkInsRepository, gymsRepository);

    gymsRepository.gyms.push({
      id: 'gym-id',
      name: 'Gym Name',
      latitude: new Decimal(-17.4096384),
      longitude: new Decimal(-41.2024832),
      description: 'Gym Description',
      phone: '123456789',
      created_at: new Date(),
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in', async () => {
    const { checkIn } = await checkInUserUseCase.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -17.4096384,
      userLongitude: -41.2024832,
    });

    expect(checkIn.id).toEqual(expect.any(String));
    expect(checkIn).toHaveProperty('id');
    expect(checkIn).toHaveProperty('gym_id');
    expect(checkIn).toHaveProperty('user_id');
  });

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2024, 0, 25, 8, 0, 0));

    await checkInUserUseCase.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -17.4096384,
      userLongitude: -41.2024832,
    });

    await expect(() =>
      checkInUserUseCase.execute({
        gymId: 'gym-id',
        userId: 'user-id',
        userLatitude: -17.4096384,
        userLongitude: -41.2024832,
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2024, 0, 25, 8, 0, 0));

    await checkInUserUseCase.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -17.4096384,
      userLongitude: -41.2024832,
    });

    vi.setSystemTime(new Date(2024, 0, 26, 8, 0, 0));

    const { checkIn } = await checkInUserUseCase.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -17.4096384,
      userLongitude: -41.2024832,
    });

    expect(checkIn.id).toEqual(expect.any(String));
    expect(checkIn).toHaveProperty('id');
    expect(checkIn).toHaveProperty('gym_id');
    expect(checkIn).toHaveProperty('user_id');
  });

  it('should not be able to check on distant gym', async () => {
    vi.setSystemTime(new Date(2024, 0, 25, 8, 0, 0));

    gymsRepository.gyms.push({
      id: 'gym-id-2',
      name: 'Gym Name',
      latitude: new Decimal(-17.4123787),
      longitude: new Decimal(-41.1717175),
      description: 'Gym Description',
      phone: '123456789',
      created_at: new Date(),
    });

    // -17.0705928,-40.677886

    await expect(() =>
      checkInUserUseCase.execute({
        gymId: 'gym-id-2',
        userId: 'user-id',
        userLatitude: -17.4096384,
        userLongitude: -41.2024832,
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
