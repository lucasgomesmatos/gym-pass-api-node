import { prisma } from '@/lib/prisma';
import { Gym, Prisma } from '@prisma/client';
import { FindManyNearByParams, GymsRepository } from '../gyms-repository';

export class PrismaGymsRepository implements GymsRepository {
  async create(gym: Prisma.GymCreateInput) {
    const newGym = await prisma.gym.create({
      data: gym,
    });

    return newGym;
  }
  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    });

    return gym;
  }
  async searchMany(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      skip: (page - 1) * 20,
      take: 20,
    });

    return gyms;
  }
  async findManyNearby({ latitude, longitude }: FindManyNearByParams) {
    const gyms = await prisma.$queryRaw<Gym[]>`
    SELECT * FROM gyms WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;

    return gyms;
  }
}
