import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-ropository";
import { ResourceNotFoundError } from "./err/resource-not-found-error";
import dayjs from "dayjs";
import { LateCheckInValidationError } from "./err/late-check-in-validation-error";

interface ValidateCheckInUseCaseRequest {
  checkInId: string;
}

interface ValidateCheckInUseCaseRespones {
  checkIn: CheckIn;
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseRespones> {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      "minutes",
    );

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError();
    }

    checkIn.validated_at = new Date();

    await this.checkInsRepository.save(checkIn);

    return { checkIn };
  }
}
