import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-in-repository';
import { GetUserMetricsUseCase } from '@/use-cases/get-user-metrics';

import { beforeEach, describe, expect, it } from 'vitest';

let checkInsRepository: InMemoryCheckInsRepository;
let getUserMetricsUseCase: GetUserMetricsUseCase;

describe('GetUserMetricsUseCase Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    getUserMetricsUseCase = new GetUserMetricsUseCase(checkInsRepository);

    await checkInsRepository.create({
      gym_id: 'gym-id',
      user_id: 'user-id',
    });
  });

  it('should be able to get check-ins count from metrics user', async () => {
    const { checkInsCount } = await getUserMetricsUseCase.execute({
      userId: 'user-id',
    });

    expect(checkInsCount).toEqual(1);
  });
});
