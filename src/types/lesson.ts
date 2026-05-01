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

export interface GlobalProgress {
  completedLessons: number[];
  currentLessonId: number;
  currentPhase: LessonPhase;
  unlockedLevels: string[]; // ['N5', 'N4', etc.]
  hasCompletedOnboarding: boolean;
  streakDays: number;
  lastActiveDate: string;
  kanjiMastered: number;
  learnedKanjiIds: string[]; // Track specific kanji learned to prevent double-counting
  vocabLearned: number;
  learnedVocabIds: string[]; // Track specific vocab learned
  grammarLearned: number;
  learnedGrammarIds: string[]; // Track specific grammar learned
  favorites: string[];
  difficultWords: string[];
  studyMinutes: number;
  studyHistory: { date: string; minutes: number; lessonsCompleted: number[] }[];
}
