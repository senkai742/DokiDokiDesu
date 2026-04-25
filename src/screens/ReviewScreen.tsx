import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING } from '../constants/theme';
import { useStore } from '../store/useStore';
import { FlipCard } from '../components/ui/FlipCard';
import { DokiButton } from '../components/ui/DokiButton';
import { useSharedValue } from 'react-native-reanimated';
import { Brain, RotateCcw, ChevronRight, Sparkles, Heart, AlertCircle, Volume2 } from 'lucide-react-native';
import { LESSON_1_VOCAB } from '../constants/vocab';
import { tts } from '../utils/tts';

const { width } = Dimensions.get('window');

// Combine vocab from all lessons for review
const ALL_VOCAB = [...LESSON_1_VOCAB];

type ReviewMode = 'random' | 'difficult' | 'favorites';

export const ReviewScreen: React.FC = () => {
  const { progress, addDifficultWord, removeDifficultWord, addFavorite, removeFavorite } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [reviewMode, setReviewMode] = useState<ReviewMode>('random');

  // Get words based on review mode
  const reviewWords = useMemo(() => {
    let words = ALL_VOCAB;
    
    if (reviewMode === 'difficult') {
      words = ALL_VOCAB.filter(w => progress.difficultWords.includes(w.id));
    } else if (reviewMode === 'favorites') {
      words = ALL_VOCAB.filter(w => progress.favorites.includes(w.id));
    }
    
    // Shuffle and take 10 words or all if less than 10
    return [...words].sort(() => Math.random() - 0.5).slice(0, 10);
  }, [reviewMode, progress.difficultWords, progress.favorites]);

  const currentWord = reviewWords[currentIndex];
  const isFlippedValue = useSharedValue(0);

  const handleFlip = () => {
    isFlippedValue.value = isFlippedValue.value === 0 ? 1 : 0;
    setIsFlipped(!isFlipped);
    // Auto-read when revealing the Japanese side
    if (!isFlipped && currentWord) {
      tts.speak(currentWord.kana, 'ja-JP');
    }
  };

  const handleSpeak = () => {
    if (currentWord) {
      tts.speak(currentWord.kana, 'ja-JP');
    }
  };

  const handleNext = () => {
    if (currentIndex < reviewWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
      isFlippedValue.value = 0;
      setIsFlipped(false);
      setReviewedCount(reviewedCount + 1);
    } else {
      setSessionComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setSessionComplete(false);
    setReviewedCount(0);
    isFlippedValue.value = 0;
  };

  if (sessionComplete) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.completeContainer}>
          <Sparkles size={80} color={COLORS.primary} />
          <Text style={styles.completeTitle}>Review Complete!</Text>
          <Text style={styles.completeSubtitle}>
            You reviewed {reviewWords.length} words
          </Text>
          <DokiButton
            title="Review Again"
            onPress={handleRestart}
            style={styles.restartBtn}
          />
        </View>
      </SafeAreaView>
    );
  }

  if (!currentWord) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.emptyContainer}>
          <Brain size={64} color={COLORS.textSecondary} />
          <Text style={styles.emptyTitle}>No Words to Review</Text>
          <Text style={styles.emptySubtitle}>
            Complete some lessons to unlock review words!
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Flashcard Review</Text>
        <Text style={styles.progressText}>
          {currentIndex + 1} / {reviewWords.length}
        </Text>
      </View>

      {/* Review Mode Selector */}
      <View style={styles.modeSelector}>
        <TouchableOpacity
          style={[styles.modeBtn, reviewMode === 'random' && styles.modeBtnActive]}
          onPress={() => setReviewMode('random')}
        >
          <Sparkles size={16} color={reviewMode === 'random' ? COLORS.background : COLORS.accent} />
          <Text style={[styles.modeText, reviewMode === 'random' && styles.modeTextActive]}>Random</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modeBtn, reviewMode === 'difficult' && styles.modeBtnActive]}
          onPress={() => setReviewMode('difficult')}
        >
          <AlertCircle size={16} color={reviewMode === 'difficult' ? COLORS.background : COLORS.accent} />
          <Text style={[styles.modeText, reviewMode === 'difficult' && styles.modeTextActive]}>
            Difficult {progress.difficultWords.length > 0 && `(${progress.difficultWords.length})`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modeBtn, reviewMode === 'favorites' && styles.modeBtnActive]}
          onPress={() => setReviewMode('favorites')}
        >
          <Heart size={16} color={reviewMode === 'favorites' ? COLORS.background : COLORS.accent} />
          <Text style={[styles.modeText, reviewMode === 'favorites' && styles.modeTextActive]}>
            Favorites {progress.favorites.length > 0 && `(${progress.favorites.length})`}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        {/* Progress Bar */}
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${((currentIndex) / reviewWords.length) * 100}%` }
            ]} 
          />
        </View>

        {/* Flashcard */}
        <FlipCard
          isFlipped={isFlippedValue}
          frontContent={
            <View style={styles.cardFace}>
              <Text style={styles.cardKanji}>{currentWord.kanji}</Text>
              <Text style={styles.cardKana}>{currentWord.kana}</Text>
              <TouchableOpacity style={styles.speakerBtn} onPress={handleSpeak}>
                <Volume2 color={COLORS.primary} size={32} />
              </TouchableOpacity>
              <Text style={styles.cardHint}>Tap to see meaning</Text>
            </View>
          }
          backContent={
            <View style={styles.cardFace}>
              <Text style={styles.cardEnglish}>{currentWord.english}</Text>
              <Text style={styles.cardRomaji}>{currentWord.romaji}</Text>
              <Text style={styles.partOfSpeech}>{currentWord.partOfSpeech}</Text>
              <TouchableOpacity style={styles.speakerBtnBack} onPress={handleSpeak}>
                <Volume2 color={COLORS.primary} size={28} />
                <Text style={styles.playAgainText}>Play again</Text>
              </TouchableOpacity>
            </View>
          }
          onPress={handleFlip}
        />

        {/* Controls */}
        <View style={styles.controls}>
          <TouchableOpacity onPress={handleFlip} style={styles.flipHint}>
            <RotateCcw size={20} color={COLORS.textSecondary} />
            <Text style={styles.flipHintText}>Tap card to flip</Text>
          </TouchableOpacity>

          <DokiButton
            title={currentIndex === reviewWords.length - 1 ? "FINISH" : "NEXT WORD"}
            onPress={handleNext}
            style={styles.nextBtn}
            icon={<ChevronRight color={COLORS.background} size={24} />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.accent,
    letterSpacing: 1,
  },
  progressText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    fontWeight: '700',
  },
  container: {
    flex: 1,
    padding: SPACING.lg,
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: COLORS.gray,
    borderRadius: 2,
    marginBottom: SPACING.xl,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  cardLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: SPACING.lg,
  },
  kanjiText: {
    fontSize: 72,
    fontWeight: '900',
    color: COLORS.accent,
    marginBottom: SPACING.md,
  },
  kanaText: {
    fontSize: 24,
    color: COLORS.textSecondary,
  },
  englishText: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.accent,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  romajiText: {
    fontSize: 20,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
  },
  partOfSpeechBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
  },
  partOfSpeechText: {
    color: COLORS.background,
    fontWeight: '700',
    fontSize: 12,
  },
  // FlipCard Styles
  cardFace: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  cardKanji: {
    fontSize: 72,
    fontWeight: '900',
    color: COLORS.accent,
    marginBottom: SPACING.md,
  },
  cardKana: {
    fontSize: 24,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  cardEnglish: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.accent,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  cardRomaji: {
    fontSize: 20,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  partOfSpeech: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
    color: COLORS.background,
    fontWeight: '700',
    fontSize: 12,
  },
  cardHint: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: SPACING.lg,
  },
  controls: {
    width: '100%',
    marginTop: SPACING.xl,
    alignItems: 'center',
  },
  flipHint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
    opacity: 0.6,
  },
  flipHintText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  nextBtn: {
    width: '100%',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.accent,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  emptySubtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  completeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  completeTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.accent,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  completeSubtitle: {
    fontSize: 18,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xl,
  },
  restartBtn: {
    width: width * 0.7,
  },
  modeSelector: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    gap: SPACING.sm,
  },
  modeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    backgroundColor: COLORS.gray,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
  },
  modeBtnActive: {
    backgroundColor: COLORS.primary,
  },
  modeText: {
    color: COLORS.accent,
    fontWeight: '600',
    fontSize: 14,
  },
  modeTextActive: {
    color: COLORS.background,
  },
  speakerBtn: {
    padding: SPACING.sm,
    marginTop: SPACING.md,
  },
  speakerBtnBack: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    padding: SPACING.sm,
    marginTop: SPACING.md,
  },
  playAgainText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
});
