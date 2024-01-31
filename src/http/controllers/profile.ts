import { FastifyReply, FastifyRequest } from 'fastify';

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  // const registerUserBodySchema = z.object({
  //   name: z.string(),
  //   email: z.string().email(),
  //   password: z.string().min(6),
  // })

  // const { name, email, password } = registerUserBodySchema.parse(request.body)

  // try {
  //   const registerUserUseCase = makeRegisterUseCase()

  //   await registerUserUseCase.execute({
  //     name,
  //     email,
  //     password,
  //   })
  // } catch (error) {

  //   if (error instanceof UserAlreadyExistsError) {
  //     return reply.status(409).send({
  //       message: error.message
  //     })
  //   }
  //   throw error

  // }

  return reply.status(200).send();
}
