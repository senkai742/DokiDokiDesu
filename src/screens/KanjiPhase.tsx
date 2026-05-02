import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { lesson1 } from '../data/lessons/lesson1';
import Animated, { useAnimatedStyle, withSpring, interpolate, useSharedValue } from 'react-native-reanimated';
import { ChevronRight, RotateCcw, Volume2 } from 'lucide-react-native';
import { useStore } from '../store/useStore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DokiButton } from '../components/ui/DokiButton';
import { tts } from '../utils/tts';

const { width } = Dimensions.get('window');

export const KanjiPhase: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'KanjiPhase'>>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { lessonId } = route.params;
  const { markKanjiLearned } = useStore();

  const [currentIndex, setCurrentIndex] = useState(0);
  const kanji = lesson1.kanji;
  const currentKanji = kanji[currentIndex];

  const rotate = useSharedValue(0);
  const isFlipped = useSharedValue(false);

  const frontStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${interpolate(rotate.value, [0, 180], [0, 180])}deg` }],
    zIndex: rotate.value <= 90 ? 1 : 0,
    opacity: rotate.value <= 90 ? 1 : 0,
  }));

  const backStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${interpolate(rotate.value, [0, 180], [180, 360])}deg` }],
    zIndex: rotate.value > 90 ? 1 : 0,
    opacity: rotate.value > 90 ? 1 : 0,
  }));

  const flip = () => {
    rotate.value = withSpring(isFlipped.value ? 0 : 180, { damping: 12 });
    isFlipped.value = !isFlipped.value;
    // Auto-read when flipping to back (shows readings)
    if (!isFlipped.value && currentKanji.kunYomi) {
      tts.speak(currentKanji.kunYomi, 'ja-JP');
    }
  };

  const handleSpeak = () => {
    // Read kun-yomi first (more common), then on-yomi
    const reading = currentKanji.kunYomi || currentKanji.onYomi;
    if (reading) {
      tts.speak(reading, 'ja-JP');
    }
  };

  const handleNext = () => {
    // Mark current kanji as learned when moving to next
    markKanjiLearned(currentKanji.id);
    
    if (currentIndex < kanji.length - 1) {
      setCurrentIndex(currentIndex + 1);
      rotate.value = 0;
      isFlipped.value = false;
    } else {
      setCurrentPhase('quiz');
      navigation.navigate('MasteryQuiz', { lessonId });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.phaseLabel}>KANJI PHASE</Text>
        <Text style={styles.progressText}>{currentIndex + 1} / {kanji.length}</Text>
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity activeOpacity={1} onPress={flip} style={styles.flipWrapper}>
          {/* Front Side */}
          <Animated.View style={[styles.card, styles.cardFront, frontStyle]}>
            <Text style={styles.kanjiChar}>{currentKanji.character}</Text>
            <View style={styles.tapToFlip}>
              <RotateCcw color={COLORS.primary} size={20} />
              <Text style={styles.tapText}>TAP TO FLIP</Text>
            </View>
          </Animated.View>

          {/* Back Side */}
          <Animated.View style={[styles.card, styles.cardBack, backStyle]}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>ON</Text>
              <Text style={styles.infoValue}>{currentKanji.onYomi}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>KUN</Text>
              <Text style={styles.infoValue}>{currentKanji.kunYomi}</Text>
            </View>
            <TouchableOpacity style={styles.speakBtn} onPress={handleSpeak}>
              <Volume2 color={COLORS.secondary} size={28} />
            </TouchableOpacity>
            <View style={styles.divider} />
            <Text style={styles.meaningText}>{currentKanji.meaning}</Text>
            
            <View style={styles.examplesList}>
              {currentKanji.examples.map((ex, i) => (
                <View key={i} style={styles.exampleItem}>
                  <Text style={styles.exWord}>{ex.word} ({ex.reading})</Text>
                  <Text style={styles.exMeaning}>{ex.meaning}</Text>
                </View>
              ))}
            </View>
          </Animated.View>
        </TouchableOpacity>
      </View>

      <DokiButton 
        title={currentIndex === kanji.length - 1 ? 'START QUIZ' : 'NEXT KANJI'}
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  phaseLabel: {
    fontSize: 12,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: 2,
  },
  progressText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '700',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  flipWrapper: {
    width: width - SPACING.xl * 2,
    height: width * 1.2,
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.gray,
    borderRadius: 32,
    padding: SPACING.xl,
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    borderWidth: 2,
    borderColor: COLORS.primary + '44',
  },
  cardFront: {
    backgroundColor: COLORS.gray,
  },
  cardBack: {
    backgroundColor: COLORS.gray,
    alignItems: 'flex-start',
  },
  kanjiChar: {
    fontSize: 120,
    fontWeight: '900',
    color: COLORS.accent,
  },
  tapToFlip: {
    position: 'absolute',
    bottom: SPACING.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tapText: {
    color: COLORS.primary,
    fontWeight: '900',
    fontSize: 14,
    letterSpacing: 1,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: SPACING.sm,
    alignItems: 'center',
  },
  infoLabel: {
    width: 60,
    fontSize: 12,
    fontWeight: '900',
    color: COLORS.secondary,
  },
  infoValue: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.accent,
  },
  speakBtn: {
    alignSelf: 'center',
    padding: SPACING.sm,
    marginVertical: SPACING.sm,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.locked,
    marginVertical: SPACING.md,
  },
  meaningText: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.primary,
    marginBottom: SPACING.lg,
  },
  examplesList: {
    width: '100%',
  },
  exampleItem: {
    marginBottom: SPACING.md,
  },
  exWord: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.accent,
  },
  exMeaning: {
    fontSize: 14,
    color: COLORS.textSecondary,
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
