import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository';
import { ListAllNearbyGymsUseCase } from '../list-all-nearby-gyms';

export function makeListAllNearbyGymsUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository();
  const listAlNearbyUseCase = new ListAllNearbyGymsUseCase(
    prismaGymsRepository,
  );
  return listAlNearbyUseCase;
}
