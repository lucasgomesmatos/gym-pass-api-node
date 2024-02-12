import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { app } from '../../src/app';
import { createAndAuthenticatedUser } from './utils/create-and-authenticate-user';

describe('Search Gyms e2e', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to search a gym', async () => {
    const { token } = await createAndAuthenticatedUser(app, true);

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Academia do JavaScript',
        description: 'A melhor academia do bairro',
        phone: '11999999999',
        latitude: -23.5505199,
        longitude: -46.6333094,
      });

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Academia do TypeScript',
        description: 'A melhor academia do bairro',
        phone: '11999999999',
        latitude: -23.5505199,
        longitude: -46.6333094,
      });

    const response = await request(app.server)
      .get('/gyms/search')
      .set('Authorization', `Bearer ${token}`)
      .query({
        query: 'JavaScript',
        page: 1,
      });
    expect(response.status).toBe(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({ name: 'Academia do JavaScript' }),
    ]);
  });
});
