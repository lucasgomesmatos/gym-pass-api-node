import { GymsRepository } from '@/repositories/gyms-repository';
import type { Gym } from '@prisma/client';

interface ListAllNearbyGymsUseCaseRequest {
  userLatitude: number;
  userLongitude: number;
}

interface ListAllNearbyGymsUseCaseResponse {
  gyms: Gym[];
}

export class ListAllNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: ListAllNearbyGymsUseCaseRequest): Promise<ListAllNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return {
      gyms,
    };
  }
}
