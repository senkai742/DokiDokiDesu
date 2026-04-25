import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LessonPhase, GlobalProgress } from '../types/lesson';

interface AppState {
  progress: GlobalProgress;
  completeOnboarding: (knowsSomeJapanese: boolean) => void;
  setLessonCompleted: (lessonId: number) => void;
  setCurrentPhase: (phase: LessonPhase) => void;
  setCurrentLesson: (lessonId: number) => void;
  unlockLevel: (level: string) => void;
  syncProgress: () => Promise<void>;
}

const initialState: GlobalProgress = {
  completedLessons: [],
  currentLessonId: 1,
  currentPhase: 'vocab',
  unlockedLevels: ['N5'],
  hasCompletedOnboarding: false,
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
    }),
    {
      name: 'dokidoki-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
