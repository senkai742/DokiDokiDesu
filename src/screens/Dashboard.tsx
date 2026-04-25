import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';
import { BentoTile } from '../components/ui/BentoTile';
import { useStore } from '../store/useStore';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

export const Dashboard: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { progress } = useStore();

  const levels = [
    { id: 'N5', title: 'N5', subtitle: 'Beginner', isLocked: !progress.unlockedLevels.includes('N5'), color: COLORS.primary },
    { id: 'N4', title: 'N4', subtitle: 'Elementary', isLocked: !progress.unlockedLevels.includes('N4'), color: COLORS.secondary },
    { id: 'N3', title: 'N3', subtitle: 'Intermediate', isLocked: !progress.unlockedLevels.includes('N3'), color: '#FFD700' },
    { id: 'N2', title: 'N2', subtitle: 'Upper-Intermediate', isLocked: !progress.unlockedLevels.includes('N2'), color: '#00FF00' },
    { id: 'N1', title: 'N1', subtitle: 'Advanced', isLocked: !progress.unlockedLevels.includes('N1'), color: '#FF00FF' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.greeting}>DOKI DOKI</Text>
          <Text style={styles.title}>DESU</Text>
        </View>

        <View style={styles.grid}>
          <BentoTile
            title={levels[0].title}
            subtitle={levels[0].subtitle}
            isLocked={levels[0].isLocked}
            color={levels[0].color}
            style={styles.largeTile}
            onPress={() => navigation.navigate('N5Selection', { level: 'N5' })}
          />
          <View style={styles.column}>
            {levels.slice(1, 3).map((level) => (
              <BentoTile
                key={level.id}
                title={level.title}
                subtitle="Coming Soon"
                isLocked={true}
                color={level.color}
                style={styles.smallTile}
              />
            ))}
          </View>
        </View>

        <View style={styles.row}>
          {levels.slice(3).map((level) => (
            <BentoTile
              key={level.id}
              title={level.title}
              subtitle="Locked"
              isLocked={true}
              color={level.color}
              style={styles.halfTile}
            />
          ))}
        </View>

        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>YOUR PROGRESS</Text>
          <Text style={styles.statsValue}>{progress.completedLessons.length} / 25 Lessons</Text>
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
    padding: SPACING.md,
  },
  header: {
    marginBottom: SPACING.xl,
    marginTop: SPACING.lg,
  },
  greeting: {
    fontSize: 18,
    color: COLORS.secondary,
    fontWeight: '900',
    letterSpacing: 2,
  },
  title: {
    fontSize: 64,
    color: COLORS.accent,
    fontWeight: '900',
    lineHeight: 60,
    marginTop: -5,
  },
  grid: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  largeTile: {
    flex: 2,
    aspectRatio: 1,
  },
  column: {
    flex: 1,
    gap: SPACING.md,
  },
  smallTile: {
    flex: 1,
    aspectRatio: 1,
  },
  row: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  halfTile: {
    flex: 1,
    aspectRatio: 2,
  },
  statsCard: {
    backgroundColor: COLORS.gray,
    padding: SPACING.lg,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  statsTitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '700',
    letterSpacing: 1,
  },
  statsValue: {
    fontSize: 24,
    color: COLORS.accent,
    fontWeight: '900',
    marginTop: 4,
  },
});
