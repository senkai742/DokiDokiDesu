export type LessonPhase = 'vocab' | 'grammar' | 'kanji' | 'quiz';

export interface VocabWord {
  id: string;
  kanji: string;
  kana: string;
  romaji: string;
  english: string;
  partOfSpeech: string;
  exampleSentence?: string;
  exampleEnglish?: string;
}

export interface GrammarExample {
  id: string;
  type: 'static' | 'toggle' | 'table';
  formula: string;
  explanation: string;
  examples: {
    primary: string;
    secondary?: string;
    englishPrimary: string;
    englishSecondary?: string;
    romajiPrimary: string;
    romajiSecondary?: string;
    tokens: {
      text: string;
      type: 'noun' | 'particle' | 'predicate' | 'text';
      note?: string;
    }[];
    tokensSecondary?: {
      text: string;
      type: 'noun' | 'particle' | 'predicate' | 'text';
      note?: string;
    }[];
  }[];
  table?: {
    headers: string[];
    rows: string[][];
  };
}

export interface GrammarRule {
  id: string;
  title: string;
  explanation: string;
  examples: {
    japanese: string;
    english: string;
    romaji: string;
  }[];
}

export interface KanjiCard {
  id: string;
  character: string;
  onYomi: string;
  kunYomi: string;
  meaning: string;
  strokeCount: number;
  examples: {
    word: string;
    reading: string;
    meaning: string;
  }[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  type: 'multiple-choice' | 'translation' | 'listening';
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  vocab: VocabWord[];
  grammar: GrammarRule[];
  kanji: KanjiCard[];
  quiz: QuizQuestion[];
}

export interface UserProgress {
  lessonId: number;
  phase: LessonPhase;
  completed: boolean;
  score?: number;
  lastAccessed: string;
}

export interface Collection {
  id: string;
  name: string;
  emoji: string;
  wordIds: string[]; // prefixed as "L{lessonId}_{wordId}" for global uniqueness
  createdAt: string;
}

export interface GlobalProgress {
  // Vocab progress - completely independent
  completedVocabLessons: number[];
  currentVocabLessonId: number;
  vocabLearned: number;
  learnedVocabIds: string[];
  // Grammar progress - completely independent
  completedGrammarLessons: number[];
  currentGrammarLessonId: number;
  grammarLearned: number;
  learnedGrammarIds: string[];
  // Kanji - just a list, not lessons
  kanjiMastered: number;
  learnedKanjiIds: string[];
  // General progress
  unlockedLevels: string[]; // ['N5', 'N4', etc.]
  hasCompletedOnboarding: boolean;
  streakDays: number;
  lastActiveDate: string;
  favorites: string[]; // global word IDs: "L{lessonId}_{wordId}"
  difficultWords: string[];
  studyMinutes: number;
  studyHistory: { date: string; minutes: number; vocabLessons: number[]; grammarLessons: number[] }[];
  collections: Collection[];
}
