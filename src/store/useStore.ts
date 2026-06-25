import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LessonPhase, GlobalProgress, Collection } from '../types/lesson';

interface AppState {
  progress: GlobalProgress;
  completeOnboarding: (knowsSomeJapanese: boolean) => void;
  completeVocabLesson: (lessonId: number) => void;
  completeGrammarLesson: (lessonId: number) => void;
  setVocabLesson: (lessonId: number) => void;
  setGrammarLesson: (lessonId: number) => void;
  addFavorite: (wordId: string) => void;
  removeFavorite: (wordId: string) => void;
  addDifficultWord: (wordId: string) => void;
  removeDifficultWord: (wordId: string) => void;
  recordStudyTime: (minutes: number) => void;
  recordStudySession: (minutes: number, vocabLessonId?: number, grammarLessonId?: number) => void;
  unlockLevel: (level: string) => void;
  syncProgress: () => Promise<void>;
  recordActivity: () => void;
  incrementKanji: (count?: number) => void;
  incrementVocab: (count?: number) => void;
  incrementGrammar: (count?: number) => void;
  markKanjiLearned: (kanjiId: string) => void;
  markVocabLearned: (vocabId: string) => void;
  markGrammarLearned: (grammarId: string) => void;
  resetProgress: () => void;
  // Collections
  createCollection: (name: string, emoji: string) => void;
  deleteCollection: (id: string) => void;
  renameCollection: (id: string, name: string, emoji: string) => void;
  addWordToCollection: (collectionId: string, wordId: string) => void;
  removeWordFromCollection: (collectionId: string, wordId: string) => void;
}

