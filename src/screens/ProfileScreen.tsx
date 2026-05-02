import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING } from '../constants/theme';
import { useStore } from '../store/useStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { CircularProgress } from '../components/ui/CircularProgress';
import { DokiButton } from '../components/ui/DokiButton';
import { 
  User, 
  Flame, 
  Brain, 
  BookOpen, 
  Award, 
  ChevronRight, 
  Bell, 
  Moon, 
  Volume2,
  LogOut,
  Trophy
} from 'lucide-react-native';

type ProfileNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileNavigationProp>();
  const { progress, resetProgress } = useStore();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Calculate N5 progress - combine vocab and grammar completion
  const completedLessons = Math.max(progress.completedVocabLessons?.length ?? 0, progress.completedGrammarLessons?.length ?? 0);
  const n5Progress = completedLessons / 25;
  const currentLevel = progress.unlockedLevels?.[progress.unlockedLevels.length - 1] ?? 'N5';

  const handleResetProgress = () => {
    Alert.alert(
      'Reset Progress?',
      'This will reset all your lesson progress. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reset', style: 'destructive', onPress: () => resetProgress() }
      ]
    );
  };

  const renderStatCard = (
    icon: React.ReactNode, 
    label: string, 
    value: string | number, 
    color: string
  ) => (
    <View style={[styles.statCard, { backgroundColor: color + '20' }]}>
      <View style={[styles.statIcon, { backgroundColor: color }]}>
        {icon}
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  const renderSettingRow = (
    icon: React.ReactNode,
    label: string,
    value: boolean,
    onToggle: (value: boolean) => void
  ) => (
    <View style={styles.settingRow}>
      <View style={styles.settingLeft}>
        {icon}
        <Text style={styles.settingLabel}>{label}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: COLORS.gray, true: COLORS.primary }}
        thumbColor={value ? COLORS.accent : COLORS.textSecondary}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <User size={40} color={COLORS.background} />
          </View>
          <Text style={styles.username}>N5 Student</Text>
          <View style={styles.levelBadge}>
            <Trophy size={16} color={COLORS.primary} />
            <Text style={styles.levelText}>{currentLevel} Level</Text>
          </View>
        </View>

        {/* N5 Progress Section */}
        <TouchableOpacity 
          style={styles.progressSection}
          onPress={() => navigation.navigate('StudyStreak')}
          activeOpacity={0.8}
        >
          <Text style={styles.sectionTitle}>N5 MASTERY</Text>
          <View style={styles.progressCard}>
            <CircularProgress
              size={120}
              strokeWidth={10}
              progress={n5Progress}
              color={COLORS.primary}
              showPercentage
            >
              <Award size={48} color={COLORS.primary} />
            </CircularProgress>
            <View style={styles.progressInfo}>
              <Text style={styles.progressText}>
                {completedLessons} of 25 Lessons
              </Text>
              <Text style={styles.progressSubtitle}>
                {Math.round(n5Progress * 100)}% Complete
              </Text>
              <Text style={styles.viewStreakText}>Tap to view streak →</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {renderStatCard(
            <Flame color={COLORS.background} size={24} />,
            'Day Streak',
            progress.streakDays,
            '#FF6B6B'
          )}
          {renderStatCard(
            <Brain color={COLORS.background} size={24} />,
            'Kanji',
            progress.kanjiMastered,
            '#4ECDC4'
          )}
          {renderStatCard(
            <BookOpen color={COLORS.background} size={24} />,
            'Vocab',
            progress.vocabLearned,
            '#45B7D1'
          )}
        </View>

        {/* Achievements */}
        <View style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>ACHIEVEMENTS</Text>
          <View style={styles.achievementsList}>
            <View style={[
              styles.achievementCard, 
              progress.streakDays >= 7 && styles.achievementUnlocked
            ]}>
              <Flame size={32} color={progress.streakDays >= 7 ? '#FF6B6B' : COLORS.gray} />
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>Week Warrior</Text>
                <Text style={styles.achievementDesc}>7 day streak</Text>
              </View>
              {progress.streakDays >= 7 && <Award size={20} color={COLORS.primary} />}
            </View>

            <View style={[
              styles.achievementCard,
              completedLessons >= 5 && styles.achievementUnlocked
            ]}>
              <BookOpen size={32} color={completedLessons >= 5 ? '#4ECDC4' : COLORS.gray} />
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>Getting Started</Text>
                <Text style={styles.achievementDesc}>Complete 5 lessons</Text>
              </View>
              {completedLessons >= 5 && <Award size={20} color={COLORS.primary} />}
            </View>

            <View style={[
              styles.achievementCard,
              completedLessons >= 25 && styles.achievementUnlocked
            ]}>
              <Trophy size={32} color={completedLessons >= 25 ? '#FFD700' : COLORS.gray} />
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>N5 Master</Text>
                <Text style={styles.achievementDesc}>Complete all lessons</Text>
              </View>
              {completedLessons >= 25 && <Award size={20} color={COLORS.primary} />}
            </View>
          </View>
        </View>

        {/* Settings */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>SETTINGS</Text>
          <View style={styles.settingsCard}>
            {renderSettingRow(
              <Bell size={24} color={COLORS.accent} />,
              'Notifications',
              notifications,
              setNotifications
            )}
            {renderSettingRow(
              <Moon size={24} color={COLORS.accent} />,
              'Dark Mode',
              darkMode,
              setDarkMode
            )}
            {renderSettingRow(
              <Volume2 size={24} color={COLORS.accent} />,
              'Sound Effects',
              soundEnabled,
              setSoundEnabled
            )}
          </View>
        </View>

        {/* Reset Button */}
        <TouchableOpacity style={styles.resetButton} onPress={handleResetProgress}>
          <LogOut size={20} color={COLORS.textSecondary} />
          <Text style={styles.resetText}>Reset Progress</Text>
        </TouchableOpacity>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>DokiDoki Desu v1.0.0</Text>
        </View>
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
    padding: SPACING.lg,
    paddingBottom: SPACING.xl * 2,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  username: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.accent,
    marginBottom: SPACING.sm,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
    gap: SPACING.sm,
  },
  levelText: {
    color: COLORS.accent,
    fontWeight: '700',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textSecondary,
    letterSpacing: 2,
    marginBottom: SPACING.md,
  },
  progressSection: {
    marginBottom: SPACING.xl,
  },
  progressCard: {
    backgroundColor: COLORS.gray,
    borderRadius: 24,
    padding: SPACING.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xl,
  },
  progressInfo: {
    flex: 1,
  },
  progressText: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.accent,
    marginBottom: SPACING.sm,
  },
  progressSubtitle: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '700',
  },
  viewStreakText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  statCard: {
    flex: 1,
    borderRadius: 20,
    padding: SPACING.md,
    alignItems: 'center',
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.accent,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '600',
    marginTop: 4,
  },
  achievementsSection: {
    marginBottom: SPACING.xl,
  },
  achievementsList: {
    gap: SPACING.md,
  },
  achievementCard: {
    backgroundColor: COLORS.gray,
    borderRadius: 16,
    padding: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    opacity: 0.6,
  },
  achievementUnlocked: {
    opacity: 1,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.accent,
    marginBottom: 2,
  },
  achievementDesc: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  settingsSection: {
    marginBottom: SPACING.xl,
  },
  settingsCard: {
    backgroundColor: COLORS.gray,
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  settingLabel: {
    fontSize: 16,
    color: COLORS.accent,
    fontWeight: '600',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    padding: SPACING.md,
    opacity: 0.6,
  },
  resetText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: SPACING.xl,
  },
  versionText: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
});
