import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository';
import { CreateGymUseCase } from '@/use-cases/create-gym';

import { beforeEach, describe, expect, it } from 'vitest';

let gymsRepository: InMemoryGymsRepository;
let createGymUserUseCase: CreateGymUseCase;

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    createGymUserUseCase = new CreateGymUseCase(gymsRepository);
  });

  it('should be able to create gym', async () => {
    const { gym } = await createGymUserUseCase.execute({
      name: 'Academia da cidade',
      latitude: -5.089596,
      longitude: -42.801922,
      description: null,
      phone: null,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
