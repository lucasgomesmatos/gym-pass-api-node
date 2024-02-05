import fastifyJwt from '@fastify/jwt';
import fastify from 'fastify';
import { ZodError } from 'zod';
import { environment } from './env';
import { checkInsRoutes } from './http/controllers/check-ins/routes';
import { gymsRoutes } from './http/controllers/gyms/routes';
import { usersRoutes } from './http/controllers/users/routes';

export const app = fastify();

app.register(fastifyJwt, {
  secret: environment.JWT_SECRET,
});
app.register(usersRoutes);
app.register(gymsRoutes);
app.register(checkInsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    reply.status(400).send({
      message: 'Validation error',
      issues: error.format(),
    });
  }

  if (environment.NODE_ENV !== 'production') {
    console.error(error);
  } else {
    // TODO: send error to external tool Sentry/Datadog/New Relic
  }

  reply.status(500).send({
    message: 'Internal server error',
  });
});
