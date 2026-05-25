import type { RegisteredAccountListItem, UserLevelProgress, UserProfile, UserStreak } from './models.js';

export function toRegisteredAccountListItem(
  profile: UserProfile,
  levelProgress: UserLevelProgress[],
  streak?: UserStreak
): RegisteredAccountListItem {
  return {
    userId: profile.id,
    firebaseUid: profile.firebaseUid,
    email: profile.email,
    displayName: profile.displayName,
    createdAt: profile.createdAt,
    updatedAt: profile.updatedAt,
    lastActivityDate: streak?.lastActivityDate,
    currentStreak: streak?.currentStreak || 0,
    totalXp: levelProgress.reduce((sum, entry) => sum + Math.max(0, entry.xpTotal), 0),
  };
}

export function sortRegisteredAccountsByNewest(accounts: RegisteredAccountListItem[]): RegisteredAccountListItem[] {
  return [...accounts].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
}
