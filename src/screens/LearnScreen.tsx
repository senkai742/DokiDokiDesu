import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING } from '../constants/theme';
import { BentoTile } from '../components/ui/BentoTile';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { GraduationCap, BookOpen, MessageCircle, Pen } from 'lucide-react-native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const LearnScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Let's Study!</Text>
          <Text style={styles.title}>N5 LEARNING PATH</Text>
        </View>

        <View style={styles.grid}>
          {/* KANA */}
          <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => navigation.navigate('KanaSelection')}
          >
            <View style={[styles.iconContainer, { backgroundColor: COLORS.primary + '20' }]}>
              <MessageCircle color={COLORS.primary} size={32} />
            </View>
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryTitle}>KANA</Text>
              <Text style={styles.categorySubtitle}>Hiragana & Katakana</Text>
            </View>
          </TouchableOpacity>

          {/* VOCABULARY */}
          <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => navigation.navigate('LessonMap', { level: 'N5', mode: 'vocab' })}
          >
            <View style={[styles.iconContainer, { backgroundColor: COLORS.secondary + '20' }]}>
              <BookOpen color={COLORS.secondary} size={32} />
            </View>
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryTitle}>VOCABULARY</Text>
              <Text style={styles.categorySubtitle}>25 Lessons</Text>
            </View>
          </TouchableOpacity>

          {/* GRAMMAR */}
          <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => navigation.navigate('LessonMap', { level: 'N5', mode: 'grammar' })}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#FFD700' + '20' }]}>
              <GraduationCap color="#FFD700" size={32} />
            </View>
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryTitle}>GRAMMAR</Text>
              <Text style={styles.categorySubtitle}>Patterns & Rules</Text>
            </View>
          </TouchableOpacity>

          {/* KANJI */}
          <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => navigation.navigate('KanjiList')}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#FF00FF' + '20' }]}>
              <Pen color="#FF00FF" size={32} />
            </View>
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryTitle}>KANJI</Text>
              <Text style={styles.categorySubtitle}>N5 Characters</Text>
            </View>
          </TouchableOpacity>
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
    flex: 1,
    padding: SPACING.md,
  },
  header: {
    marginBottom: SPACING.xl,
    marginTop: SPACING.sm,
  },
  greeting: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  title: {
    fontSize: 32,
    color: COLORS.primary,
    fontWeight: '900',
    letterSpacing: 1,
  },
  grid: {
    gap: SPACING.md,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray,
    padding: SPACING.lg,
    borderRadius: 16,
    gap: SPACING.lg,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.accent,
    letterSpacing: 1,
    marginBottom: SPACING.xs,
  },
  categorySubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});
