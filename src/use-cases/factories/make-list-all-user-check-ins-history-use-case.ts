import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';
import { ListAllUserCheckInsHistoryUseCase } from '../list-all-user-check-ins-history';

export function makeListAllUserCheckInsHistoryUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository();
  const listAllUserCheckInsHistoryUseCase =
    new ListAllUserCheckInsHistoryUseCase(prismaCheckInsRepository);
  return listAllUserCheckInsHistoryUseCase;
}
