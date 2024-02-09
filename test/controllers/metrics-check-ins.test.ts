import { prisma } from '@/lib/prisma';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { app } from '../../src/app';
import { createAndAuthenticatedUser } from './utils/create-and-authenticate-user';

describe('Check-In Metrics e2e', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to get the count check-in', async () => {
    const { token } = await createAndAuthenticatedUser(app);

    const gym = await prisma.gym.create({
      data: {
        name: 'Academia do JavaScript',
        latitude: -23.5505199,
        longitude: -46.6333094,
      }
    })

    const user = await prisma.user.findFirstOrThrow()

    await prisma.checkIn.createMany({
      data: [
        {
          user_id: user.id,
          gym_id: gym.id,

        },
        {
          user_id: user.id,
          gym_id: gym.id,
        }
      ]
    })

    const response = await request(app.server)
      .get(`/check-ins/metrics`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body.checkInsCount).toBe(2);
  });
});
