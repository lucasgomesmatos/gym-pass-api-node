import { UsersRepository } from '@/repositories/users-repository';
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from './erros/user-already-exists-error';

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string

}

// SOLID

// D - Dependency Inversion Principle

export class RegisterUserUseCase {

  constructor(private usersRepository: UsersRepository) { }

  async execute({
    name,
    email,
    password,

  }: RegisterUseCaseRequest) {
    const passwordHash = await hash(password, 6)

    const userWithEmailAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userWithEmailAlreadyExists) {
      throw new UserAlreadyExistsError()
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash
    })

  }
}

