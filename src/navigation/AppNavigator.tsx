import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useStore } from '../store/useStore';
import { Onboarding } from '../screens/Onboarding';
import { Dashboard } from '../screens/Dashboard';
import { N5Selection } from '../screens/N5Selection';
import { KanaSelection } from '../screens/KanaSelection';
import { KanaList } from '../screens/KanaList';
import { KanjiList } from '../screens/KanjiList';
import { LessonMap } from '../screens/LessonMap';
import { VocabPhase } from '../screens/VocabPhase';
import { GrammarPhase } from '../screens/GrammarPhase';
import { KanjiPhase } from '../screens/KanjiPhase';
import { MasteryQuiz } from '../screens/MasteryQuiz';

export type RootStackParamList = {
  Dashboard: undefined;
  Onboarding: undefined;
  N5Selection: { level: string };
  KanaSelection: undefined;
  KanaList: { type: 'hiragana' | 'katakana' };
  KanjiList: undefined;
  LessonMap: { level: string; mode: 'vocab' | 'grammar' };
  VocabPhase: { lessonId: number };
  GrammarPhase: { lessonId: number };
  KanjiPhase: { lessonId: number };
  MasteryQuiz: { lessonId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const { progress } = useStore();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#0D0D0D' },
      }}
    >
      {!progress.hasCompletedOnboarding ? (
        <Stack.Screen name="Onboarding" component={Onboarding} />
      ) : (
        <>
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="N5Selection" component={N5Selection} />
          <Stack.Screen name="KanaSelection" component={KanaSelection} />
          <Stack.Screen name="KanaList" component={KanaList} />
          <Stack.Screen name="KanjiList" component={KanjiList} />
          <Stack.Screen name="LessonMap" component={LessonMap} />
          <Stack.Screen name="VocabPhase" component={VocabPhase} />
          <Stack.Screen name="GrammarPhase" component={GrammarPhase} />
          <Stack.Screen name="KanjiPhase" component={KanjiPhase} />
          <Stack.Screen name="MasteryQuiz" component={MasteryQuiz} />
        </>
      )}
    </Stack.Navigator>
  );
};
