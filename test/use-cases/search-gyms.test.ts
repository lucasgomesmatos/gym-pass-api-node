import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository';
import { SearchGymsUseCase } from '@/use-cases/search-gyms';
import { beforeEach, describe, expect, it } from 'vitest';


let gymsRepository: InMemoryGymsRepository;
let searchGymsUseCase: SearchGymsUseCase;

describe('SearchGymsUseCase', () => {
  beforeEach(async () => {

    gymsRepository = new InMemoryGymsRepository();
    searchGymsUseCase = new SearchGymsUseCase(gymsRepository);

    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        id: `gym-id-${i}`,
        name: `Gym Name ${i}`,
        latitude: -17.4096384,
        longitude: -41.2024832,
        description: 'Gym Description',
        phone: '123456789',
        created_at: new Date(),
      });
    }

  });

  it('should be able to search for gyms', async () => {
    const { gyms } = await searchGymsUseCase.execute({
      query: 'Gym',
      page: 1,
    })

    expect(gyms).toHaveLength(20);
  });

  it('should be able to search for empty gyms', async () => {
    const { gyms } = await searchGymsUseCase.execute({
      query: 'hehehehehe',
      page: 1,
    })

    expect(gyms).toHaveLength(0);
  });

  it('should be able to search paginated for gyms', async () => {
    const { gyms } = await searchGymsUseCase.execute({
      query: 'Gym',
      page: 2,
    })

    expect(gyms).toHaveLength(2);

    expect(gyms).toEqual([
      expect.objectContaining({
        name: 'Gym Name 21',
      }),
      expect.objectContaining({
        name: 'Gym Name 22',
      }),
    ]);
  });
});
