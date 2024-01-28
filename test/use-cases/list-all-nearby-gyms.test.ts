import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository';
import { ListAllNearbyGymsUseCase } from '@/use-cases/list-all-nearby-gyms';
import { beforeEach, describe, expect, it } from 'vitest';

let gymsRepository: InMemoryGymsRepository;
let listAllNearbyGymsUseCase: ListAllNearbyGymsUseCase;

describe('ListAllNearbyGymsUseCase', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    listAllNearbyGymsUseCase = new ListAllNearbyGymsUseCase(gymsRepository);
  });

  it('should be able list all gyms distance nearby', async () => {
    await gymsRepository.create({
      id: `gym-id`,
      name: `Gym Name 1`,
      latitude: -17.4096384,
      longitude: -41.2024832,
      description: 'Gym Description',
      phone: '123456789',
      created_at: new Date(),
    });

    await gymsRepository.create({
      id: `gym-id`,
      name: `Gym Name 2`,
      latitude: -17.2605221,
      longitude: -41.2770793,
      description: 'Gym Description',
      phone: '123456789',
      created_at: new Date(),
    });

    const { gyms } = await listAllNearbyGymsUseCase.execute({
      userLatitude: -17.4096384,
      userLongitude: -41.2024832,
    });

    expect(gyms).toHaveLength(1);
  });

  it('should be able list all empty gyms distance nearby', async () => {
    const { gyms } = await listAllNearbyGymsUseCase.execute({
      userLatitude: 0,
      userLongitude: 0,
    });

    expect(gyms).toHaveLength(0);
  });
});
