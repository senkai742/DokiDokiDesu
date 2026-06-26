import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING } from '../constants/theme';
import { useStore } from '../store/useStore';
import { Flame, BookOpen, Brain, Play, Sparkles, Search, PenTool, Calendar, Share2, GraduationCap, FolderOpen } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TabParamList, RootStackParamList } from '../navigation/AppNavigator';
import { CompositeNavigationProp } from '@react-navigation/native';
import { KANJI_DATA } from '../constants/kanji';
import Animated, { useAnimatedStyle, withRepeat, withTiming, useSharedValue } from 'react-native-reanimated';
import { SkeletonLoader } from '../components/ui/SkeletonLoader';
import { ShareProgress } from '../components/ui/ShareProgress';

const FACTS = [
  "Bowing (ojigi) is a sign of respect. The deeper the bow, the more respect shown.",
  "There are no plural forms or gendered nouns in Japanese.",
  "Japan consists of over 6,800 islands.",
  "Slurping noodles is considered polite and shows you're enjoying the meal!",
  "Kanji are adopted Chinese characters, while Hiragana and Katakana are native scripts."
];

export const Dashboard: React.FC = () => {
  type DashboardNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabParamList, 'Home'>,
    NativeStackNavigationProp<RootStackParamList>
  >;

  const navigation = useNavigation<DashboardNavigationProp>();
  const { progress, recordActivity } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    // Simulate loading for skeleton demo
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const dailyKanji = useMemo(() => {
    const today = new Date().getDay();
    return KANJI_DATA[today % KANJI_DATA.length];
  }, []);

  const randomFact = useMemo(() => {
    const today = new Date().getDay();
    return FACTS[today % FACTS.length];
  }, []);

  const pulseOpacity = useSharedValue(0.6);

  React.useEffect(() => {
    pulseOpacity.value = withRepeat(
      withTiming(1, { duration: 1000 }),
      -1,
      true
    );
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: pulseOpacity.value,
  }));

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <SkeletonLoader width={120} height={16} style={{ marginBottom: SPACING.sm }} />
            <SkeletonLoader width={200} height={42} />
          </View>

          {/* Hero Skeleton */}
          <SkeletonLoader height={200} borderRadius={24} style={{ marginBottom: SPACING.md }} />

          {/* Stats Skeleton */}
          <View style={styles.row}>
            <SkeletonLoader height={100} style={{ flex: 1, borderRadius: 20 }} />
            <SkeletonLoader height={100} style={{ flex: 1, borderRadius: 20, marginHorizontal: SPACING.sm }} />
            <SkeletonLoader height={100} style={{ flex: 1, borderRadius: 20 }} />
          </View>

          {/* Bento Grid Skeleton */}
          <View style={styles.bentoGrid}>
            <SkeletonLoader height={120} style={{ flex: 2, borderRadius: 20 }} />
            <SkeletonLoader height={120} style={{ flex: 1.2, borderRadius: 20, marginLeft: SPACING.md }} />
          </View>

          {/* Fact Card Skeleton */}
          <SkeletonLoader height={100} borderRadius={20} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>おかえり (Welcome Back)</Text>
          <Text style={styles.title}>DOKI DOKI DESU</Text>
        </View>

        {/* CONTINUE LEARNING - Unified Card */}
        <Text style={styles.sectionTitle}>CONTINUE LEARNING</Text>

        <View style={styles.continueCard}>
          {/* Vocab Row */}
          <TouchableOpacity
            style={styles.continueRow}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('VocabPhase', { lessonId: progress.currentVocabLessonId })}
          >
            <View style={[styles.continueIcon, { backgroundColor: '#45B7D120' }]}>
              <BookOpen color="#45B7D1" size={20} />
            </View>
            <View style={styles.continueInfo}>
              <Text style={styles.continueLabel}>Vocabulary</Text>
              <Text style={styles.continueLesson}>Lesson {progress.currentVocabLessonId}</Text>
            </View>
            <View style={styles.continueProgress}>
              <View style={[styles.continueProgressBar, { backgroundColor: '#333' }]}>
                <View style={[styles.continueProgressFill, { width: `${(progress.completedVocabLessons?.length ?? 0 / 25) * 100}%`, backgroundColor: '#45B7D1' }]} />
              </View>
            </View>
            <Play color="#45B7D1" size={18} />
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.continueDivider} />

          {/* Grammar Row */}
          <TouchableOpacity
            style={styles.continueRow}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('GrammarPhase', { lessonId: progress.currentGrammarLessonId })}
          >
            <View style={[styles.continueIcon, { backgroundColor: `${COLORS.secondary}20` }]}>
              <GraduationCap color={COLORS.secondary} size={20} />
            </View>
            <View style={styles.continueInfo}>
              <Text style={styles.continueLabel}>Grammar</Text>
              <Text style={styles.continueLesson}>Lesson {progress.currentGrammarLessonId}</Text>
            </View>
            <View style={styles.continueProgress}>
              <View style={[styles.continueProgressBar, { backgroundColor: '#333' }]}>
                <View style={[styles.continueProgressFill, { width: `${(progress.completedGrammarLessons?.length ?? 0 / 25) * 100}%`, backgroundColor: COLORS.secondary }]} />
              </View>
            </View>
            <Play color={COLORS.secondary} size={18} />
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.continueDivider} />

          {/* Kanji Row */}
          <TouchableOpacity
            style={styles.continueRow}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('KanjiList')}
          >
            <View style={[styles.continueIcon, { backgroundColor: '#4ECDC420' }]}>
              <PenTool color="#4ECDC4" size={20} />
            </View>
            <View style={styles.continueInfo}>
              <Text style={styles.continueLabel}>Kanji</Text>
              <Text style={styles.continueLesson}>{progress.kanjiMastered} / {KANJI_DATA.length} Learned</Text>
            </View>
            <View style={styles.continueProgress}>
              <View style={[styles.continueProgressBar, { backgroundColor: '#333' }]}>
                <View style={[styles.continueProgressFill, { width: `${(progress.kanjiMastered / KANJI_DATA.length) * 100}%`, backgroundColor: '#4ECDC4' }]} />
              </View>
            </View>
            <Play color="#4ECDC4" size={18} />
          </TouchableOpacity>
        </View>

        {/* STATS ROW */}
        <View style={styles.row}>
          <View style={[styles.statTile, { backgroundColor: '#FF6B6B' }]}>
            <Flame color={COLORS.background} size={24} />
            <Text style={styles.statValue}>{progress.streakDays}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={[styles.statTile, { backgroundColor: '#4ECDC4' }]}>
            <Brain color={COLORS.background} size={24} />
            <Text style={styles.statValue}>{progress.kanjiMastered}</Text>
            <Text style={styles.statLabel}>Kanji</Text>
          </View>
          <View style={[styles.statTile, { backgroundColor: '#45B7D1' }]}>
            <BookOpen color={COLORS.background} size={24} />
            <Text style={styles.statValue}>{progress.vocabLearned}</Text>
            <Text style={styles.statLabel}>Vocab</Text>
          </View>
          <View style={[styles.statTile, { backgroundColor: '#FFD700' }]}>
            <GraduationCap color={COLORS.background} size={24} />
            <Text style={styles.statValue}>{progress.grammarLearned}</Text>
            <Text style={styles.statLabel}>Grammar</Text>
          </View>
        </View>

        {/* BENTO GRID */}
        <View style={styles.bentoGrid}>
          {/* DAILY CHALLENGE */}
          <TouchableOpacity style={[styles.bentoBox, styles.challengeBox]} activeOpacity={0.9}>
            <Text style={styles.boxTitle}>Daily Kanji</Text>
            <View style={styles.kanjiContainer}>
              <Text style={styles.hugeKanji}>{dailyKanji.kanji}</Text>
              <View>
                <Text style={styles.kanjiMeaning}>{dailyKanji.meaning}</Text>
                <Text style={styles.kanjiReading}>{dailyKanji.reading}</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* QUICK REVIEW */}
          <TouchableOpacity style={[styles.bentoBox, styles.reviewBox]} activeOpacity={0.9} onPress={() => navigation.navigate('Review')}>
            <Sparkles color={COLORS.accent} size={28} />
            <Text style={styles.boxTitle}>Quick Review</Text>
            <Text style={styles.boxSubtitle}>5 Random Words</Text>
          </TouchableOpacity>
        </View>

        {/* QUICK ACCESS TOOLS */}
        <Text style={styles.sectionTitle}>TOOLS</Text>
        <View style={styles.toolsGrid}>
          <TouchableOpacity
            style={styles.toolBox}
            onPress={() => navigation.navigate('Search')}
          >
            <Search color={COLORS.primary} size={28} />
            <Text style={styles.toolTitle}>Dictionary</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.toolBox}
            onPress={() => navigation.navigate('WritingPractice')}
          >
            <PenTool color={COLORS.secondary} size={28} />
            <Text style={styles.toolTitle}>Writing</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.toolBox}
            onPress={() => navigation.navigate('StudyStreak')}
          >
            <Calendar color="#FFD700" size={28} />
            <Text style={styles.toolTitle}>Streak</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.toolBox}
            onPress={() => navigation.navigate('Collections')}
          >
            <FolderOpen color="#C084FC" size={28} />
            <Text style={styles.toolTitle}>Collections</Text>
          </TouchableOpacity>
        </View>

        {/* SHARE PROGRESS */}
        <TouchableOpacity style={styles.shareCard} onPress={() => setShowShare(true)}>
          <Share2 color={COLORS.accent} size={24} />
          <Text style={styles.shareText}>Share Your Progress</Text>
        </TouchableOpacity>

        {/* DID YOU KNOW */}
        <View style={styles.factCard}>
          <Text style={styles.factTitle}>Did You Know?</Text>
          <Text style={styles.factText}>{randomFact}</Text>
        </View>

        {/* Modals */}
        <ShareProgress
          isVisible={showShare}
          onClose={() => setShowShare(false)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    padding: SPACING.md,
    paddingBottom: SPACING.md,
  },
  header: {
    marginBottom: SPACING.lg,
    marginTop: SPACING.sm,
  },
  greeting: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 42,
    color: COLORS.primary,
    fontWeight: '900',
    letterSpacing: -1,
  },
  heroCard: {
    backgroundColor: COLORS.accent,
    borderRadius: 24,
    padding: SPACING.xl,
    marginBottom: SPACING.md,
    overflow: 'hidden',
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  heroLabel: {
    color: COLORS.background,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
  levelBadge: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  levelText: {
    color: COLORS.background,
    fontWeight: 'bold',
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: COLORS.background,
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: SPACING.xl,
  },
  playButton: {
    backgroundColor: COLORS.text,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
    borderRadius: 16,
    gap: SPACING.sm,
  },
  playText: {
    color: COLORS.background,
    fontWeight: '900',
    fontSize: 16,
    letterSpacing: 1,
  },
  row: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  statTile: {
    flex: 1,
    borderRadius: 20,
    padding: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.background,
    marginTop: SPACING.sm,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  bentoGrid: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  bentoBox: {
    backgroundColor: COLORS.gray,
    borderRadius: 20,
    padding: SPACING.lg,
  },
  challengeBox: {
    flex: 2,
  },
  reviewBox: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  boxTitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: SPACING.sm,
  },
  boxSubtitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: SPACING.sm,
  },
  kanjiContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  hugeKanji: {
    fontSize: 48,
    color: COLORS.primary,
    fontWeight: '900',
  },
  kanjiMeaning: {
    fontSize: 18,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  kanjiReading: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  factCard: {
    backgroundColor: COLORS.gray,
    borderRadius: 20,
    padding: SPACING.lg,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.secondary,
  },
  factTitle: {
    fontSize: 14,
    color: COLORS.secondary,
    fontWeight: '800',
    marginBottom: SPACING.sm,
    textTransform: 'uppercase',
  },
  factText: {
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textSecondary,
    letterSpacing: 2,
    marginBottom: SPACING.md,
    marginTop: SPACING.md,
  },
  continueCard: {
    backgroundColor: COLORS.gray,
    borderRadius: 20,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  continueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  continueIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueInfo: {
    marginLeft: SPACING.md,
    flex: 1,
  },
  continueLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  continueLesson: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.accent,
    marginTop: 2,
  },
  continueProgress: {
    width: 60,
    marginRight: SPACING.md,
  },
  continueProgressBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  continueProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  continueDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginVertical: SPACING.xs,
  },
  toolsGrid: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  toolBox: {
    flex: 1,
    backgroundColor: COLORS.gray,
    borderRadius: 16,
    padding: SPACING.md,
    alignItems: 'center',
    gap: SPACING.sm,
  },
  toolTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.accent,
  },
  shareCard: {
    backgroundColor: COLORS.primary + '20',
    borderRadius: 16,
    padding: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  shareText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 16,
  },
});
