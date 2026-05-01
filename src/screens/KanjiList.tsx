import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, Pressable } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';
import { useStore } from '../store/useStore';
import { ChevronLeft, X, ChevronRight, ChevronLeft as ChevronLeftIcon, RotateCcw, BookOpen, Check } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { KANJI_DATA } from '../constants/kanji';
import Animated, { FadeIn, FadeOut, ZoomIn, ZoomOut, useAnimatedStyle, withSpring, interpolate, useSharedValue } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 3;
const CARD_SIZE = (width - SPACING.md * 2 - SPACING.sm * (COLUMN_COUNT - 1)) / COLUMN_COUNT;

export const KanjiList: React.FC = () => {
  const navigation = useNavigation();
  const { progress, markKanjiLearned } = useStore();
  const [selectedKanji, setSelectedKanji] = useState<typeof KANJI_DATA[0] | null>(null);
  const [studyMode, setStudyMode] = useState(false);
  const [studyIndex, setStudyIndex] = useState(0);

  const rotate = useSharedValue(0);
  const isFlipped = useSharedValue(false);

  const currentStudyKanji = KANJI_DATA[studyIndex];
  const isKanjiLearned = (kanjiChar: string) => progress.learnedKanjiIds?.includes(kanjiChar) ?? false;

  const renderItem = ({ item }: { item: typeof KANJI_DATA[0] }) => {
    const learned = isKanjiLearned(item.kanji);
    return (
      <TouchableOpacity 
        style={[styles.card, learned && styles.learnedCard]}
        onPress={() => setSelectedKanji(item)}
      >
        <Text style={styles.kanjiText}>{item.kanji}</Text>
        <Text style={styles.meaningText} numberOfLines={1}>{item.meaning}</Text>
        {learned && <View style={styles.learnedIndicator}><Check size={12} color={COLORS.background} /></View>}
      </TouchableOpacity>
    );
  };

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
  };

  const handleStudyNext = () => {
    // Mark current kanji as learned
    markKanjiLearned(currentStudyKanji.kanji);
    
    if (studyIndex < KANJI_DATA.length - 1) {
      setStudyIndex(studyIndex + 1);
      rotate.value = 0;
      isFlipped.value = false;
    }
  };

  const handleStudyPrev = () => {
    if (studyIndex > 0) {
      setStudyIndex(studyIndex - 1);
      rotate.value = 0;
      isFlipped.value = false;
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => {
            if (studyMode) {
              setStudyMode(false);
              rotate.value = 0;
              isFlipped.value = false;
            } else {
              navigation.goBack();
            }
          }} style={styles.backButton}>
            <ChevronLeft color={COLORS.accent} size={28} />
          </TouchableOpacity>
          <Text style={styles.title}>{studyMode ? 'STUDY MODE' : 'KANJI LIST'}</Text>
          <View style={{ width: 28 }} />
        </View>

        {!studyMode && (
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{progress.kanjiMastered}</Text>
              <Text style={styles.statLabel}>Learned</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{KANJI_DATA.length}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
          </View>
        )}

        {!studyMode && (
          <TouchableOpacity 
            style={styles.studyButton}
            onPress={() => setStudyMode(true)}
          >
            <BookOpen color={COLORS.background} size={24} />
            <Text style={styles.studyButtonText}>START STUDY MODE</Text>
          </TouchableOpacity>
        )}

        {studyMode ? (
          <View style={styles.studyContainer}>
            <View style={styles.studyContent}>
              <View style={styles.studyProgress}>
                <Text style={styles.studyProgressText}>{studyIndex + 1} / {KANJI_DATA.length}</Text>
                <Text style={styles.studyLearnedText}>
                  {isKanjiLearned(currentStudyKanji.kanji) ? '✓ Already Learned' : 'New Kanji'}
                </Text>
              </View>

              <View style={styles.cardContainer}>
                <TouchableOpacity activeOpacity={1} onPress={flip} style={styles.flipWrapper}>
                  {/* Front Side */}
                  <Animated.View style={[styles.studyCard, styles.cardFront, frontStyle]}>
                    <Text style={styles.studyKanjiChar}>{currentStudyKanji.kanji}</Text>
                    <View style={styles.tapToFlip}>
                      <RotateCcw color={COLORS.primary} size={20} />
                      <Text style={styles.tapText}>TAP TO FLIP</Text>
                    </View>
                  </Animated.View>

                  {/* Back Side */}
                  <Animated.View style={[styles.studyCard, styles.cardBack, backStyle]}>
                    <Text style={styles.studyInfoLabel}>READING</Text>
                    <Text style={styles.studyInfoValue}>{currentStudyKanji.reading}</Text>
                    <View style={styles.divider} />
                    <Text style={styles.studyInfoLabel}>MEANING</Text>
                    <Text style={styles.studyMeaning}>{currentStudyKanji.meaning}</Text>
                  </Animated.View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.studyFooter}>
              <View style={styles.buttonRow}>
                <TouchableOpacity 
                  style={[styles.navBtn, styles.prevBtn, studyIndex === 0 && styles.navBtnDisabled]}
                  onPress={handleStudyPrev}
                  disabled={studyIndex === 0}
                >
                  <ChevronLeftIcon color={studyIndex === 0 ? COLORS.textSecondary : COLORS.accent} size={24} />
                  <Text style={[styles.navBtnText, studyIndex === 0 && styles.navBtnTextDisabled]}>PREV</Text>
                  <View style={{ width: 24 }} />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.navBtn, styles.markLearnedBtn]}
                  onPress={handleStudyNext}
                >
                  <View style={{ width: 24 }} />
                  <Text style={styles.markLearnedText}>
                    {studyIndex === KANJI_DATA.length - 1 ? 'FINISH' : 'MARK LEARNED'}
                  </Text>
                  <ChevronRight color={COLORS.background} size={24} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <FlatList
            data={KANJI_DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.kanji}
            numColumns={COLUMN_COUNT}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={styles.columnWrapper}
          />
        )}

        {selectedKanji && !studyMode && (
          <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
            <Pressable 
              style={[StyleSheet.absoluteFill, styles.overlay]} 
              onPress={() => setSelectedKanji(null)}
            >
              <Animated.View 
                entering={FadeIn.duration(200)}
                exiting={FadeOut.duration(200)}
                style={StyleSheet.absoluteFill}
              />
            </Pressable>
            
            <View style={styles.modalContainer}>
              <Animated.View 
                entering={FadeIn.duration(400)}
                exiting={FadeOut.duration(200)}
                style={styles.modalCard}
              >
                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={() => setSelectedKanji(null)}
                >
                  <X color={COLORS.textSecondary} size={24} />
                </TouchableOpacity>

                <Text style={styles.modalKanji}>{selectedKanji.kanji}</Text>
                <Text style={styles.modalMeaning}>{selectedKanji.meaning}</Text>
                <Text style={styles.modalReading}>{selectedKanji.reading}</Text>
                
                {!isKanjiLearned(selectedKanji.kanji) && (
                  <TouchableOpacity 
                    style={styles.markLearnedButton}
                    onPress={() => {
                      markKanjiLearned(selectedKanji.kanji);
                      setSelectedKanji(null);
                    }}
                  >
                    <Check color={COLORS.background} size={20} />
                    <Text style={styles.markLearnedButtonText}>Mark as Learned</Text>
                  </TouchableOpacity>
                )}

                {isKanjiLearned(selectedKanji.kanji) && (
                  <View style={styles.alreadyLearnedBadge}>
                    <Check color={COLORS.primary} size={20} />
                    <Text style={styles.alreadyLearnedText}>Already Learned</Text>
                  </View>
                )}

                <View style={styles.decoration} />
              </Animated.View>
            </View>
          </View>
        )}
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 40,
    paddingHorizontal: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
    marginTop: SPACING.lg,
  },
  backButton: {
    padding: SPACING.sm,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.accent,
    letterSpacing: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.xl,
    marginBottom: SPACING.lg,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '600',
    marginTop: 4,
  },
  studyButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
    borderRadius: 16,
    marginBottom: SPACING.lg,
    gap: SPACING.sm,
  },
  studyButtonText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: '900',
  },
  listContent: {
    paddingBottom: 40,
  },
  columnWrapper: {
    justifyContent: 'flex-start',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE * 1.3,
    backgroundColor: COLORS.gray,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  learnedCard: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  learnedIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  kanjiText: {
    fontSize: 40,
    fontWeight: '900',
    color: '#FF00FF',
  },
  meaningText: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 8,
    fontWeight: '600',
    textTransform: 'uppercase',
    textAlign: 'center',
    paddingHorizontal: 4,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  modalCard: {
    width: width * 0.8,
    backgroundColor: COLORS.gray,
    borderRadius: 30,
    padding: SPACING.xl,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF00FF',
  },
  closeButton: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
  },
  modalKanji: {
    fontSize: 120,
    fontWeight: '900',
    color: '#FF00FF',
  },
  modalMeaning: {
    fontSize: 28,
    color: COLORS.accent,
    fontWeight: '900',
    marginTop: SPACING.md,
    textAlign: 'center',
  },
  modalReading: {
    fontSize: 18,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
    fontWeight: '600',
    letterSpacing: 2,
  },
  markLearnedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: 12,
    marginTop: SPACING.lg,
    gap: SPACING.sm,
  },
  markLearnedButtonText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: '900',
  },
  alreadyLearnedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray,
    borderWidth: 2,
    borderColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: 12,
    marginTop: SPACING.lg,
    gap: SPACING.sm,
  },
  alreadyLearnedText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '900',
  },
  decoration: {
    marginTop: SPACING.xl,
    height: 4,
    width: 60,
    backgroundColor: '#FF00FF',
    borderRadius: 2,
    opacity: 0.5,
  },
  // Study Mode Styles
  studyContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  studyContent: {
    flex: 1,
    justifyContent: 'center',
  },
  studyProgress: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  studyProgressText: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.textSecondary,
  },
  studyLearnedText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '700',
    marginTop: 4,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  flipWrapper: {
    width: width - SPACING.xl * 2,
    height: width * 1.0,
  },
  studyCard: {
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
    borderColor: '#FF00FF',
  },
  cardFront: {
    backgroundColor: COLORS.gray,
  },
  cardBack: {
    backgroundColor: COLORS.gray,
  },
  studyKanjiChar: {
    fontSize: 120,
    fontWeight: '900',
    color: '#FF00FF',
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
  studyInfoLabel: {
    fontSize: 12,
    fontWeight: '900',
    color: COLORS.secondary,
    letterSpacing: 2,
    marginBottom: SPACING.sm,
  },
  studyInfoValue: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.accent,
    marginBottom: SPACING.lg,
  },
  studyMeaning: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.primary,
  },
  divider: {
    width: '60%',
    height: 2,
    backgroundColor: '#FF00FF',
    marginVertical: SPACING.lg,
    opacity: 0.5,
  },
  studyFooter: {
    padding: SPACING.md,
    paddingBottom: SPACING.lg,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: '#222',
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
  markLearnedBtn: {
    backgroundColor: COLORS.primary,
  },
  markLearnedText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
  },
});
