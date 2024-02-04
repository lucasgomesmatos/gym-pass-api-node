import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';
import { create } from './create';
import { history } from './history';
import { metrics } from './metrics';

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt);

  app.get('/checkIns/:gymId/check-ins', create);
  app.get('/check-ins/metrics', metrics);
  app.get('/check-ins/history', history);
  app.patch('/checkIns/:checkInId/validate', create);

}
