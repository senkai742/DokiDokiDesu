import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LessonPhase, GlobalProgress } from '../types/lesson';

interface AppState {
  progress: GlobalProgress;
  completeOnboarding: (knowsSomeJapanese: boolean) => void;
  addFavorite: (wordId: string) => void;
  removeFavorite: (wordId: string) => void;
  addDifficultWord: (wordId: string) => void;
  removeDifficultWord: (wordId: string) => void;
  recordStudyTime: (minutes: number) => void;
  recordStudySession: (minutes: number, lessonId?: number) => void;
  setLessonCompleted: (lessonId: number) => void;
  setCurrentPhase: (phase: LessonPhase) => void;
  setCurrentLesson: (lessonId: number) => void;
  unlockLevel: (level: string) => void;
  syncProgress: () => Promise<void>;
  recordActivity: () => void;
  incrementKanji: (count?: number) => void;
  incrementVocab: (count?: number) => void;
  incrementGrammar: (count?: number) => void;
  markKanjiLearned: (kanjiId: string) => void;
  markVocabLearned: (vocabId: string) => void;
  markGrammarLearned: (grammarId: string) => void;
}

const initialState: GlobalProgress = {
  completedLessons: [],
  currentLessonId: 1,
  currentPhase: 'vocab',
  unlockedLevels: ['N5'],
  hasCompletedOnboarding: false,
  streakDays: 0,
  lastActiveDate: '',
  kanjiMastered: 0,
  learnedKanjiIds: [],
  vocabLearned: 0,
  learnedVocabIds: [],
  grammarLearned: 0,
  learnedGrammarIds: [],
  favorites: [],
  difficultWords: [],
  studyMinutes: 0,
  studyHistory: [], // Array of {date: string, minutes: number, lessonsCompleted: number[]}
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      progress: initialState,

      completeOnboarding: (knowsSomeJapanese: boolean) => {
        set((state) => ({
          progress: {
            ...state.progress,
            hasCompletedOnboarding: true,
            currentLessonId: knowsSomeJapanese ? 25 : 1, // Unlock all if they know some
            completedLessons: knowsSomeJapanese 
              ? Array.from({ length: 25 }, (_, i) => i + 1) 
              : [],
          },
        }));
      },

      setLessonCompleted: (lessonId: number) => {
        set((state) => ({
          progress: {
            ...state.progress,
            completedLessons: [...new Set([...state.progress.completedLessons, lessonId])],
            // Auto-unlock next lesson if it's the current one
            currentLessonId: state.progress.currentLessonId === lessonId ? lessonId + 1 : state.progress.currentLessonId,
          },
        }));
      },

      setCurrentPhase: (phase: LessonPhase) => {
        set((state) => ({
          progress: { ...state.progress, currentPhase: phase },
        }));
      },

      setCurrentLesson: (lessonId: number) => {
        set((state) => ({
          progress: { ...state.progress, currentLessonId: lessonId },
        }));
      },

      unlockLevel: (level: string) => {
        set((state) => ({
          progress: {
            ...state.progress,
            unlockedLevels: [...new Set([...state.progress.unlockedLevels, level])],
          },
        }));
      },

      syncProgress: async () => {
        // Logic to sync with cloud when connection is detected
        // This would be called by a background sync listener
        console.log('Syncing progress to cloud...', get().progress);
      },

      recordActivity: () => {
        set((state) => {
          const today = new Date().toISOString().split('T')[0];
          const lastActive = state.progress.lastActiveDate;
          if (lastActive === today) return state; // Already active today
          
          let streak = state.progress.streakDays;
          if (lastActive) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            if (lastActive === yesterday.toISOString().split('T')[0]) {
              streak += 1;
            } else {
              streak = 1;
            }
          } else {
            streak = 1;
          }
          
          return {
            progress: {
              ...state.progress,
              streakDays: streak,
              lastActiveDate: today,
            }
          };
        });
      },

      incrementKanji: (count = 1) => {
        set((state) => ({
          progress: { ...state.progress, kanjiMastered: state.progress.kanjiMastered + count }
        }));
      },

      markKanjiLearned: (kanjiId: string) => {
        set((state) => {
          if (state.progress.learnedKanjiIds.includes(kanjiId)) {
            return state; // Already learned, don't double count
          }
          return {
            progress: {
              ...state.progress,
              kanjiMastered: state.progress.kanjiMastered + 1,
              learnedKanjiIds: [...state.progress.learnedKanjiIds, kanjiId],
            }
          };
        });
      },

      markVocabLearned: (vocabId: string) => {
        set((state) => {
          if (state.progress.learnedVocabIds.includes(vocabId)) {
            return state;
          }
          return {
            progress: {
              ...state.progress,
              vocabLearned: state.progress.vocabLearned + 1,
              learnedVocabIds: [...state.progress.learnedVocabIds, vocabId],
            }
          };
        });
      },

      markGrammarLearned: (grammarId: string) => {
        set((state) => {
          if (state.progress.learnedGrammarIds.includes(grammarId)) {
            return state;
          }
          return {
            progress: {
              ...state.progress,
              grammarLearned: state.progress.grammarLearned + 1,
              learnedGrammarIds: [...state.progress.learnedGrammarIds, grammarId],
            }
          };
        });
      },

      incrementVocab: (count = 1) => {
        set((state) => ({
          progress: { ...state.progress, vocabLearned: state.progress.vocabLearned + count }
        }));
      },

      incrementGrammar: (count = 1) => {
        set((state) => ({
          progress: { ...state.progress, grammarLearned: state.progress.grammarLearned + count }
        }));
      },

      addFavorite: (wordId: string) => {
        set((state) => ({
          progress: {
            ...state.progress,
            favorites: [...new Set([...state.progress.favorites, wordId])]
          }
        }));
      },

      removeFavorite: (wordId: string) => {
        set((state) => ({
          progress: {
            ...state.progress,
            favorites: state.progress.favorites.filter(id => id !== wordId)
          }
        }));
      },

      addDifficultWord: (wordId: string) => {
        set((state) => ({
          progress: {
            ...state.progress,
            difficultWords: [...new Set([...state.progress.difficultWords, wordId])]
          }
        }));
      },

      removeDifficultWord: (wordId: string) => {
        set((state) => ({
          progress: {
            ...state.progress,
            difficultWords: state.progress.difficultWords.filter(id => id !== wordId)
          }
        }));
      },

      recordStudyTime: (minutes: number) => {
        set((state) => ({
          progress: {
            ...state.progress,
            studyMinutes: state.progress.studyMinutes + minutes
          }
        }));
      },

      recordStudySession: (minutes: number, lessonId?: number) => {
        set((state) => {
          const today = new Date().toISOString().split('T')[0];
          const existingEntry = state.progress.studyHistory.find(h => h.date === today);
          
          let newHistory;
          if (existingEntry) {
            newHistory = state.progress.studyHistory.map(h =>
              h.date === today
                ? { ...h, minutes: h.minutes + minutes, lessonsCompleted: lessonId ? [...new Set([...h.lessonsCompleted, lessonId])] : h.lessonsCompleted }
                : h
            );
          } else {
            newHistory = [...state.progress.studyHistory, { date: today, minutes, lessonsCompleted: lessonId ? [lessonId] : [] }];
          }
          
          return {
            progress: {
              ...state.progress,
              studyMinutes: state.progress.studyMinutes + minutes,
              studyHistory: newHistory
            }
          };
        });
      },
    }),
    {
      name: 'dokidoki-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
