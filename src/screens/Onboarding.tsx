import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';
import Animated, { 
  useAnimatedStyle, 
  withSpring, 
  withDelay, 
  FadeIn, 
  FadeOut,
  Layout
} from 'react-native-reanimated';
import { useStore } from '../store/useStore';
import { Sparkles, GraduationCap, Zap } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export const Onboarding: React.FC = () => {
  const [page, setPage] = useState(1);
  const { completeOnboarding } = useStore();

  const handleBeginner = () => completeOnboarding(false);
  const handleExperienced = () => completeOnboarding(true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {page === 1 ? (
          <View style={styles.page}>
            <Animated.View entering={FadeIn.duration(1000)}>
              <Zap size={80} color={COLORS.primary} fill={COLORS.primary} style={styles.icon} />
            </Animated.View>
            
            <Animated.Text 
              entering={FadeIn.delay(300).duration(800)}
              style={styles.title}
            >
              WELCOME TO{"\n"}
              <Text style={{ color: COLORS.secondary }}>DOKI DOKI DESU!</Text>
            </Animated.Text>
            
            <Animated.Text 
              entering={FadeIn.delay(500).duration(800)}
              style={styles.subtitle}
            >
              Master Japanese with high-energy lessons and premium vibes.
            </Animated.Text>

            <TouchableOpacity 
              style={styles.mainButton} 
              onPress={() => setPage(2)}
            >
              <Text style={styles.buttonText}>LET'S GO!</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.page}>
            <Animated.View entering={FadeIn.duration(1000)}>
              <GraduationCap size={80} color={COLORS.secondary} fill={COLORS.secondary} style={styles.icon} />
            </Animated.View>

            <Animated.Text 
              entering={FadeIn.delay(300).duration(800)}
              style={styles.title}
            >
              THE EXPERIENCE{"\n"}CHECK
            </Animated.Text>

            <Animated.Text 
              entering={FadeIn.delay(500).duration(800)}
              style={styles.subtitle}
            >
              Have you studied Japanese before?
            </Animated.Text>

            <View style={styles.options}>
              <TouchableOpacity style={styles.optionButton} onPress={handleBeginner}>
                <View style={styles.optionContent}>
                  <Text style={styles.optionTitle}>I'M A TOTAL BEGINNER</Text>
                  <Text style={styles.optionDesc}>Start from Lesson 1 (N5)</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.optionButton, { borderColor: COLORS.primary }]} onPress={handleExperienced}>
                <View style={styles.optionContent}>
                  <Text style={[styles.optionTitle, { color: COLORS.primary }]}>I KNOW SOME JAPANESE</Text>
                  <Text style={styles.optionDesc}>Keep all lessons unlocked</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: SPACING.xl,
    justifyContent: 'center',
  },
  page: {
    alignItems: 'center',
  },
  icon: {
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: 42,
    fontWeight: '900',
    color: COLORS.accent,
    textAlign: 'center',
    lineHeight: 45,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.lg,
    paddingHorizontal: SPACING.md,
    lineHeight: 24,
  },
  mainButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl * 2,
    borderRadius: 20,
    marginTop: SPACING.xl * 2,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.background,
    letterSpacing: 2,
  },
  options: {
    width: '100%',
    gap: SPACING.md,
    marginTop: SPACING.xl * 2,
  },
  optionButton: {
    width: '100%',
    padding: SPACING.lg,
    backgroundColor: COLORS.gray,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.secondary,
  },
  optionContent: {
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.secondary,
  },
  optionDesc: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
});
