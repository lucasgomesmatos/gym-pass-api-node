import { Gym, Prisma } from '@prisma/client';

export interface GymsRepository {
  create(gym: Prisma.GymCreateInput): Promise<Gym>;

  findById(id: string): Promise<Gym | null>;

  searchMany(name: string, page: number): Promise<Gym[]>;
}
