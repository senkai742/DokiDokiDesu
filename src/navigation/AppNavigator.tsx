import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
import { ReviewScreen } from '../screens/ReviewScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { StudyStreakScreen } from '../screens/StudyStreakScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { WritingPracticeScreen } from '../screens/WritingPracticeScreen';
import { LearnScreen } from '../screens/LearnScreen';
import { Home, Map, BookOpen, User, Search as SearchIcon } from 'lucide-react-native';
import { COLORS } from '../constants/theme';

export type TabParamList = {
  Home: undefined;
  Learn: undefined;
  Review: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
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
  StudyStreak: undefined;
  Search: undefined;
  WritingPractice: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.gray,
          borderTopColor: COLORS.gray,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={Dashboard} 
        options={{
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />
        }}
      />
      <Tab.Screen 
        name="Learn" 
        component={LearnScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <Map color={color} size={size} />
        }}
      />
      <Tab.Screen 
        name="Review" 
        component={ReviewScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <BookOpen color={color} size={size} />
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />
        }}
      />
    </Tab.Navigator>
  );
};

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
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="N5Selection" component={N5Selection} />
          <Stack.Screen name="KanaSelection" component={KanaSelection} />
          <Stack.Screen name="KanaList" component={KanaList} />
          <Stack.Screen name="KanjiList" component={KanjiList} />
          <Stack.Screen name="LessonMap" component={LessonMap} />
          <Stack.Screen name="VocabPhase" component={VocabPhase} />
          <Stack.Screen name="GrammarPhase" component={GrammarPhase} />
          <Stack.Screen name="KanjiPhase" component={KanjiPhase} />
          <Stack.Screen name="MasteryQuiz" component={MasteryQuiz} />
          <Stack.Screen name="StudyStreak" component={StudyStreakScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="WritingPractice" component={WritingPracticeScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
