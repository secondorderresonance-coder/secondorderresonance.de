import type { UserStreak } from './models.js';

interface DateParts {
  year: number;
  month: number;
  day: number;
}

function getDatePartsInTimeZone(date: Date, timeZone: string): DateParts {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const parts = formatter.formatToParts(date);
  const year = Number(parts.find((p) => p.type === 'year')?.value);
  const month = Number(parts.find((p) => p.type === 'month')?.value);
  const day = Number(parts.find((p) => p.type === 'day')?.value);

  if (!year || !month || !day) {
    throw new Error('Could not extract date parts for timezone conversion.');
  }

  return { year, month, day };
}

function toDateKey(parts: DateParts): string {
  const month = String(parts.month).padStart(2, '0');
  const day = String(parts.day).padStart(2, '0');
  return `${parts.year}-${month}-${day}`;
}

export function getLocalDateKey(date: Date, timeZone: string): string {
  return toDateKey(getDatePartsInTimeZone(date, timeZone));
}

function keyToUtcEpochDay(dateKey: string): number {
  const [yearRaw, monthRaw, dayRaw] = dateKey.split('-');
  const year = Number(yearRaw);
  const month = Number(monthRaw);
  const day = Number(dayRaw);
  const utcMidnight = Date.UTC(year, month - 1, day);
  return Math.floor(utcMidnight / 86_400_000);
}

function previousDateKey(dateKey: string): string {
  const [yearRaw, monthRaw, dayRaw] = dateKey.split('-');
  const date = new Date(Date.UTC(Number(yearRaw), Number(monthRaw) - 1, Number(dayRaw)));
  date.setUTCDate(date.getUTCDate() - 1);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function buildDateKeySet(dateKeys: string[]): Set<string> {
  return new Set(dateKeys.filter(Boolean));
}

/**
 * Calculates the current streak from recorded user activity dates.
 * Rule: streak continues if user was active today OR yesterday (in user timezone),
 * then counts backwards on consecutive active days.
 */
export function calculateCurrentStreak(dateKeys: string[], todayKey: string): number {
  const keys = buildDateKeySet(dateKeys);
  if (!keys.has(todayKey)) {
    const yesterdayKey = previousDateKey(todayKey);
    if (!keys.has(yesterdayKey)) return 0;
  }

  let streak = 0;
  let cursor = keys.has(todayKey) ? todayKey : previousDateKey(todayKey);

  while (keys.has(cursor)) {
    streak += 1;
    cursor = previousDateKey(cursor);
  }

  return streak;
}

/**
 * Applies one activity event (idempotent by date key) and returns updated streak metrics.
 */
export function applyActivityToStreak(
  previous: UserStreak,
  activityAt: Date,
  timeZone: string,
  knownActivityDates: string[]
): UserStreak {
  const activityKey = getLocalDateKey(activityAt, timeZone);
  const merged = buildDateKeySet(knownActivityDates);
  merged.add(activityKey);

  const todayKey = getLocalDateKey(new Date(), timeZone);
  const currentStreak = calculateCurrentStreak([...merged], todayKey);
  const bestStreak = Math.max(previous.bestStreak, currentStreak);

  return {
    ...previous,
    currentStreak,
    bestStreak,
    lastActivityDate: activityKey,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Helper for weekly leaderboard bucket key, ISO week approximation using UTC day math.
 */
export function toIsoWeekKey(date: Date): { isoYear: number; isoWeek: number } {
  const target = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const dayNr = (target.getUTCDay() + 6) % 7;
  target.setUTCDate(target.getUTCDate() - dayNr + 3);
  const firstThursday = new Date(Date.UTC(target.getUTCFullYear(), 0, 4));
  const firstThursdayDayNr = (firstThursday.getUTCDay() + 6) % 7;
  firstThursday.setUTCDate(firstThursday.getUTCDate() - firstThursdayDayNr + 3);

  const week = 1 + Math.round((keyToUtcEpochDay(toDateKey(getDatePartsInTimeZone(target, 'UTC'))) - keyToUtcEpochDay(toDateKey(getDatePartsInTimeZone(firstThursday, 'UTC')))) / 7);

  return {
    isoYear: target.getUTCFullYear(),
    isoWeek: week,
  };
}
