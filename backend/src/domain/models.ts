export type LevelId = 1 | 2 | 3 | 4 | 5 | 6;

export interface UserProfile {
  id: string;
  firebaseUid: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  heartsEnabled: boolean;
  heartsMax: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserLevelProgress {
  userId: string;
  levelId: LevelId;
  completedLessons: number;
  totalLessons: number;
  completionRatio: number; // 0.0 - 1.0
  unlocked: boolean;
  xpTotal: number;
  correctAnswers: number;
  totalAnswers: number;
  updatedAt: string;
}

export interface UserLessonProgress {
  userId: string;
  lessonId: string;
  completed: boolean;
  completionRatio: number; // 0.0 - 1.0
  xpEarned: number;
  correctAnswers: number;
  totalAnswers: number;
  lastActivityAt?: string;
}

export interface ExerciseAttempt {
  id: string;
  userId: string;
  lessonId: string;
  isCorrect: boolean;
  xpDelta: number;
  heartsDelta: number;
  createdAt: string;
}

export interface UserStreak {
  userId: string;
  currentStreak: number;
  bestStreak: number;
  lastActivityDate?: string; // YYYY-MM-DD in user timezone
  updatedAt: string;
}

export interface WeeklyLeaderboardEntry {
  userId: string;
  isoYear: number;
  isoWeek: number;
  xpTotal: number;
  rankPosition?: number;
}

export const LEVEL_UNLOCK_THRESHOLD = 0.8;

export function isNextLevelUnlocked(currentLevelCompletionRatio: number): boolean {
  return currentLevelCompletionRatio >= LEVEL_UNLOCK_THRESHOLD;
}

export function calculateCompletionRatio(completed: number, total: number): number {
  if (total <= 0) return 0;
  const ratio = completed / total;
  return Math.max(0, Math.min(1, ratio));
}

export function createInitialLevelProgress(userId: string, levelId: LevelId, totalLessons: number): UserLevelProgress {
  return {
    userId,
    levelId,
    completedLessons: 0,
    totalLessons,
    completionRatio: 0,
    unlocked: levelId === 1,
    xpTotal: 0,
    correctAnswers: 0,
    totalAnswers: 0,
    updatedAt: new Date().toISOString(),
  };
}
