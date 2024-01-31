import fastifyJwt from '@fastify/jwt';
import fastify from 'fastify';
import { ZodError } from 'zod';
import { environment } from './env';
import { appRoutes } from './http/routes';

export const app = fastify();

app.register(fastifyJwt, {
  secret: environment.JWT_SECRET,
});
app.register(appRoutes);

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
