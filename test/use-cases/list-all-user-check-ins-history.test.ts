import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-in-repository';
import { ListAllUserCheckInsHistoryUseCase } from '@/use-cases/list-all-user-check-ins-history';

import { beforeEach, describe, expect, it } from 'vitest';

let checkInsRepository: InMemoryCheckInsRepository;
let listAllUserCheckInsHistoryUseCase: ListAllUserCheckInsHistoryUseCase;

describe('ListAllUserCheckInsHistoryUseCase', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    listAllUserCheckInsHistoryUseCase = new ListAllUserCheckInsHistoryUseCase(
      checkInsRepository,
    );

    await checkInsRepository.create({
      gym_id: 'gym-id-1',
      user_id: 'user-id-1',
      validated_at: new Date(),
    });

    await checkInsRepository.create({
      gym_id: 'gym-id-2',
      user_id: 'user-id-1',
      validated_at: new Date(),
    });

    for (let i = 3; i <= 22; i++) {
      await checkInsRepository.create({
        gym_id: `gym-id-${i}`,
        user_id: 'user-id-1',
        validated_at: new Date(),
      });
    }
  });

  it('should be able to list all user check ins history', async () => {
    const { checkIns } = await listAllUserCheckInsHistoryUseCase.execute({
      userId: 'user-id-1',
    });

    expect(checkIns).toHaveLength(20);

    expect(checkIns).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          gym_id: 'gym-id-1',
          user_id: 'user-id-1',
        }),
        expect.objectContaining({
          gym_id: 'gym-id-2',
          user_id: 'user-id-1',
        }),
      ]),
    );
  });

  it('should be able to list all paginated user check ins history', async () => {
    const { checkIns } = await listAllUserCheckInsHistoryUseCase.execute({
      userId: 'user-id-1',
      page: 2,
    });

    expect(checkIns).toHaveLength(2);

    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: 'gym-id-21',
      }),
      expect.objectContaining({
        gym_id: 'gym-id-22',
      }),
    ]);
  });

  it('should be able to list all empty user check ins history', async () => {
    const { checkIns } = await listAllUserCheckInsHistoryUseCase.execute({
      userId: 'not-existing-user-id',
    });

    expect(checkIns).toEqual([]);
  });
});
