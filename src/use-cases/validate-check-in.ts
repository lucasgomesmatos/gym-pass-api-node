import { CheckIn } from '@prisma/client';
import dayjs from 'dayjs';
import { CheckInsRepository } from './../repositories/check-ins-repository';
import { LateCheckInValidateError } from './erros/late-check-in-validate-error';
import { ResourceNotFoundError } from './erros/resource-not-found-error';

interface ValidateCheckInUseCaseRequest {
  checkInId: string;
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) throw new ResourceNotFoundError();

    const distanceInMinutesFromCheckInCreationToNow = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    );

    const MAX_DISTANCE_IN_MINUTES = 20;

    if (distanceInMinutesFromCheckInCreationToNow > MAX_DISTANCE_IN_MINUTES)
      throw new LateCheckInValidateError();

    checkIn.validated_at = new Date();

    await this.checkInsRepository.save(checkIn);

    return {
      checkIn,
    };
  }
}
