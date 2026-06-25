import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList, TextInput, Modal, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING } from '../constants/theme';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LESSON_1_VOCAB, LESSON_2_VOCAB, LESSON_3_VOCAB, LESSON_4_VOCAB, LESSON_5_VOCAB, LESSON_6_VOCAB, LESSON_7_VOCAB, LESSON_8_VOCAB, LESSON_9_VOCAB, LESSON_10_VOCAB, LESSON_11_VOCAB, LESSON_12_VOCAB, LESSON_13_VOCAB, LESSON_14_VOCAB, LESSON_15_VOCAB, LESSON_16_VOCAB, LESSON_17_VOCAB, LESSON_18_VOCAB, LESSON_19_VOCAB, LESSON_20_VOCAB, LESSON_21_VOCAB, LESSON_22_VOCAB, LESSON_23_VOCAB, LESSON_24_VOCAB, LESSON_25_VOCAB } from '../constants/vocab';
import { FlipCard } from '../components/ui/FlipCard';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import Animated, { useAnimatedStyle, withSpring, withRepeat } from 'react-native-reanimated';
import { ChevronLeft, Volume2, Search, BookOpen, List, ChevronRight, Lightbulb, RotateCcw, LayoutGrid, Heart, FolderPlus, Check, X } from 'lucide-react-native';
import { DokiButton } from '../components/ui/DokiButton';
import { tts } from '../utils/tts';
import { useStore } from '../store/useStore';
import { makeGlobalWordId } from '../utils/vocabLookup';

const { width } = Dimensions.get('window');
const BATCH_SIZE = 10;

