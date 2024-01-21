import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { UserAlreadyExistsError } from '@/use-cases/erros/user-already-exists-error';
import { RegisterUserUseCase } from '@/use-cases/register-user';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';


export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerUserBody = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(7),
  })

  const { name, email, password } = registerUserBody.parse(request.body)

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const registerUserUseCase = new RegisterUserUseCase(prismaUsersRepository)

    await registerUserUseCase.execute({
      name,
      email,
      password,
    })
  } catch (error) {

    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message
      })


    }
    return reply.status(500).send() // TODO: Create a generic error handler

  }

  return reply.status(201).send()
}
