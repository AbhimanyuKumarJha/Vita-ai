import dayjs from 'dayjs';
import { TimeGate } from '../models/types';

export interface TimeContext {
  dateKey: string; // YYYY-MM-DD
  timeGate: TimeGate;
  iso: string;
}

export function resolveTimeContext(input?: string | number | Date): TimeContext {
  const date = input ? dayjs(input) : dayjs();
  if (!date.isValid()) {
    throw new Error('Invalid timestamp supplied');
  }
  const hour = date.hour();
  let timeGate: TimeGate;
  if (hour < 12) {
    timeGate = 'morning';
  } else if (hour < 18) {
    timeGate = 'day';
  } else {
    timeGate = 'evening';
  }

  return {
    dateKey: date.format('YYYY-MM-DD'),
    timeGate,
    iso: date.toISOString()
  };
}

export function isWithinTimeGate(target: TimeGate, contextGate: TimeGate): boolean {
  return target === contextGate;
}

export function timeOfDayFactor(
  taskGate: TimeGate | undefined,
  contextGate: TimeGate
): number {
  if (!taskGate) {
    return 1;
  }
  return taskGate === contextGate ? 1 : 0.2;
}
