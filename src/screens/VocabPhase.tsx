import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING } from '../constants/theme';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LESSON_1_VOCAB, LESSON_2_VOCAB, LESSON_3_VOCAB, LESSON_4_VOCAB, LESSON_5_VOCAB, LESSON_6_VOCAB, LESSON_7_VOCAB, LESSON_8_VOCAB, LESSON_9_VOCAB, LESSON_10_VOCAB, LESSON_11_VOCAB, LESSON_12_VOCAB, LESSON_13_VOCAB, LESSON_14_VOCAB, LESSON_15_VOCAB, LESSON_16_VOCAB, LESSON_17_VOCAB, LESSON_18_VOCAB, LESSON_19_VOCAB, LESSON_20_VOCAB, LESSON_21_VOCAB, LESSON_22_VOCAB, LESSON_23_VOCAB, LESSON_24_VOCAB, LESSON_25_VOCAB } from '../constants/vocab';
import { FlipCard } from '../components/ui/FlipCard';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import Animated, { useAnimatedStyle, withSpring, withRepeat } from 'react-native-reanimated';
import { ChevronLeft, Volume2, Search, BookOpen, List, ChevronRight, Lightbulb, RotateCcw } from 'lucide-react-native';
import { DokiButton } from '../components/ui/DokiButton';
import { tts } from '../utils/tts';
import { useStore } from '../store/useStore';

const { width } = Dimensions.get('window');
const BATCH_SIZE = 10;

