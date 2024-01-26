import { Gym } from "@prisma/client";

export interface GymsRepository {

  create(gym: Gym): Promise<Gym>

  findById(id: string): Promise<Gym | null>

}