import type {
  LevelId,
  TaskSuggestion,
  TaskSuggestionModerationEvent,
  TaskSuggestionStatus,
} from './models.js';

export interface TaskSuggestionInput {
  title: string;
  levelId: LevelId;
  topic: string;
  description: string;
  contactEmail?: string;
  screenshotUrl?: string;
  source?: TaskSuggestion['source'];
}

const VALID_TRANSITIONS: Record<TaskSuggestionStatus, TaskSuggestionStatus[]> = {
  submitted: ['triage', 'needs_revision', 'rejected', 'archived'],
  triage: ['needs_revision', 'accepted', 'rejected', 'archived'],
  needs_revision: ['submitted', 'rejected', 'archived'],
  accepted: ['archived'],
  rejected: ['archived'],
  archived: [],
};

function cleanText(value: string, maxLength: number): string {
  return value.trim().replace(/\s+/g, ' ').slice(0, maxLength);
}

function isEmailLike(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validateTaskSuggestion(input: TaskSuggestionInput): string[] {
  const errors: string[] = [];

  if (!cleanText(input.title || '', 140)) errors.push('title_required');
  if (!Number.isInteger(input.levelId) || input.levelId < 1 || input.levelId > 6) errors.push('level_invalid');
  if (!cleanText(input.topic || '', 120)) errors.push('topic_required');
  if (cleanText(input.description || '', 4000).length < 40) errors.push('description_too_short');
  if (input.contactEmail && !isEmailLike(input.contactEmail)) errors.push('contact_email_invalid');

  return errors;
}

export function scoreSuggestionForModeration(input: TaskSuggestionInput): { score: number; notes: string[] } {
  const notes: string[] = [];
  let score = 0;

  if (cleanText(input.description || '', 4000).length < 120) {
    score += 20;
    notes.push('short_description');
  }
  if (!input.contactEmail) {
    score += 10;
    notes.push('no_contact_email');
  }
  if (!input.screenshotUrl) {
    score += 5;
    notes.push('no_screenshot');
  }
  if (/(prank|spam|casino|crypto)/i.test(`${input.title} ${input.description}`)) {
    score += 50;
    notes.push('spam_keyword_match');
  }

  return { score: Math.min(score, 100), notes };
}

export function createTaskSuggestion(input: TaskSuggestionInput, id: string, nowIso = new Date().toISOString()): TaskSuggestion {
  const validationErrors = validateTaskSuggestion(input);
  if (validationErrors.length) {
    throw new Error(`Invalid task suggestion: ${validationErrors.join(',')}`);
  }

  const moderation = scoreSuggestionForModeration(input);

  return {
    id,
    title: cleanText(input.title, 140),
    levelId: input.levelId,
    topic: cleanText(input.topic, 120),
    description: cleanText(input.description, 4000),
    contactEmail: input.contactEmail ? cleanText(input.contactEmail, 180).toLowerCase() : undefined,
    screenshotUrl: input.screenshotUrl ? cleanText(input.screenshotUrl, 500) : undefined,
    status: moderation.score >= 50 ? 'triage' : 'submitted',
    source: input.source || 'website',
    moderationScore: moderation.score,
    moderationNotes: moderation.notes,
    submittedAt: nowIso,
    updatedAt: nowIso,
  };
}

export function canTransitionSuggestionStatus(fromStatus: TaskSuggestionStatus, toStatus: TaskSuggestionStatus): boolean {
  return VALID_TRANSITIONS[fromStatus].includes(toStatus);
}

export function transitionTaskSuggestionStatus(
  suggestion: TaskSuggestion,
  toStatus: TaskSuggestionStatus,
  eventId: string,
  note?: string,
  moderatorUserId?: string,
  nowIso = new Date().toISOString()
): { suggestion: TaskSuggestion; event: TaskSuggestionModerationEvent } {
  if (!canTransitionSuggestionStatus(suggestion.status, toStatus)) {
    throw new Error(`Invalid task suggestion status transition: ${suggestion.status} -> ${toStatus}`);
  }

  return {
    suggestion: {
      ...suggestion,
      status: toStatus,
      updatedAt: nowIso,
    },
    event: {
      id: eventId,
      suggestionId: suggestion.id,
      fromStatus: suggestion.status,
      toStatus,
      moderatorUserId,
      note,
      createdAt: nowIso,
    },
  };
}
