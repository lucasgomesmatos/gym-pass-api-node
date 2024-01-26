import { CheckIn, Prisma } from "@prisma/client";
import dayjs from "dayjs";
import { randomUUID } from "node:crypto";
import { CheckInsRepository } from "../check-ins-repository";

export class InMemoryCheckInsRepository implements CheckInsRepository {

  private checkIns: CheckIn[] = [];

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn: CheckIn = {
      id: randomUUID(),
      gym_id: data.gym_id,
      user_id: data.user_id,
      created_at: new Date,
      validated_at: data.validated_at ? new Date : null,
    }

    this.checkIns.push(checkIn);
    return checkIn;
  }

  async findByUserIdOnDate(userId: string, date: Date) {

    const startOfDay = dayjs(date).startOf("day");
    const endOfDay = dayjs(date).endOf("day");

    const checkInOnSameDate = this.checkIns.find(checkIn => {
      const checkInDate = dayjs(checkIn.created_at);
      const isSameDay = checkInDate.isAfter(startOfDay) && checkInDate.isBefore(endOfDay);

      return checkIn.user_id === userId && isSameDay;
    }
    );

    if (!checkInOnSameDate) {
      return null
    }

    return checkInOnSameDate;
  }




}