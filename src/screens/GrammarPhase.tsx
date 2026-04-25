import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { lesson1 } from '../data/lessons/lesson1';
import Animated, { FadeInUp, Layout } from 'react-native-reanimated';
import { ChevronRight, Info, CheckCircle2 } from 'lucide-react-native';
import { useStore } from '../store/useStore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DokiButton } from '../components/ui/DokiButton';

export const GrammarPhase: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'GrammarPhase'>>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { lessonId } = route.params;
  const { setCurrentPhase } = useStore();

  const [activeExample, setActiveExample] = useState<number | null>(null);
  const grammar = lesson1.grammar;

  const handleNext = () => {
    setCurrentPhase('kanji');
    navigation.navigate('KanjiPhase', { lessonId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.phaseLabel}>GRAMMAR PHASE</Text>
          <Text style={styles.title}>Key Rules</Text>
        </View>

        {grammar.map((rule, index) => (
          <Animated.View 
            key={rule.id} 
            entering={FadeInUp.delay(index * 200)}
            style={styles.ruleCard}
          >
            <View style={styles.ruleHeader}>
              <View style={styles.iconBox}>
                <Info color={COLORS.secondary} size={20} />
              </View>
              <Text style={styles.ruleTitle}>{rule.title}</Text>
            </View>
            
            <Text style={styles.explanation}>{rule.explanation}</Text>

            <View style={styles.examplesContainer}>
              <Text style={styles.examplesLabel}>TAP TO REVEAL</Text>
              {rule.examples.map((example, exIndex) => (
                <TouchableOpacity 
                  key={exIndex}
                  activeOpacity={0.9}
                  onPress={() => setActiveExample(activeExample === exIndex ? null : exIndex)}
                  style={[styles.exampleItem, activeExample === exIndex && styles.activeExample]}
                >
                  <Text style={styles.japaneseText}>{example.japanese}</Text>
                  {activeExample === exIndex && (
                    <Animated.View entering={FadeInUp} layout={Layout.springify()}>
                      <Text style={styles.romajiText}>{example.romaji}</Text>
                      <Text style={styles.englishText}>{example.english}</Text>
                    </Animated.View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        ))}

        <DokiButton 
          title="CONTINUE TO KANJI"
          onPress={handleNext}
          color={COLORS.secondary}
          style={styles.nextButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: SPACING.md,
  },
  header: {
    marginBottom: SPACING.xl,
    marginTop: SPACING.lg,
  },
  phaseLabel: {
    fontSize: 12,
    fontWeight: '900',
    color: COLORS.secondary,
    letterSpacing: 2,
  },
  title: {
    fontSize: 48,
    fontWeight: '900',
    color: COLORS.accent,
  },
  ruleCard: {
    backgroundColor: COLORS.gray,
    borderRadius: 20,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.secondary,
  },
  ruleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  iconBox: {
    padding: 8,
    backgroundColor: COLORS.background,
    borderRadius: 8,
  },
  ruleTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.accent,
  },
  explanation: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 24,
    marginBottom: SPACING.lg,
  },
  examplesContainer: {
    marginTop: SPACING.sm,
  },
  examplesLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: COLORS.locked,
    letterSpacing: 1,
    marginBottom: SPACING.sm,
  },
  exampleItem: {
    backgroundColor: COLORS.background,
    padding: SPACING.md,
    borderRadius: 12,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  activeExample: {
    borderColor: COLORS.secondary + '66',
  },
  japaneseText: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.accent,
  },
  romajiText: {
    fontSize: 14,
    color: COLORS.secondary,
    marginTop: 4,
  },
  englishText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondary,
    marginTop: SPACING.xl,
    marginBottom: SPACING.xl,
    padding: SPACING.lg,
    borderRadius: 16,
    gap: SPACING.sm,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.background,
    letterSpacing: 1,
  },
});
