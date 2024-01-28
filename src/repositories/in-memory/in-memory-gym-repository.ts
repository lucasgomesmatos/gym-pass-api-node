import { Gym, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { randomUUID } from 'node:crypto';
import { GymsRepository } from '../gyms-repository';

export class InMemoryGymsRepository implements GymsRepository {
  private gyms: Gym[] = [];

  async findById(id: string) {
    const gym = this.gyms.find((gym) => gym.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }

  async create(data: Prisma.GymCreateInput) {
    const gym: Gym = {
      id: data.id || randomUUID(),
      name: data.name,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
      created_at: new Date(),
      description: data.description || null,
      phone: data.phone || null,
    };

    this.gyms.push(gym);
    return gym;
  }

  async searchMany(name: string, page: number) {
    const gyms = this.gyms
      .filter((gym) => gym.name.toLowerCase().includes(name.toLowerCase())).slice((page - 1) * 20, page * 20);

    return gyms;
  }
}
