import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';
import { useStore } from '../store/useStore';
import Animated, { useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';
import { ChevronLeft, Star } from 'lucide-react-native';

import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

const { width } = Dimensions.get('window');
const NODE_SIZE = 80;

export const LessonMap: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'LessonMap'>>();
  const { mode, level } = route.params;
  const { progress } = useStore();
  
  const lessons = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    title: `Lesson ${i + 1}`,
    isLocked: i + 1 > progress.currentLessonId,
    isCompleted: progress.completedLessons.includes(i + 1),
  }));

  const PulseCircle = ({ active }: { active: boolean }) => {
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: active ? withRepeat(withTiming(1.2, { duration: 1000 }), -1, true) : 1 }],
      opacity: active ? withRepeat(withTiming(0.5, { duration: 1000 }), -1, true) : 0,
    }));

    return active ? <Animated.View style={[styles.pulse, animatedStyle]} /> : null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ChevronLeft color={COLORS.accent} size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{level} {mode.toUpperCase()} MAP</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {lessons.map((lesson, index) => {
          // Calculate Zig-Zag positions
          const row = Math.floor(index / 2);
          const isRight = index % 4 === 1 || index % 4 === 2;
          const leftOffset = isRight ? width * 0.6 : width * 0.15;

          return (
            <View
              key={lesson.id}
              style={[
                styles.nodeWrapper,
                { top: index * 100, left: leftOffset }
              ]}
            >
              <TouchableOpacity
                disabled={lesson.isLocked}
                onPress={() => 
                  mode === 'vocab' 
                    ? navigation.navigate('VocabPhase', { lessonId: lesson.id })
                    : navigation.navigate('GrammarPhase', { lessonId: lesson.id })
                }
                style={[
                  styles.node,
                  lesson.isLocked && styles.lockedNode,
                  lesson.isCompleted && styles.completedNode,
                  lesson.id === progress.currentLessonId && styles.activeNode,
                ]}
              >
                <PulseCircle active={lesson.id === progress.currentLessonId} />
                {lesson.isCompleted ? (
                  <Star size={32} color={COLORS.background} fill={COLORS.accent} />
                ) : (
                  <Text style={[styles.nodeText, lesson.isLocked && styles.lockedText]}>
                    {lesson.id}
                  </Text>
                )}
              </TouchableOpacity>
              <Text style={styles.nodeTitle}>{lesson.title}</Text>
            </View>
          );
        })}
        {/* Connection lines would go here using SVG or absolute views, but for simplicity we keep the layout */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    paddingTop: 60,
    backgroundColor: COLORS.gray,
  },
  backButton: {
    marginRight: SPACING.md,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.accent,
    letterSpacing: 1,
  },
  scrollContent: {
    paddingBottom: 200,
    height: 2600, // Fixed height for 25 lessons
  },
  nodeWrapper: {
    position: 'absolute',
    alignItems: 'center',
    width: NODE_SIZE + 40,
  },
  node: {
    width: NODE_SIZE,
    height: NODE_SIZE,
    borderRadius: NODE_SIZE / 2,
    backgroundColor: COLORS.gray,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: COLORS.locked,
  },
  activeNode: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  completedNode: {
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.secondary,
  },
  lockedNode: {
    opacity: 0.5,
  },
  nodeText: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.accent,
  },
  lockedText: {
    color: COLORS.locked,
  },
  nodeTitle: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  pulse: {
    position: 'absolute',
    width: NODE_SIZE,
    height: NODE_SIZE,
    borderRadius: NODE_SIZE / 2,
    backgroundColor: COLORS.primary,
    zIndex: -1,
  },
});
