import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING } from '../constants/theme';
import { useStore } from '../store/useStore';
import { Flame, Clock, BookOpen, ChevronLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export const StudyStreakScreen: React.FC = () => {
  const { progress } = useStore();
  const navigation = useNavigation();

  const currentStreak = progress.streakDays;
  const totalHours = Math.floor(progress.studyMinutes / 60);
  const totalMinutes = progress.studyMinutes % 60;
  const totalStudyTimeDisplay = totalHours > 0 ? `${totalHours}h ${totalMinutes}m` : `${totalMinutes}m`;
  const today = new Date().toISOString().split('T')[0];

  // Generate last 30 days for heatmap
  const heatmapData = useMemo(() => {
    const days = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const studyEntry = progress.studyHistory.find(h => h.date === dateStr);
      
      days.push({
        date: dateStr,
        dayName: date.toLocaleDateString('en-US', { weekday: 'narrow' }),
        dayNum: date.getDate(),
        minutes: studyEntry?.minutes || 0,
        hasStudied: !!studyEntry && studyEntry.minutes > 0,
        lessonsCompleted: ((studyEntry?.vocabLessons?.length ?? 0) + (studyEntry?.grammarLessons?.length ?? 0)) || 0,
      });
    }
    return days;
  }, [progress.studyHistory]);

  const getHeatmapColor = (minutes: number) => {
    if (minutes === 0) return COLORS.gray;
    if (minutes < 15) return '#0d5e45'; // Light green
    if (minutes < 30) return '#0a8c56'; // Medium green
    if (minutes < 60) return '#06c258'; // Bright green
    return '#00ff66'; // Intense green
  };

  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <ChevronLeft color={COLORS.accent} size={28} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Study Streak</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Stats Cards */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: '#FF6B6B30' }]}>
            <Flame color="#FF6B6B" size={32} />
            <Text style={styles.statValue}>{currentStreak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#4ECDC430' }]}>
            <Clock color="#4ECDC4" size={32} />
            <Text style={styles.statValue}>{totalStudyTimeDisplay}</Text>
            <Text style={styles.statLabel}>Total Time</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#45B7D130' }]}>
            <BookOpen color="#45B7D1" size={32} />
            <Text style={styles.statValue}>{(progress.completedVocabLessons?.length ?? 0) + (progress.completedGrammarLessons?.length ?? 0)}</Text>
            <Text style={styles.statLabel}>Lessons</Text>
          </View>
        </View>

        {/* Heatmap */}
        <View style={styles.heatmapContainer}>
          <Text style={styles.sectionTitle}>Last 30 Days</Text>
          
          {/* Weekday headers */}
          <View style={styles.weekdayHeader}>
            {weekDays.map((day, i) => (
              <Text key={i} style={styles.weekdayText}>{day}</Text>
            ))}
          </View>

          {/* Calendar Grid */}
          <View style={styles.calendarGrid}>
            {heatmapData.map((day, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dayCell,
                  { backgroundColor: getHeatmapColor(day.minutes) },
                  day.date === today && styles.todayCell
                ]}
              >
                <Text style={[styles.dayNumber, day.hasStudied && styles.activeDayNumber]}>
                  {day.dayNum}
                </Text>
                {day.hasStudied && (
                  <View style={styles.studyIndicator} />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Legend */}
          <View style={styles.legend}>
            <Text style={styles.legendText}>Less</Text>
            <View style={[styles.legendDot, { backgroundColor: COLORS.gray }]} />
            <View style={[styles.legendDot, { backgroundColor: '#0d5e45' }]} />
            <View style={[styles.legendDot, { backgroundColor: '#0a8c56' }]} />
            <View style={[styles.legendDot, { backgroundColor: '#06c258' }]} />
            <View style={[styles.legendDot, { backgroundColor: '#00ff66' }]} />
            <Text style={styles.legendText}>More</Text>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.activitySection}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {progress.studyHistory.slice(-5).reverse().map((entry, index) => (
            <View key={index} style={styles.activityItem}>
              <View style={styles.activityLeft}>
                <View style={styles.activityDot} />
                <View>
                  <Text style={styles.activityDate}>
                    {new Date(entry.date).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </Text>
                  <Text style={styles.activityDetails}>
                    {(entry.vocabLessons?.length ?? 0) + (entry.grammarLessons?.length ?? 0)} lessons completed
                  </Text>
                </View>
              </View>
              <Text style={styles.activityTime}>{entry.minutes} min</Text>
            </View>
          ))}
          {(progress.studyHistory?.length ?? 0) === 0 && (
            <Text style={styles.noActivity}>No study sessions yet. Start learning today!</Text>
          )}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.xl,
  },
  backBtn: {
    padding: SPACING.sm,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.accent,
  },
  statsRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  statCard: {
    flex: 1,
    borderRadius: 20,
    padding: SPACING.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.accent,
    marginTop: SPACING.sm,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '600',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textSecondary,
    letterSpacing: 1,
    marginBottom: SPACING.md,
  },
  heatmapContainer: {
    backgroundColor: COLORS.gray,
    borderRadius: 24,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  weekdayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.sm,
  },
  weekdayText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    width: 32,
    textAlign: 'center',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dayCell: {
    width: 32,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  todayCell: {
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  dayNumber: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  activeDayNumber: {
    color: COLORS.background,
    fontWeight: '800',
  },
  studyIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.background,
    marginTop: 2,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginTop: SPACING.lg,
  },
  legendText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginHorizontal: SPACING.sm,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
  activitySection: {
    backgroundColor: COLORS.gray,
    borderRadius: 24,
    padding: SPACING.lg,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  activityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  activityDate: {
    color: COLORS.accent,
    fontWeight: '700',
    fontSize: 14,
  },
  activityDetails: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  activityTime: {
    color: COLORS.primary,
    fontWeight: '800',
    fontSize: 14,
  },
  noActivity: {
    color: COLORS.textSecondary,
    textAlign: 'center',
    padding: SPACING.lg,
    fontSize: 14,
  },
});
