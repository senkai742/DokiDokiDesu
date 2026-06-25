import { VocabWord } from '../types/lesson';
import {
  LESSON_1_VOCAB, LESSON_2_VOCAB, LESSON_3_VOCAB, LESSON_4_VOCAB, LESSON_5_VOCAB,
  LESSON_6_VOCAB, LESSON_7_VOCAB, LESSON_8_VOCAB, LESSON_9_VOCAB, LESSON_10_VOCAB,
  LESSON_11_VOCAB, LESSON_12_VOCAB, LESSON_13_VOCAB, LESSON_14_VOCAB, LESSON_15_VOCAB,
  LESSON_16_VOCAB, LESSON_17_VOCAB, LESSON_18_VOCAB, LESSON_19_VOCAB, LESSON_20_VOCAB,
  LESSON_21_VOCAB, LESSON_22_VOCAB, LESSON_23_VOCAB, LESSON_24_VOCAB, LESSON_25_VOCAB,
} from '../constants/vocab';

const LESSON_VOCAB: Record<number, VocabWord[]> = {
  1: LESSON_1_VOCAB, 2: LESSON_2_VOCAB, 3: LESSON_3_VOCAB, 4: LESSON_4_VOCAB,
  5: LESSON_5_VOCAB, 6: LESSON_6_VOCAB, 7: LESSON_7_VOCAB, 8: LESSON_8_VOCAB,
  9: LESSON_9_VOCAB, 10: LESSON_10_VOCAB, 11: LESSON_11_VOCAB, 12: LESSON_12_VOCAB,
  13: LESSON_13_VOCAB, 14: LESSON_14_VOCAB, 15: LESSON_15_VOCAB, 16: LESSON_16_VOCAB,
  17: LESSON_17_VOCAB, 18: LESSON_18_VOCAB, 19: LESSON_19_VOCAB, 20: LESSON_20_VOCAB,
  21: LESSON_21_VOCAB, 22: LESSON_22_VOCAB, 23: LESSON_23_VOCAB, 24: LESSON_24_VOCAB,
  25: LESSON_25_VOCAB,
};

/** Build a globally unique ID for a vocab word: "L{lessonId}_{wordId}" */
export const makeGlobalWordId = (lessonId: number, wordId: string) =>
  `L${lessonId}_${wordId}`;

/** Parse a global word ID back to { lessonId, wordId } */
export const parseGlobalWordId = (globalId: string) => {
  const match = globalId.match(/^L(\d+)_(.+)$/);
  if (!match) return null;
  return { lessonId: parseInt(match[1], 10), wordId: match[2] };
};

/** Resolve a global word ID to its VocabWord, or null if not found */
export const resolveWord = (globalId: string): (VocabWord & { lessonId: number }) | null => {
  const parsed = parseGlobalWordId(globalId);
  if (!parsed) return null;
  const words = LESSON_VOCAB[parsed.lessonId];
  if (!words) return null;
  const word = words.find(w => w.id === parsed.wordId);
  if (!word) return null;
  return { ...word, lessonId: parsed.lessonId };
};

/** Resolve an array of global word IDs, skipping any that can't be found */
export const resolveWords = (globalIds: string[]): (VocabWord & { lessonId: number; globalId: string })[] =>
  globalIds
    .map(id => {
      const word = resolveWord(id);
      return word ? { ...word, globalId: id } : null;
    })
    .filter((w): w is VocabWord & { lessonId: number; globalId: string } => w !== null);
