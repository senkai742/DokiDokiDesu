import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING } from '../constants/theme';
import { useStore } from '../store/useStore';
import Animated, { useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';
import { Star, Check, Lock } from 'lucide-react-native';
import Svg, { Line } from 'react-native-svg';
import { CircularProgress } from '../components/ui/CircularProgress';

import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const { width } = Dimensions.get('window');
const NODE_SIZE = 80;
const VERTICAL_SPACING = 140;

const CHAPTERS = [
  { id: 1, title: "Chapter 1: The Basics", start: 1, end: 5, color: COLORS.primary },
  { id: 2, title: "Chapter 2: Daily Life", start: 6, end: 10, color: COLORS.secondary },
  { id: 3, title: "Chapter 3: Travel & Places", start: 11, end: 15, color: '#FFD700' },
  { id: 4, title: "Chapter 4: Actions & Desires", start: 16, end: 20, color: '#FF6B6B' },
  { id: 5, title: "Chapter 5: The Masterclass", start: 21, end: 25, color: '#4ECDC4' },
];

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const LessonMap: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, 'LessonMap'>>();
  const { mode, level } = route.params;
  const { progress } = useStore();
  
  const lessons = useMemo(() => {
    let chapterOffset = 0;
    return Array.from({ length: 25 }, (_, i) => {
      const id = i + 1;
      const row = i;
      const isRight = row % 4 === 1 || row % 4 === 2;
      const leftOffset = isRight ? width * 0.6 : width * 0.15;
      const isFirstInChapter = CHAPTERS.some(c => c.start === id);
      if (isFirstInChapter) chapterOffset += 60;
      const topOffset = i * VERTICAL_SPACING + chapterOffset + 20;
      
      const chapter = CHAPTERS.find(c => id >= c.start && id <= c.end) || CHAPTERS[0];

      return {
        id,
        title: `Lesson ${id}`,
        isLocked: id > progress.currentLessonId,
        isCompleted: progress.completedLessons.includes(id),
        x: leftOffset + NODE_SIZE / 2,
        y: topOffset + NODE_SIZE / 2,
        leftOffset,
        topOffset,
        chapter,
      };
    });
  }, [progress.currentLessonId, progress.completedLessons]);

  const PulseCircle = ({ active, color }: { active: boolean; color: string }) => {
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: active ? withRepeat(withTiming(1.3, { duration: 1200 }), -1, true) : withTiming(1) }],
      opacity: active ? withRepeat(withTiming(0.4, { duration: 1200 }), -1, true) : withTiming(0),
    }));

    return active ? <Animated.View style={[styles.pulse, { backgroundColor: color }, animatedStyle]} /> : null;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{level} PATH</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Draw lines */}
        <View style={styles.svgContainer}>
          <Svg width={width} height={lessons.length * VERTICAL_SPACING}>
            {lessons.map((lesson, i) => {
              if (i === lessons.length - 1) return null;
              const nextLesson = lessons[i + 1];
              return (
                <Line
                  key={`line-${lesson.id}`}
                  x1={lesson.x}
                  y1={lesson.y}
                  x2={nextLesson.x}
                  y2={nextLesson.y}
                  stroke={lesson.isCompleted ? lesson.chapter.color : COLORS.gray}
                  strokeWidth="8"
                  strokeDasharray={lesson.isCompleted ? "" : "15, 10"}
                />
              );
            })}
          </Svg>
        </View>

        {/* Draw Chapters and Nodes */}
        {lessons.map((lesson, index) => {
          const isFirstInChapter = lesson.id === lesson.chapter.start;
          
          return (
            <React.Fragment key={lesson.id}>
              {isFirstInChapter && (
                <View style={[styles.chapterBadge, { top: lesson.topOffset - 60 }]}>
                  <Text style={[styles.chapterTitle, { color: lesson.chapter.color }]}>{lesson.chapter.title}</Text>
                </View>
              )}
              
              <View
                style={[
                  styles.nodeWrapper,
                  { top: lesson.topOffset, left: lesson.leftOffset - 10 }
                ]}
              >
                <CircularProgress
                  size={100}
                  strokeWidth={4}
                  progress={lesson.isCompleted ? 1 : lesson.id === progress.currentLessonId ? 0.3 : 0}
                  color={lesson.chapter.color}
                  bgColor={COLORS.gray}
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
                      { borderColor: lesson.isLocked ? COLORS.gray : lesson.chapter.color },
                      lesson.isCompleted && { backgroundColor: lesson.chapter.color },
                      lesson.id === progress.currentLessonId && { backgroundColor: lesson.chapter.color },
                      lesson.isLocked && styles.lockedNode,
                    ]}
                  >
                    <PulseCircle active={lesson.id === progress.currentLessonId} color={lesson.chapter.color} />
                    
                    {lesson.isCompleted ? (
                      <Check size={32} color={COLORS.background} strokeWidth={3} />
                    ) : lesson.id === progress.currentLessonId ? (
                      <Star size={32} color={COLORS.background} fill={COLORS.background} />
                    ) : lesson.isLocked ? (
                      <Lock size={28} color={COLORS.textSecondary} />
                    ) : (
                      <Text style={[styles.nodeText, lesson.isLocked && styles.lockedText]}>
                        {lesson.id}
                      </Text>
                    )}
                  </TouchableOpacity>
                </CircularProgress>
              </View>
            </React.Fragment>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SPACING.md,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.accent,
    letterSpacing: 2,
  },
  scrollContent: {
    paddingTop: SPACING.xl * 2,
    paddingBottom: 250,
    height: 25 * VERTICAL_SPACING + 100 + SPACING.xl * 2, // Fixed height for scrolling + top padding
  },
  svgContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  chapterBadge: {
    position: 'absolute',
    width: width,
    alignItems: 'center',
    zIndex: 10,
  },
  chapterTitle: {
    fontSize: 18,
    fontWeight: '900',
    backgroundColor: COLORS.gray,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
    overflow: 'hidden',
  },
  nodeWrapper: {
    position: 'absolute',
    alignItems: 'center',
    width: NODE_SIZE,
    height: NODE_SIZE,
    zIndex: 20,
  },
  node: {
    width: NODE_SIZE,
    height: NODE_SIZE,
    borderRadius: NODE_SIZE / 2,
    backgroundColor: COLORS.gray,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  lockedNode: {
    backgroundColor: COLORS.gray,
    opacity: 0.8,
  },
  nodeText: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.accent,
  },
  lockedText: {
    color: COLORS.textSecondary,
  },
  pulse: {
    position: 'absolute',
    width: NODE_SIZE,
    height: NODE_SIZE,
    borderRadius: NODE_SIZE / 2,
    zIndex: -1,
  },
});
