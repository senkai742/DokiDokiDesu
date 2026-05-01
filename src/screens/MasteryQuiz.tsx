import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { lesson1 } from '../data/lessons/lesson1';
import Animated, { FadeIn, SlideInUp, ZoomIn } from 'react-native-reanimated';
import { Check, X, Trophy } from 'lucide-react-native';
import { useStore } from '../store/useStore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DokiButton } from '../components/ui/DokiButton';

export const MasteryQuiz: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'MasteryQuiz'>>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { lessonId, mode } = route.params;
  const { setLessonCompleted, markVocabLearned, markGrammarLearned } = useStore();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const questions = mode === 'vocab' ? lesson1.vocab.map(v => ({
    id: v.id,
    question: `What does "${v.kanji}" mean?`,
    options: [v.english, 'Wrong 1', 'Wrong 2', 'Wrong 3'], // Simplified - should be randomized
    correctAnswer: v.english,
    type: 'multiple-choice' as const,
  })) : mode === 'grammar' ? lesson1.grammar.flatMap(g => 
    g.examples.map((ex, i) => ({
      id: `${g.id}_ex${i}`,
      question: `Translate: ${ex.english}`,
      options: [ex.japanese, 'Wrong 1', 'Wrong 2', 'Wrong 3'],
      correctAnswer: ex.japanese,
      type: 'multiple-choice' as const,
    }))
  ) : lesson1.quiz;
  const currentQuestion = questions[currentIndex];

  const handleOptionPress = (option: string) => {
    if (selectedOption) return;

    setSelectedOption(option);
    const correct = option === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    if (correct) setScore(score + 1);

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        // Mark individual items as learned as user progresses
        if (mode === 'vocab' && lesson1.vocab[currentIndex]) {
          markVocabLearned(lesson1.vocab[currentIndex].id);
        } else if (mode === 'grammar' && lesson1.grammar[0]?.examples[currentIndex]) {
          markGrammarLearned(`${lesson1.grammar[0].id}_ex${currentIndex}`);
        }
        setCurrentIndex(currentIndex + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        setIsFinished(true);
        // Mark final item
        if (mode === 'vocab' && lesson1.vocab[currentIndex]) {
          markVocabLearned(lesson1.vocab[currentIndex].id);
        } else if (mode === 'grammar') {
          const gIndex = Math.floor(currentIndex / 2);
          const exIndex = currentIndex % 2;
          if (lesson1.grammar[gIndex]?.examples[exIndex]) {
            markGrammarLearned(`${lesson1.grammar[gIndex].id}_ex${exIndex}`);
          }
        }
        if (score + (correct ? 1 : 0) === questions.length) {
          setLessonCompleted(lessonId);
        }
      }
    }, 1500);
  };

  if (isFinished) {
    const passed = score === questions.length;
    return (
      <SafeAreaView style={styles.container}>
        <Animated.View entering={ZoomIn} style={styles.resultContainer}>
          <View style={[styles.trophyBox, { borderColor: passed ? COLORS.primary : COLORS.secondary }]}>
            <Trophy color={passed ? COLORS.primary : COLORS.secondary} size={80} />
          </View>
          <Text style={styles.resultTitle}>{passed ? 'MASTERY ACHIEVED!' : 'KEEP PRACTICING'}</Text>
          <Text style={styles.resultText}>You got {score} out of {questions.length} correct.</Text>
          
          <DokiButton 
            title={passed ? 'BACK TO MAP' : 'RETRY LESSON'}
            onPress={() => navigation.navigate('LessonMap', { level: 'N5', mode })}
            color={passed ? COLORS.primary : COLORS.secondary}
            style={styles.finishButton}
          />
        </Animated.View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.phaseLabel}>MASTERY QUIZ</Text>
        <Text style={styles.progressText}>{currentIndex + 1} / {questions.length}</Text>
      </View>

      <View style={styles.quizContent}>
        <Animated.View key={currentIndex} entering={SlideInUp} style={styles.questionBox}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
        </Animated.View>

        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedOption === option;
            const isThisCorrect = option === currentQuestion.correctAnswer;
            
            let backgroundColor = COLORS.gray;
            let borderColor = 'transparent';

            if (isSelected) {
              backgroundColor = isCorrect ? '#004D40' : '#4D0000';
              borderColor = isCorrect ? COLORS.primary : COLORS.secondary;
            } else if (selectedOption && isThisCorrect) {
              backgroundColor = '#004D40';
              borderColor = COLORS.primary;
            }

            return (
              <TouchableOpacity
                key={index}
                disabled={!!selectedOption}
                onPress={() => handleOptionPress(option)}
                style={[styles.optionButton, { backgroundColor, borderColor, borderWidth: borderColor !== 'transparent' ? 2 : 0 }]}
              >
                <Text style={[styles.optionText, selectedOption && !isSelected && !isThisCorrect && { opacity: 0.5 }]}>
                  {option}
                </Text>
                {isSelected && (
                  <View style={styles.iconContainer}>
                    {isCorrect ? <Check color={COLORS.primary} size={24} /> : <X color={COLORS.secondary} size={24} />}
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
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
    color: COLORS.secondary,
    letterSpacing: 2,
  },
  progressText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '700',
  },
  quizContent: {
    flex: 1,
    padding: SPACING.lg,
  },
  questionBox: {
    marginTop: SPACING.xl,
    marginBottom: SPACING.xl * 2,
    padding: SPACING.lg,
    backgroundColor: COLORS.gray,
    borderRadius: 20,
    borderBottomWidth: 4,
    borderBottomColor: COLORS.secondary,
  },
  questionText: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.accent,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: SPACING.md,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.lg,
    borderRadius: 16,
  },
  optionText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.accent,
  },
  iconContainer: {
    marginLeft: SPACING.sm,
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  trophyBox: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xl,
    backgroundColor: COLORS.gray,
  },
  resultTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.accent,
    textAlign: 'center',
  },
  resultText: {
    fontSize: 18,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
    marginBottom: SPACING.xl,
  },
  finishButton: {
    width: '100%',
    padding: SPACING.lg,
    borderRadius: 16,
    alignItems: 'center',
  },
  finishButtonText: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.background,
    letterSpacing: 1,
  },
});