const initialState: GlobalProgress = {
  // Vocab progress - completely independent
  completedVocabLessons: [],
  currentVocabLessonId: 1,
  vocabLearned: 0,
  learnedVocabIds: [],
  // Grammar progress - completely independent
  completedGrammarLessons: [],
  currentGrammarLessonId: 1,
  grammarLearned: 0,
  learnedGrammarIds: [],
  // Kanji - just a list, not lessons
  kanjiMastered: 0,
  learnedKanjiIds: [],
  // General progress
  unlockedLevels: ['N5'],
  hasCompletedOnboarding: false,
  streakDays: 0,
  lastActiveDate: '',
  favorites: [],
  difficultWords: [],
  studyMinutes: 0,
  studyHistory: [],
  collections: [],
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
            currentVocabLessonId: knowsSomeJapanese ? 25 : 1,
            currentGrammarLessonId: knowsSomeJapanese ? 25 : 1,
            completedVocabLessons: knowsSomeJapanese 
              ? Array.from({ length: 25 }, (_, i) => i + 1) 
              : [],
            completedGrammarLessons: knowsSomeJapanese 
              ? Array.from({ length: 25 }, (_, i) => i + 1) 
              : [],
          },
        }));
      },

      completeVocabLesson: (lessonId: number) => {
        set((state) => ({
          progress: {
            ...state.progress,
            completedVocabLessons: [...new Set([...state.progress.completedVocabLessons, lessonId])],
            currentVocabLessonId: state.progress.currentVocabLessonId === lessonId ? lessonId + 1 : state.progress.currentVocabLessonId,
          },
        }));
      },

      completeGrammarLesson: (lessonId: number) => {
        set((state) => ({
          progress: {
            ...state.progress,
            completedGrammarLessons: [...new Set([...state.progress.completedGrammarLessons, lessonId])],
            currentGrammarLessonId: state.progress.currentGrammarLessonId === lessonId ? lessonId + 1 : state.progress.currentGrammarLessonId,
          },
        }));
      },

      setVocabLesson: (lessonId: number) => {
        set((state) => ({
          progress: { ...state.progress, currentVocabLessonId: lessonId },
        }));
      },

      setGrammarLesson: (lessonId: number) => {
        set((state) => ({
          progress: { ...state.progress, currentGrammarLessonId: lessonId },
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

      resetProgress: () => {
        set({ progress: initialState });
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

      recordStudySession: (minutes: number, vocabLessonId?: number, grammarLessonId?: number) => {
        set((state) => {
          const today = new Date().toISOString().split('T')[0];
          const existingEntry = state.progress.studyHistory.find(h => h.date === today);
          
          let newHistory;
          if (existingEntry) {
            newHistory = state.progress.studyHistory.map(h =>
              h.date === today
                ? {
                    ...h,
                    minutes: h.minutes + minutes,
                    vocabLessons: vocabLessonId ? [...new Set([...h.vocabLessons, vocabLessonId])] : h.vocabLessons,
                    grammarLessons: grammarLessonId ? [...new Set([...h.grammarLessons, grammarLessonId])] : h.grammarLessons,
                  }
                : h
            );
          } else {
            newHistory = [...state.progress.studyHistory, { date: today, minutes, vocabLessons: vocabLessonId ? [vocabLessonId] : [], grammarLessons: grammarLessonId ? [grammarLessonId] : [] }];
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

      // ── Collections ─────────────────────────────────────────────────────
      createCollection: (name: string, emoji: string) => {
        const newCollection: Collection = {
          id: `col_${Date.now()}`,
          name,
          emoji,
          wordIds: [],
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          progress: {
            ...state.progress,
            collections: [...(state.progress.collections ?? []), newCollection],
          },
        }));
      },

      deleteCollection: (id: string) => {
        set((state) => ({
          progress: {
            ...state.progress,
            collections: (state.progress.collections ?? []).filter(c => c.id !== id),
          },
        }));
      },

      renameCollection: (id: string, name: string, emoji: string) => {
        set((state) => ({
          progress: {
            ...state.progress,
            collections: (state.progress.collections ?? []).map(c =>
              c.id === id ? { ...c, name, emoji } : c
            ),
          },
        }));
      },

      addWordToCollection: (collectionId: string, wordId: string) => {
        set((state) => ({
          progress: {
            ...state.progress,
            collections: (state.progress.collections ?? []).map(c =>
              c.id === collectionId
                ? { ...c, wordIds: [...new Set([...c.wordIds, wordId])] }
                : c
            ),
          },
        }));
      },

      removeWordFromCollection: (collectionId: string, wordId: string) => {
        set((state) => ({
          progress: {
            ...state.progress,
            collections: (state.progress.collections ?? []).map(c =>
              c.id === collectionId
                ? { ...c, wordIds: c.wordIds.filter(id => id !== wordId) }
                : c
            ),
          },
        }));
      },
    }),
    {
      name: 'dokidoki-storage',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
      migrate: (persistedState: any) => {
        // Migration from old format to new format
        if (persistedState?.progress?.completedLessons !== undefined) {
          const oldProgress = persistedState.progress;
          return {
            ...persistedState,
            progress: {
              // Vocab progress
              completedVocabLessons: oldProgress.completedLessons ?? [],
              currentVocabLessonId: oldProgress.currentLessonId ?? 1,
              vocabLearned: oldProgress.vocabLearned ?? 0,
              learnedVocabIds: oldProgress.learnedVocabIds ?? [],
              // Grammar progress
              completedGrammarLessons: oldProgress.completedLessons ?? [],
              currentGrammarLessonId: oldProgress.currentLessonId ?? 1,
              grammarLearned: oldProgress.grammarLearned ?? 0,
              learnedGrammarIds: oldProgress.learnedGrammarIds ?? [],
              // Kanji
              kanjiMastered: oldProgress.kanjiMastered ?? 0,
              learnedKanjiIds: oldProgress.learnedKanjiIds ?? [],
              // General
              unlockedLevels: oldProgress.unlockedLevels ?? ['N5'],
              hasCompletedOnboarding: oldProgress.hasCompletedOnboarding ?? false,
              streakDays: oldProgress.streakDays ?? 0,
              lastActiveDate: oldProgress.lastActiveDate ?? '',
              favorites: oldProgress.favorites ?? [],
              difficultWords: oldProgress.difficultWords ?? [],
              studyMinutes: oldProgress.studyMinutes ?? 0,
              studyHistory: oldProgress.studyHistory ?? [],
              collections: oldProgress.collections ?? [],
            }
          };
        }
        return persistedState ?? { progress: initialState };
      },
    }
  )
);
