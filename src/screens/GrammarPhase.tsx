import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Dimensions, Pressable, Modal } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { LESSON_1_GRAMMAR, LESSON_2_GRAMMAR, LESSON_3_GRAMMAR, LESSON_4_GRAMMAR, LESSON_5_GRAMMAR, LESSON_6_GRAMMAR, LESSON_7_GRAMMAR, LESSON_8_GRAMMAR, LESSON_9_GRAMMAR, LESSON_10_GRAMMAR, LESSON_11_GRAMMAR, LESSON_12_GRAMMAR, LESSON_13_GRAMMAR, LESSON_14_GRAMMAR, LESSON_15_GRAMMAR, LESSON_16_GRAMMAR, LESSON_17_GRAMMAR, LESSON_18_GRAMMAR, LESSON_19_GRAMMAR, LESSON_20_GRAMMAR, LESSON_21_GRAMMAR, LESSON_22_GRAMMAR, LESSON_23_GRAMMAR, LESSON_24_GRAMMAR, LESSON_25_GRAMMAR } from '../constants/grammar';
import Animated, { 
  FadeIn, 
  FadeOut, 
  SlideInRight, 
  SlideInLeft,
  Layout,
  useAnimatedStyle,
  withSpring,
  useSharedValue
} from 'react-native-reanimated';
import { ChevronLeft, Info, HelpCircle, ChevronRight, Zap } from 'lucide-react-native';
import { DokiButton } from '../components/ui/DokiButton';
import { useStore } from '../store/useStore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const { width } = Dimensions.get('window');

const SyntaxText = ({ tokens, onNotePress }: { tokens: any[], onNotePress: (note: string) => void }) => {
  return (
    <View style={styles.syntaxContainer}>
      {tokens.map((token, index) => {
        const color = 
          token.type === 'noun' ? '#3399FF' :
          token.type === 'particle' ? COLORS.secondary :
          token.type === 'predicate' ? COLORS.primary :
          COLORS.accent;

        return (
          <Pressable 
            key={index} 
            onPress={() => token.note && onNotePress(token.note)}
            style={styles.tokenWrapper}
          >
            <Text style={[styles.tokenText, { color }]}>{token.text}</Text>
            {token.note && (
              <View style={[styles.noteDot, { backgroundColor: color }]} />
            )}
          </Pressable>
        );
      })}
    </View>
  );
};