export const VocabPhase: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'VocabPhase'>>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { lessonId } = route.params;
  const { setLessonCompleted, incrementVocab } = useStore();

  const vocabData = useMemo(() => {
    switch (lessonId) {
      case 2: return LESSON_2_VOCAB;
      case 3: return LESSON_3_VOCAB;
      case 4: return LESSON_4_VOCAB;
      case 5: return LESSON_5_VOCAB;
      case 6: return LESSON_6_VOCAB;
      case 7: return LESSON_7_VOCAB;
      case 8: return LESSON_8_VOCAB;
      case 9: return LESSON_9_VOCAB;
      case 10: return LESSON_10_VOCAB;
      case 11: return LESSON_11_VOCAB;
      case 12: return LESSON_12_VOCAB;
      case 13: return LESSON_13_VOCAB;
      case 14: return LESSON_14_VOCAB;
      case 15: return LESSON_15_VOCAB;
      case 16: return LESSON_16_VOCAB;
      case 17: return LESSON_17_VOCAB;
      case 18: return LESSON_18_VOCAB;
      case 19: return LESSON_19_VOCAB;
      case 20: return LESSON_20_VOCAB;
      case 21: return LESSON_21_VOCAB;
      case 22: return LESSON_22_VOCAB;
      case 23: return LESSON_23_VOCAB;
      case 24: return LESSON_24_VOCAB;
      case 25: return LESSON_25_VOCAB;
      default: return LESSON_1_VOCAB;
    }
  }, [lessonId]);

  const [viewMode, setViewMode] = useState<'study' | 'review'>('study');
  const [activeBatchIndex, setActiveBatchIndex] = useState(0);
  const [wordIndexInBatch, setWordIndexInBatch] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCongrats, setShowCongrats] = useState(false);
  const isFlipped = useSharedValue(0);

  // Chunk vocab into batches of 10
  const batches = useMemo(() => {
    const result = [];
    for (let i = 0; i < vocabData.length; i += BATCH_SIZE) {
      result.push(vocabData.slice(i, i + BATCH_SIZE));
    }
    return result;
  }, [vocabData]);

  const currentBatch = batches[activeBatchIndex];
  const currentWord = currentBatch[wordIndexInBatch];
  
  // Track "seen" words for review mode
  const seenWords = useMemo(() => {
    const totalSeenCount = activeBatchIndex * BATCH_SIZE + wordIndexInBatch + 1;
    return vocabData.slice(0, totalSeenCount);
  }, [activeBatchIndex, wordIndexInBatch, vocabData]);

  const filteredSeenWords = seenWords.filter(word => 
    word.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
    word.kana.includes(searchQuery) ||
    word.kanji.includes(searchQuery)
  );

  const handlePrevWord = () => {
    if (activeBatchIndex === 0 && wordIndexInBatch === 0) return; // Already at first word
    isFlipped.value = 0;
    if (wordIndexInBatch > 0) {
      setWordIndexInBatch(prev => prev - 1);
    } else if (activeBatchIndex > 0) {
      setActiveBatchIndex(prev => prev - 1);
      setWordIndexInBatch(batches[activeBatchIndex - 1].length - 1);
    }
  };

  const handleNextWord = () => {
    isFlipped.value = 0;
    // Increment vocab count for the word just studied
    incrementVocab(1);
    if (wordIndexInBatch < currentBatch.length - 1) {
      setWordIndexInBatch(prev => prev + 1);
    } else if (activeBatchIndex < batches.length - 1) {
      setActiveBatchIndex(prev => prev + 1);
      setWordIndexInBatch(0);
    } else {
      // Lesson Complete - show congrats modal
      setShowCongrats(true);
      setLessonCompleted(lessonId);
    }
  };

  const handleCongratsClose = () => {
    setShowCongrats(false);
    if (lessonId < 25) {
      navigation.navigate('LessonMap', { level: 'N5', mode: 'vocab' });
    } else {
      navigation.navigate('MainTabs');
    }
  };

  const toggleFlip = () => {
    isFlipped.value = withTiming(isFlipped.value === 0 ? 1 : 0, { duration: 400 });
    // Auto-read when flipping to back (meaning side shows Japanese)
    if (isFlipped.value === 0) {
      tts.speak(currentWord.kana, 'ja-JP');
    }
  };

  const handleSpeak = () => {
    tts.speak(currentWord.kana, 'ja-JP');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeft color={COLORS.accent} size={28} />
          </TouchableOpacity>
          <View style={styles.modeToggle}>
            <TouchableOpacity 
              onPress={() => setViewMode('study')}
              style={[styles.modeBtn, viewMode === 'study' && styles.activeModeBtn]}
            >
              <BookOpen size={20} color={viewMode === 'study' ? COLORS.background : COLORS.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setViewMode('review')}
              style={[styles.modeBtn, viewMode === 'review' && styles.activeModeBtn]}
            >
              <List size={20} color={viewMode === 'review' ? COLORS.background : COLORS.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Batch Progress Segments */}
        <View style={styles.progressSegments}>
          {batches.map((_, idx) => (
            <View 
              key={idx} 
              style={[
                styles.segment, 
                idx < activeBatchIndex && styles.segmentCompleted,
                idx === activeBatchIndex && styles.segmentActive,
              ]} 
            >
              {idx === activeBatchIndex && (
                <View style={[styles.segmentFill, { width: `${((wordIndexInBatch + 1) / BATCH_SIZE) * 100}%` }]} />
              )}
            </View>
          ))}
        </View>

        {viewMode === 'study' ? (
          <View style={styles.studyView}>
            <View style={styles.carouselContainer}>
              <FlipCard 
                isFlipped={isFlipped}
                onPress={toggleFlip}
                frontContent={
                  <View style={styles.cardContent}>
                    <Text style={styles.kanjiLarge}>{currentWord.kanji}</Text>
                    <Text style={styles.kanaLarge}>{currentWord.kana}</Text>
                    <Text style={styles.tapToFlip}>TAP TO REVEAL</Text>
                  </View>
                }
                backContent={
                  <View style={styles.cardContent}>
                    <Text style={styles.englishLarge}>{currentWord.english}</Text>
                    <Text style={styles.romajiLarge}>[{currentWord.romaji}]</Text>
                    <TouchableOpacity style={styles.audioIcon} onPress={handleSpeak}>
                      <Volume2 color={COLORS.secondary} size={40} />
                    </TouchableOpacity>
                  </View>
                }
              />
            </View>

            {/* Previous Word & Grammar Rule */}
            {(wordIndexInBatch > 0 || activeBatchIndex > 0) && (
              <View style={styles.prevWordContainer}>
                <View style={styles.prevWordRow}>
                  <RotateCcw size={16} color={COLORS.textSecondary} />
                  <Text style={styles.prevWordLabel}>Previous:</Text>
                  <Text style={styles.prevWordText}>
                    {activeBatchIndex > 0 && wordIndexInBatch === 0 
                      ? batches[activeBatchIndex - 1][batches[activeBatchIndex - 1].length - 1].kanji
                      : currentBatch[wordIndexInBatch - 1]?.kanji}
                  </Text>
                </View>
              </View>
            )}

            {/* Grammar Rule Hint */}
            <View style={styles.grammarHintContainer}>
              <Lightbulb size={16} color="#FFD700" />
              <Text style={styles.grammarHintText}>
                {currentWord.partOfSpeech === 'noun' && 'Nouns don\'t conjugate - use directly in sentences'}
                {currentWord.partOfSpeech === 'verb' && 'Verbs conjugate based on tense and politeness level'}
                {currentWord.partOfSpeech === 'adjective' && 'i-adjectives conjugate like verbs'}
                {currentWord.partOfSpeech === 'expression' && 'Common phrase - use in casual conversation'}
                {!['noun', 'verb', 'adjective', 'expression'].includes(currentWord.partOfSpeech) && 'Focus on the reading and meaning'}
              </Text>
            </View>

            <View style={styles.footer}>
              <Text style={styles.batchInfo}>BATCH {activeBatchIndex + 1} • {wordIndexInBatch + 1}/{BATCH_SIZE}</Text>
              <View style={styles.buttonRow}>
                <DokiButton 
                  title="PREV"
                  onPress={handlePrevWord}
                  style={{ ...styles.navBtn, ...styles.prevBtn, opacity: (activeBatchIndex === 0 && wordIndexInBatch === 0) ? 0.5 : 1 }}
                />
                <DokiButton 
                  title={
                    activeBatchIndex === batches.length - 1 && wordIndexInBatch === currentBatch.length - 1 
                      ? "FINISH" 
                      : wordIndexInBatch === currentBatch.length - 1 
                      ? "NEXT BATCH" 
                      : "NEXT"
                  } 
                  onPress={handleNextWord}
                  style={styles.navBtn}
                />
              </View>
            </View>

            {/* Congrats Modal */}
            <Modal
              visible={showCongrats}
              transparent
              animationType="fade"
              onRequestClose={handleCongratsClose}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.congratsCard}>
                  <Text style={styles.congratsEmoji}>🎉</Text>
                  <Text style={styles.congratsTitle}>Lesson Complete!</Text>
                  <Text style={styles.congratsSubtitle}>You've mastered {vocabData.length} words</Text>
                  <Text style={styles.congratsUnlock}>Next lesson unlocked!</Text>
                  <TouchableOpacity style={styles.congratsBtn} onPress={handleCongratsClose}>
                    <Text style={styles.congratsBtnText}>Continue</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        ) : (
          <View style={styles.reviewView}>
            <View style={styles.searchContainer}>
              <Search size={20} color={COLORS.textSecondary} />
              <TextInput 
                style={styles.searchInput}
                placeholder="Search seen words..."
                placeholderTextColor={COLORS.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            <FlatList 
              data={filteredSeenWords}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContent}
              renderItem={({ item }) => (
                <View style={styles.listItem}>
                  <View style={styles.listMain}>
                    <Text style={styles.listKanji}>{item.kanji}</Text>
                    <Text style={styles.listEnglish}>{item.english}</Text>
                  </View>
                  <TouchableOpacity style={styles.listAudio} onPress={() => tts.speak(item.kana, 'ja-JP')}>
                    <Volume2 size={24} color={COLORS.primary} />
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        )}
      </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  modeToggle: {
    flexDirection: 'row',
    backgroundColor: COLORS.gray,
    borderRadius: 12,
    padding: 4,
  },
  modeBtn: {
    padding: 8,
    borderRadius: 8,
    width: 40,
    alignItems: 'center',
  },
  activeModeBtn: {
    backgroundColor: COLORS.accent,
  },
  progressSegments: {
    flexDirection: 'row',
    gap: 4,
    height: 6,
    marginBottom: SPACING.xl,
  },
  segment: {
    flex: 1,
    backgroundColor: COLORS.gray,
    borderRadius: 3,
    overflow: 'hidden',
  },
  segmentActive: {
    backgroundColor: COLORS.gray,
  },
  segmentCompleted: {
    backgroundColor: COLORS.primary,
  },
  segmentFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  studyView: {
    flex: 1,
  },
  carouselContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    alignItems: 'center',
  },
  kanjiLarge: {
    fontSize: 80,
    fontWeight: '900',
    color: COLORS.accent,
  },
  kanaLarge: {
    fontSize: 28,
    color: COLORS.primary,
    marginTop: SPACING.md,
    fontWeight: '700',
  },
  tapToFlip: {
    position: 'absolute',
    bottom: -60,
    color: COLORS.textSecondary,
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: '900',
  },
  englishLarge: {
    fontSize: 42,
    fontWeight: '900',
    color: COLORS.secondary,
    textAlign: 'center',
  },
  romajiLarge: {
    fontSize: 20,
    color: COLORS.textSecondary,
    marginTop: 10,
  },
  audioIcon: {
    marginTop: 40,
    padding: 20,
    backgroundColor: COLORS.background,
    borderRadius: 50,
  },
  footer: {
    paddingBottom: SPACING.lg,
    alignItems: 'center',
  },
  batchInfo: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: SPACING.md,
  },
  nextBtn: {
    width: '100%',
  },
  reviewView: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray,
    paddingHorizontal: SPACING.md,
    borderRadius: 12,
    marginBottom: SPACING.md,
  },
  searchInput: {
    flex: 1,
    height: 45,
    color: COLORS.accent,
    paddingLeft: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.gray,
    padding: SPACING.lg,
    borderRadius: 16,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: '#222',
  },
  listMain: {
    flex: 1,
  },
  listKanji: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.accent,
  },
  listEnglish: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  listAudio: {
    padding: 8,
  },
  prevWordContainer: {
    backgroundColor: COLORS.gray,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
  },
  prevWordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  prevWordLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  prevWordText: {
    fontSize: 14,
    color: COLORS.accent,
    fontWeight: '700',
  },
  grammarHintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    backgroundColor: COLORS.gray,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    borderLeftWidth: 3,
    borderLeftColor: '#FFD700',
  },
  grammarHintText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    justifyContent: 'center',
  },
  navBtn: {
    flex: 1,
  },
  prevBtn: {
    backgroundColor: COLORS.gray,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  congratsCard: {
    backgroundColor: COLORS.gray,
    padding: SPACING.xl,
    borderRadius: 20,
    alignItems: 'center',
    gap: SPACING.md,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  congratsEmoji: {
    fontSize: 48,
  },
  congratsTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.accent,
  },
  congratsSubtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  congratsUnlock: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '700',
  },
  congratsBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: 12,
    marginTop: SPACING.md,
  },
  congratsBtnText: {
    color: COLORS.background,
    fontWeight: '900',
    fontSize: 16,
  },
});
