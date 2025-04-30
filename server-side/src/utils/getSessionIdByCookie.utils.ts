import { NotFoundException } from '@nestjs/common';
import { Request } from 'express';

export const getSessionId = (req: Request) => {
  const sessionId: string = req.cookies['sessionId'] as string;

  if (!sessionId) throw new NotFoundException('Не найдена id сессии');

  return sessionId;
};
