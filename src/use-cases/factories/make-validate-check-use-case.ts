import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';
import { ValidateCheckInUseCase } from '../validate-check-in';

export function makeValidateCheckInUseCase() {
  const prismaChecksRepository = new PrismaCheckInsRepository();
  const validateCheckUseCase = new ValidateCheckInUseCase(
    prismaChecksRepository,
  );
  return validateCheckUseCase;
}
