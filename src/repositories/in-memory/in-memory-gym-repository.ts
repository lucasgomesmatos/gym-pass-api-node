import { Gym, Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { randomUUID } from "node:crypto";
import { GymsRepository } from "../gyms-repository";

export class InMemoryGymsRepository implements GymsRepository {

  public gyms: Gym[] = [];

  async findById(id: string) {
    const gym = this.gyms.find(gym => gym.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }

  async create(data: Prisma.GymUncheckedCreateInput) {
    const gym: Gym = {
      id: randomUUID(),
      name: data.name,
      latitude: new Decimal(Number(data.latitude)),
      longitude: new Decimal(Number(data.longitude)),
      created_at: new Date,
      description: data.description || '',
      phone: data.phone || '',
    }

    this.gyms.push(gym);
    return gym;
  }

}