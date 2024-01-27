import { CheckInsRepository } from '@/repositories/check-ins-repository';
import { CheckIn } from '@prisma/client';

interface ListAllUserCheckInsHistoryUseCaseRequest {
  userId: string;
  page?: number;
}

interface ListAllUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[];
}

export class ListAllUserCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page = 1,
  }: ListAllUserCheckInsHistoryUseCaseRequest): Promise<ListAllUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    );

    return {
      checkIns,
    };
  }
}