export const GrammarPhase: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'GrammarPhase'>>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { lessonId } = route.params;
  const { setCurrentPhase, setLessonCompleted, incrementGrammar } = useStore();

  const grammarData = useMemo(() => {
    switch (lessonId) {
      case 1: return LESSON_1_GRAMMAR;
      case 2: return LESSON_2_GRAMMAR;
      case 3: return LESSON_3_GRAMMAR;
      case 4: return LESSON_4_GRAMMAR;
      case 5: return LESSON_5_GRAMMAR;
      case 6: return LESSON_6_GRAMMAR;
      case 7: return LESSON_7_GRAMMAR;
      case 8: return LESSON_8_GRAMMAR;
      case 9: return LESSON_9_GRAMMAR;
      case 10: return LESSON_10_GRAMMAR;
      case 11: return LESSON_11_GRAMMAR;
      case 12: return LESSON_12_GRAMMAR;
      case 13: return LESSON_13_GRAMMAR;
      case 14: return LESSON_14_GRAMMAR;
      case 15: return LESSON_15_GRAMMAR;
      case 16: return LESSON_16_GRAMMAR;
      case 17: return LESSON_17_GRAMMAR;
      case 18: return LESSON_18_GRAMMAR;
      case 19: return LESSON_19_GRAMMAR;
      case 20: return LESSON_20_GRAMMAR;
      case 21: return LESSON_21_GRAMMAR;
      case 22: return LESSON_22_GRAMMAR;
      case 23: return LESSON_23_GRAMMAR;
      case 24: return LESSON_24_GRAMMAR;
      case 25: return LESSON_25_GRAMMAR;
      default: return [];
    }
  }, [lessonId]);

  const [step, setStep] = useState(0);
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [showCongrats, setShowCongrats] = useState(false);
  const isNegative = useSharedValue(false);
  const toggleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(isNegative.value ? 20 : 0) }]
  }));

  const currentRule = grammarData[step];

  if (!currentRule) return null;

  const example = currentRule.examples[0];

  const handleNext = () => {
    // Increment grammar count for the rule just studied
    incrementGrammar(1);
    if (step < grammarData.length - 1) {
      setStep(step + 1);
      isNegative.value = false;
    } else {
      // Lesson Complete - show congrats modal
      setShowCongrats(true);
      setLessonCompleted(lessonId);
    }
  };

  const handleCongratsClose = () => {
    setShowCongrats(false);
    if (lessonId < 25) {
      navigation.navigate('LessonMap', { level: 'N5', mode: 'grammar' });
    } else {
      navigation.navigate('MainTabs');
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
      isNegative.value = false;
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header with Stepper */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handlePrev} style={styles.backBtn}>
            <ChevronLeft color={COLORS.accent} size={28} />
          </TouchableOpacity>
          <View style={styles.stepper}>
            {grammarData.map((_, idx) => (
              <View 
                key={idx} 
                style={[
                  styles.stepDot, 
                  idx === step && styles.activeDot,
                  idx < step && styles.completedDot
                ]} 
              />
            ))}
          </View>
          <Text style={styles.stepInfo}>{step + 1} / {grammarData.length}</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Formula Section */}
          <Animated.View key={`formula-${step}`} entering={FadeIn.duration(600)} style={styles.formulaCard}>
            <Text style={styles.formulaLabel}>SENTENCE ANATOMY</Text>
            <View style={styles.formulaRow}>
              {currentRule.formula.split(' + ').map((part, i) => (
                <View key={i} style={styles.formulaPart}>
                  <Text style={styles.formulaText}>{part}</Text>
                </View>
              ))}
            </View>
          </Animated.View>

          {/* Core Rule Card */}
          <Animated.View key={`rule-${step}`} entering={SlideInRight.duration(500)} style={styles.ruleCard}>
            <View style={styles.ruleHeader}>
              <Zap size={24} color={COLORS.primary} fill={COLORS.primary} />
              <Text style={styles.ruleTitle}>Rule {step + 1}</Text>
            </View>
            <Text style={styles.explanation}>{currentRule.explanation}</Text>

            {/* Interactive Example */}
            <View style={styles.exampleContainer}>
              <View style={styles.exampleHeader}>
                <Text style={styles.exampleLabel}>EXAMPLE</Text>
                {currentRule.type === 'toggle' && (
                  <View style={styles.toggleWrapper}>
                    <Text style={[styles.toggleText, !isNegative.value && styles.activeToggleText]}>POS</Text>
                    <TouchableOpacity 
                      style={styles.toggle}
                      onPress={() => isNegative.value = !isNegative.value}
                    >
                      <Animated.View style={[styles.toggleKnob, toggleStyle]} />
                    </TouchableOpacity>
                    <Text style={[styles.toggleText, isNegative.value && styles.activeToggleText]}>NEG</Text>
                  </View>
                )}
              </View>

              <View style={styles.sentenceCard}>
                {currentRule.type === 'table' && currentRule.table ? (
                  <View style={styles.tableContainer}>
                    <View style={styles.tableHeaderRow}>
                      {currentRule.table.headers.map((header, hIdx) => (
                        <View key={hIdx} style={styles.tableHeaderCell}>
                          <Text style={styles.tableHeaderText}>{header}</Text>
                        </View>
                      ))}
                    </View>
                    {currentRule.table.rows.map((row, rIdx) => (
                      <View key={rIdx} style={styles.tableRow}>
                        {row.map((cell, cIdx) => (
                          <View key={cIdx} style={[styles.tableCell, cIdx === 0 && styles.tableFirstCell]}>
                            <Text style={[styles.tableCellText, cIdx === 0 && styles.tableFirstCellText]}>
                              {cell}
                            </Text>
                          </View>
                        ))}
                      </View>
                    ))}
                  </View>
                ) : (
                  <>
                    <SyntaxText 
                      tokens={isNegative.value && example.tokensSecondary ? example.tokensSecondary : example.tokens} 
                      onNotePress={setActiveNote}
                    />
                    <Animated.View entering={FadeIn.duration(300)}>
                      <Text style={styles.englishText}>
                        {isNegative.value ? example.englishSecondary : example.englishPrimary}
                      </Text>
                      <Text style={styles.romajiText}>
                        {isNegative.value ? example.romajiSecondary : example.romajiPrimary}
                      </Text>
                    </Animated.View>
                  </>
                )}
              </View>
            </View>
          </Animated.View>

          <View style={styles.buttonRow}>
            <DokiButton 
              title="PREV"
              onPress={handlePrev}
              style={{ ...styles.navBtn, ...styles.prevBtn, opacity: step === 0 ? 0.5 : 1 }}
            />
            <DokiButton 
              title={step === grammarData.length - 1 ? "FINISH" : "NEXT"}
              onPress={handleNext}
              style={styles.navBtn}
            />
          </View>
        </ScrollView>

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
              <Text style={styles.congratsSubtitle}>You've mastered {grammarData.length} grammar rules</Text>
              <Text style={styles.congratsUnlock}>Next lesson unlocked!</Text>
              <TouchableOpacity style={styles.congratsBtn} onPress={handleCongratsClose}>
                <Text style={styles.congratsBtnText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Note Drawer Overlay */}
        {activeNote && (
          <Pressable style={styles.overlay} onPress={() => setActiveNote(null)}>
            <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)} style={styles.overlayBg} />
            <Animated.View entering={SlideInRight.duration(300)} exiting={FadeOut.duration(200)} style={styles.noteDrawer}>
              <View style={styles.noteHeader}>
                <Info size={20} color={COLORS.primary} />
                <Text style={styles.noteTitle}>GRAMMAR NOTE</Text>
              </View>
              <Text style={styles.noteContent}>{activeNote}</Text>
              <TouchableOpacity style={styles.closeNote} onPress={() => setActiveNote(null)}>
                <Text style={styles.closeNoteText}>GOT IT</Text>
              </TouchableOpacity>
            </Animated.View>
          </Pressable>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  backBtn: {
    padding: 4,
  },
  stepper: {
    flexDirection: 'row',
    gap: 8,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.gray,
  },
  activeDot: {
    backgroundColor: COLORS.accent,
    width: 20,
  },
  completedDot: {
    backgroundColor: COLORS.primary,
  },
  stepInfo: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '900',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  formulaCard: {
    backgroundColor: '#111',
    padding: SPACING.lg,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#222',
    marginBottom: SPACING.lg,
  },
  formulaLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: COLORS.textSecondary,
    letterSpacing: 2,
    marginBottom: SPACING.md,
  },
  formulaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  formulaPart: {
    backgroundColor: COLORS.gray,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  formulaText: {
    color: COLORS.accent,
    fontWeight: '700',
    fontSize: 14,
  },
  ruleCard: {
    backgroundColor: COLORS.gray,
    borderRadius: 24,
    padding: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  ruleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: SPACING.md,
  },
  ruleTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.accent,
  },
  explanation: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 24,
    marginBottom: SPACING.xl,
  },
  exampleContainer: {
    marginTop: SPACING.md,
  },
  exampleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  exampleLabel: {
    fontSize: 12,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  toggleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  toggle: {
    width: 44,
    height: 24,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 2,
  },
  toggleKnob: {
    width: 20,
    height: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  toggleText: {
    fontSize: 10,
    fontWeight: '900',
    color: COLORS.textSecondary,
  },
  activeToggleText: {
    color: COLORS.accent,
  },
  sentenceCard: {
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
    borderRadius: 16,
    minHeight: 120,
  },
  syntaxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SPACING.md,
  },
  tokenWrapper: {
    paddingVertical: 2,
    marginRight: 2,
  },
  tokenText: {
    fontSize: 24,
    fontWeight: '900',
  },
  noteDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 2,
  },
  englishText: {
    fontSize: 18,
    color: COLORS.accent,
    fontWeight: '600',
  },
  romajiText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.md,
  },
  navBtn: {
    flex: 1,
  },
  prevBtn: {
    flex: 1,
    backgroundColor: COLORS.gray,
  },
  nextBtn: {
    flex: 1,
  },
  nextBtnCenter: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: SPACING.md,
  },
  overlayBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  noteDrawer: {
    backgroundColor: COLORS.gray,
    padding: SPACING.xl,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  noteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: SPACING.md,
  },
  noteTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  noteContent: {
    fontSize: 16,
    color: COLORS.accent,
    lineHeight: 24,
  },
  closeNote: {
    marginTop: SPACING.xl,
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeNoteText: {
    fontWeight: '900',
    color: COLORS.background,
  },
  tableContainer: {
    width: '100%',
    backgroundColor: '#111',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.gray,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  tableHeaderCell: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableHeaderText: {
    fontSize: 10,
    fontWeight: '900',
    color: COLORS.primary,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  tableCell: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#222',
  },
  tableFirstCell: {
    borderLeftWidth: 0,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  tableCellText: {
    fontSize: 12,
    color: COLORS.accent,
    fontWeight: '600',
    textAlign: 'center',
  },
  tableFirstCellText: {
    fontSize: 10,
    color: COLORS.textSecondary,
    fontWeight: '900',
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