export const VocabPhase: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'VocabPhase'>>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { lessonId } = route.params;
  const { completeVocabLesson, incrementVocab, addFavorite, removeFavorite, addWordToCollection, progress } = useStore();

  // Collection picker modal state
  const [collectionPickerWordId, setCollectionPickerWordId] = useState<string | null>(null);

  const collections = progress.collections ?? [];
  const favorites = progress.favorites ?? [];

  const toggleFavorite = (globalId: string) => {
    if (favorites.includes(globalId)) {
      removeFavorite(globalId);
    } else {
      addFavorite(globalId);
    }
  };

  const openCollectionPicker = (globalId: string) => {
    setCollectionPickerWordId(globalId);
  };

  const handleAddToCollection = (collectionId: string) => {
    if (!collectionPickerWordId) return;
    addWordToCollection(collectionId, collectionPickerWordId);
    setCollectionPickerWordId(null);
  };

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

  const [viewMode, setViewMode] = useState<'study' | 'review' | 'grid'>('study');
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
      completeVocabLesson(lessonId);
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
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
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
          <TouchableOpacity 
            onPress={() => setViewMode('grid')}
            style={[styles.modeBtn, viewMode === 'grid' && styles.activeModeBtn]}
          >
            <LayoutGrid size={20} color={viewMode === 'grid' ? COLORS.background : COLORS.textSecondary} />
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
          <View style={styles.contentArea}>
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
          </View>

          <View style={styles.footer}>
            <Text style={styles.batchInfo}>BATCH {activeBatchIndex + 1} • {wordIndexInBatch + 1}/{BATCH_SIZE}</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity 
                onPress={handlePrevWord}
                disabled={activeBatchIndex === 0 && wordIndexInBatch === 0}
                style={[styles.navBtn, styles.prevBtn, (activeBatchIndex === 0 && wordIndexInBatch === 0) && styles.navBtnDisabled]}
              >
                <ChevronLeft color={(activeBatchIndex === 0 && wordIndexInBatch === 0) ? COLORS.textSecondary : COLORS.accent} size={24} />
                <Text style={[styles.navBtnText, (activeBatchIndex === 0 && wordIndexInBatch === 0) && styles.navBtnTextDisabled]}>PREV</Text>
                <View style={{ width: 24 }} />
              </TouchableOpacity>

              {/* Favourite button */}
              <TouchableOpacity
                onPress={() => toggleFavorite(makeGlobalWordId(lessonId, currentWord.id))}
                style={styles.heartBtn}
              >
                <Heart
                  size={22}
                  color="#FF4D6D"
                  fill={favorites.includes(makeGlobalWordId(lessonId, currentWord.id)) ? '#FF4D6D' : 'transparent'}
                />
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={handleNextWord}
                style={[styles.navBtn, styles.nextBtn]}
              >
                <View style={{ width: 24 }} />
                <Text style={styles.nextBtnText}>
                  {activeBatchIndex === batches.length - 1 && wordIndexInBatch === currentBatch.length - 1 
                    ? "FINISH" 
                    : wordIndexInBatch === currentBatch.length - 1 
                    ? "NEXT BATCH" 
                    : "NEXT"}
                </Text>
                <ChevronRight color={COLORS.background} size={24} />
              </TouchableOpacity>
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
      ) : viewMode === 'review' ? (
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
            key="review-list"
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
      ) : (
        <View style={styles.gridView}>
          <View style={styles.gridHeader}>
            <Text style={styles.gridTitle}>ALL WORDS</Text>
            <Text style={styles.gridCount}>{vocabData.length} vocab</Text>
          </View>
          <View style={styles.gridHint}>
            <Text style={styles.gridHintText}>
              ♥ Favourite   📁 Add to collection
            </Text>
          </View>
          <FlatList
            key="grid-list"
            data={vocabData}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.gridContent}
            columnWrapperStyle={styles.gridRow}
            renderItem={({ item, index }) => {
              const globalId = makeGlobalWordId(lessonId, item.id);
              const isFav = favorites.includes(globalId);
              return (
                <View style={styles.gridCard}>
                  <View style={styles.gridCardTop}>
                    <Text style={styles.gridIndex}>{index + 1}</Text>
                    <View style={styles.gridCardBtns}>
                      <TouchableOpacity
                        onPress={() => tts.speak(item.kana, 'ja-JP')}
                        style={styles.gridAudioBtn}
                      >
                        <Volume2 size={13} color={COLORS.primary} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => toggleFavorite(globalId)}
                        style={styles.gridAudioBtn}
                      >
                        <Heart
                          size={13}
                          color="#FF4D6D"
                          fill={isFav ? '#FF4D6D' : 'transparent'}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => openCollectionPicker(globalId)}
                        style={styles.gridAudioBtn}
                      >
                        <FolderPlus size={13} color="#C084FC" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text style={styles.gridKanji} numberOfLines={1} adjustsFontSizeToFit>{item.kanji}</Text>
                  <Text style={styles.gridKana} numberOfLines={1}>{item.kana}</Text>
                  <View style={styles.gridDivider} />
                  <Text style={styles.gridEnglish} numberOfLines={2}>{item.english}</Text>
                  <Text style={styles.gridPos}>{item.partOfSpeech}</Text>
                </View>
              );
            }}
          />
        </View>
      )}

      {/* Collection Picker Modal (long-press on ♥) */}
      <Modal
        visible={!!collectionPickerWordId}
        transparent
        animationType="slide"
        onRequestClose={() => setCollectionPickerWordId(null)}
      >
        <TouchableOpacity
          style={styles.pickerOverlay}
          activeOpacity={1}
          onPress={() => setCollectionPickerWordId(null)}
        >
          <TouchableOpacity activeOpacity={1} style={styles.pickerSheet}>
            <View style={styles.pickerHandle} />
            <Text style={styles.pickerTitle}>Add to Collection</Text>
            {collections.length === 0 ? (
              <View style={styles.pickerEmpty}>
                <Text style={styles.pickerEmptyText}>
                  No collections yet. Go to Review → Collections to create one.
                </Text>
              </View>
            ) : (
              <ScrollView showsVerticalScrollIndicator={false}>
                {collections.map(col => {
                  const alreadyIn = col.wordIds.includes(collectionPickerWordId ?? '');
                  return (
                    <TouchableOpacity
                      key={col.id}
                      style={[styles.pickerItem, alreadyIn && styles.pickerItemActive]}
                      onPress={() => !alreadyIn && handleAddToCollection(col.id)}
                      disabled={alreadyIn}
                    >
                      <Text style={styles.pickerEmoji}>{col.emoji}</Text>
                      <View style={styles.pickerItemMeta}>
                        <Text style={styles.pickerItemName}>{col.name}</Text>
                        <Text style={styles.pickerItemCount}>{col.wordIds.length} words</Text>
                      </View>
                      {alreadyIn && <Check size={18} color={COLORS.primary} />}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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
    justifyContent: 'space-between',
  },
  carouselContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
    width: '100%',
  },
  kanjiLarge: {
    fontSize: 72,
    fontWeight: '900',
    color: COLORS.accent,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  kanaLarge: {
    fontSize: 24,
    color: COLORS.primary,
    marginTop: SPACING.md,
    fontWeight: '700',
    textAlign: 'center',
  },
  tapToFlip: {
    position: 'absolute',
    bottom: -50,
    color: COLORS.textSecondary,
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: '900',
  },
  englishLarge: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.secondary,
    textAlign: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.md,
  },
  romajiLarge: {
    fontSize: 18,
    color: COLORS.textSecondary,
    marginTop: SPACING.md,
    textAlign: 'center',
  },
  audioIcon: {
    marginTop: 40,
    padding: 20,
    backgroundColor: COLORS.background,
    borderRadius: 50,
  },
  contentArea: {
    flex: 1,
    justifyContent: 'center',
  },
  footer: {
    padding: SPACING.md,
    paddingBottom: SPACING.lg,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#222',
  },
  batchInfo: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: SPACING.md,
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
  // Grid View
  gridView: {
    flex: 1,
  },
  gridHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
    paddingHorizontal: 2,
  },
  gridTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: COLORS.textSecondary,
    letterSpacing: 2,
  },
  gridCount: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  gridHint: {
    marginBottom: SPACING.md,
  },
  gridHintText: {
    fontSize: 11,
    color: '#555',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  gridContent: {
    paddingBottom: 20,
  },
  gridRow: {
    gap: 10,
    marginBottom: 10,
  },
  gridCard: {
    flex: 1,
    backgroundColor: COLORS.gray,
    borderRadius: 14,
    padding: SPACING.md,
    minHeight: 130,
    justifyContent: 'space-between',
  },
  gridCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  gridIndex: {
    fontSize: 11,
    fontWeight: '700',
    color: '#444',
    letterSpacing: 1,
  },
  gridAudioBtn: {
    padding: 4,
  },
  gridCardBtns: {
    flexDirection: 'row',
    gap: 2,
  },
  // Heart button in study footer
  heartBtn: {
    width: 48,
    height: 56,
    borderRadius: 14,
    backgroundColor: '#1A0A0D',
    borderWidth: 2,
    borderColor: '#3D1520',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Collection picker modal
  pickerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  pickerSheet: {
    backgroundColor: '#161616',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: SPACING.lg,
    paddingBottom: 40,
    maxHeight: '70%',
  },
  pickerHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: SPACING.md,
  },
  pickerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.accent,
    marginBottom: SPACING.md,
  },
  pickerEmpty: {
    paddingVertical: SPACING.xl,
    alignItems: 'center',
  },
  pickerEmptyText: {
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 22,
  },
  pickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    borderRadius: 14,
    marginBottom: 4,
  },
  pickerItemActive: {
    backgroundColor: COLORS.primary + '18',
  },
  pickerEmoji: {
    fontSize: 26,
    width: 36,
    textAlign: 'center',
  },
  pickerItemMeta: {
    flex: 1,
  },
  pickerItemName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.accent,
  },
  pickerItemCount: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  gridKanji: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.accent,
    marginBottom: 2,
  },
  gridKana: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '600',
    marginBottom: SPACING.sm,
  },
  gridDivider: {
    height: 1,
    backgroundColor: '#2A2A2A',
    marginBottom: SPACING.sm,
  },
  gridEnglish: {
    fontSize: 13,
    color: COLORS.accent,
    fontWeight: '600',
    lineHeight: 18,
  },
  gridPos: {
    fontSize: 10,
    color: '#555',
    fontWeight: '700',
    letterSpacing: 0.5,
    marginTop: 4,
    textTransform: 'uppercase',
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
    width: '100%',
  },
  navBtn: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
  },
  navBtnDisabled: {
    opacity: 0.5,
  },
  navBtnText: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.accent,
    letterSpacing: 1,
  },
  navBtnTextDisabled: {
    color: COLORS.textSecondary,
  },
  prevBtn: {
    backgroundColor: COLORS.gray,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  nextBtn: {
    backgroundColor: COLORS.primary,
  },
  nextBtnText: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.background,
    letterSpacing: 1,
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
