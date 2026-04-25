import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { lesson1 } from '../data/lessons/lesson1'; // In real app, fetch via hook
import { VocabWord } from '../types/lesson';
import Animated, { FadeInRight, FadeOutLeft, SlideInRight } from 'react-native-reanimated';
import { ChevronRight, Volume2, CheckCircle2 } from 'lucide-react-native';
import { useStore } from '../store/useStore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DokiButton } from '../components/ui/DokiButton';

const { width } = Dimensions.get('window');

export const VocabPhase: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'VocabPhase'>>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { lessonId } = route.params;
  const { setCurrentPhase } = useStore();

  const [currentIndex, setCurrentIndex] = useState(0);
  const vocab = lesson1.vocab; // Simplified for now

  const currentWord = vocab[currentIndex];

  const handleNext = () => {
    if (currentIndex < vocab.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Completed vocab phase
      setCurrentPhase('grammar');
      navigation.navigate('GrammarPhase', { lessonId });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${((currentIndex + 1) / vocab.length) * 100}%` }]} />
        </View>
        <Text style={styles.progressText}>{currentIndex + 1} / {vocab.length}</Text>
      </View>

      <View style={styles.cardContainer}>
        <Animated.View 
          key={currentWord.id}
          entering={FadeInRight.duration(400)}
          exiting={FadeOutLeft.duration(400)}
          style={styles.card}
        >
          <Text style={styles.kanji}>{currentWord.kanji}</Text>
          <Text style={styles.kana}>{currentWord.kana}</Text>
          <View style={styles.divider} />
          <Text style={styles.english}>{currentWord.english}</Text>
          <Text style={styles.romaji}>[{currentWord.romaji}]</Text>
          
          <TouchableOpacity style={styles.audioButton}>
            <Volume2 color={COLORS.primary} size={32} />
          </TouchableOpacity>

          {currentWord.exampleSentence && (
            <View style={styles.exampleBox}>
              <Text style={styles.exampleLabel}>EXAMPLE</Text>
              <Text style={styles.exampleText}>{currentWord.exampleSentence}</Text>
              <Text style={styles.exampleEnglish}>{currentWord.exampleEnglish}</Text>
            </View>
          )}
        </Animated.View>
      </View>

      <DokiButton 
        title={currentIndex === vocab.length - 1 ? 'FINISH BATCH' : 'NEXT WORD'}
        onPress={handleNext}
        style={styles.nextButton}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.gray,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  progressText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    width: 40,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  card: {
    width: '100%',
    backgroundColor: COLORS.gray,
    borderRadius: 24,
    padding: SPACING.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary + '44', // Subtle border
  },
  kanji: {
    fontSize: 72,
    fontWeight: '900',
    color: COLORS.accent,
  },
  kana: {
    fontSize: 24,
    color: COLORS.primary,
    marginTop: SPACING.sm,
    fontWeight: '700',
  },
  divider: {
    width: 60,
    height: 4,
    backgroundColor: COLORS.secondary,
    marginVertical: SPACING.xl,
  },
  english: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.accent,
    textAlign: 'center',
  },
  romaji: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  audioButton: {
    marginTop: SPACING.xl,
    backgroundColor: COLORS.background,
    padding: SPACING.md,
    borderRadius: 50,
  },
  exampleBox: {
    marginTop: SPACING.xl,
    width: '100%',
    padding: SPACING.md,
    backgroundColor: COLORS.background,
    borderRadius: 12,
  },
  exampleLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: COLORS.secondary,
    letterSpacing: 1,
    marginBottom: 4,
  },
  exampleText: {
    fontSize: 16,
    color: COLORS.accent,
    lineHeight: 24,
  },
  exampleEnglish: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    margin: SPACING.lg,
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
