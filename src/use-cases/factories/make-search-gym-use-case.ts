import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository';
import { SearchGymsUseCase } from '../search-gyms';

export function makeSearchGymUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository();
  const searchGymUseCase = new SearchGymsUseCase(prismaGymsRepository);
  return searchGymUseCase;
}
