import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, PanResponder } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, RotateCcw, Check, ChevronRight } from 'lucide-react-native';
import { DokiButton } from '../components/ui/DokiButton';
import Svg, { Path } from 'react-native-svg';
import { KANJI_DATA } from '../constants/kanji';

const { width } = Dimensions.get('window');
const CANVAS_SIZE = width - SPACING.xl * 2;

export const WritingPracticeScreen: React.FC = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paths, setPaths] = useState<string[]>([]);
  const [currentPath, setCurrentPath] = useState('');
  const [showGuide, setShowGuide] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  const currentKanji = KANJI_DATA[currentIndex];

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        setCurrentPath(`M${locationX},${locationY}`);
      },
      onPanResponderMove: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        setCurrentPath(prev => `${prev} L${locationX},${locationY}`);
      },
      onPanResponderRelease: () => {
        if (currentPath) {
          setPaths(prev => [...prev, currentPath]);
          setCurrentPath('');
        }
      },
    })
  ).current;

  const handleClear = () => {
    setPaths([]);
    setCurrentPath('');
    setIsComplete(false);
  };

  const handleNext = () => {
    if (currentIndex < KANJI_DATA.length - 1) {
      setCurrentIndex(currentIndex + 1);
      handleClear();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      handleClear();
    }
  };

  const handleComplete = () => {
    setIsComplete(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft color={COLORS.accent} size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Writing Practice</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Progress */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          {currentIndex + 1} / {KANJI_DATA.length}
        </Text>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${((currentIndex + 1) / KANJI_DATA.length) * 100}%` }
            ]} 
          />
        </View>
      </View>

      {/* Kanji Info */}
      <View style={styles.kanjiInfo}>
        <Text style={styles.kanjiMeaning}>{currentKanji.meaning}</Text>
        <Text style={styles.kanjiReading}>{currentKanji.reading}</Text>
      </View>

      {/* Writing Canvas */}
      <View style={styles.canvasContainer}>
        {/* Background Grid */}
        <View style={styles.grid}>
          <View style={styles.gridLineHorizontal} />
          <View style={styles.gridLineVertical} />
          <View style={[styles.gridLineDiagonal, { transform: [{ rotate: '45deg' }] }]} />
          <View style={[styles.gridLineDiagonal, { transform: [{ rotate: '-45deg' }] }]} />
        </View>

        {/* Guide Character (faint) */}
        {showGuide && (
          <Text style={styles.guideCharacter}>{currentKanji.kanji}</Text>
        )}

        {/* User Drawing */}
        <View style={styles.drawingArea} {...panResponder.panHandlers}>
          <Svg width={CANVAS_SIZE} height={CANVAS_SIZE}>
            {paths.map((path, index) => (
              <Path
                key={index}
                d={path}
                stroke={isComplete ? '#00ff66' : COLORS.primary}
                strokeWidth={8}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            ))}
            {currentPath && (
              <Path
                d={currentPath}
                stroke={isComplete ? '#00ff66' : COLORS.primary}
                strokeWidth={8}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            )}
          </Svg>
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[styles.toggleBtn, showGuide && styles.toggleBtnActive]}
            onPress={() => setShowGuide(!showGuide)}
          >
            <Text style={[styles.toggleText, showGuide && styles.toggleTextActive]}>
              Show Guide
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.iconBtn} onPress={handleClear}>
            <RotateCcw color={COLORS.accent} size={24} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.iconBtn, isComplete && styles.iconBtnComplete]}
            onPress={handleComplete}
          >
            <Check color={isComplete ? COLORS.background : '#00ff66'} size={24} />
          </TouchableOpacity>
        </View>

        {/* Navigation */}
        <View style={styles.navRow}>
          <DokiButton
            title="PREV"
            onPress={handlePrev}
            style={styles.navBtn}
            color="#333"
            icon={<ChevronLeft color={COLORS.accent} size={20} />}
            iconPosition="left"
          />
          <DokiButton
            title="NEXT"
            onPress={handleNext}
            style={styles.navBtn}
            icon={<ChevronRight color={COLORS.background} size={20} />}
          />
        </View>
      </View>

      {/* Instructions */}
      <Text style={styles.instructions}>
        Trace over the guide character to practice writing
      </Text>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.accent,
  },
  progressContainer: {
    padding: SPACING.md,
  },
  progressText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: SPACING.sm,
  },
  progressBar: {
    height: 4,
    backgroundColor: COLORS.gray,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  kanjiInfo: {
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  kanjiMeaning: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.accent,
  },
  kanjiReading: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  canvasContainer: {
    width: CANVAS_SIZE,
    height: CANVAS_SIZE,
    alignSelf: 'center',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: COLORS.gray,
  },
  grid: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridLineHorizontal: {
    position: 'absolute',
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  gridLineVertical: {
    position: 'absolute',
    height: '100%',
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  gridLineDiagonal: {
    position: 'absolute',
    width: 1,
    height: '140%',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  guideCharacter: {
    ...StyleSheet.absoluteFillObject,
    fontSize: CANVAS_SIZE * 0.7,
    fontWeight: '900',
    color: 'rgba(255,255,255,0.1)',
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: CANVAS_SIZE,
  },
  drawingArea: {
    ...StyleSheet.absoluteFillObject,
  },
  controls: {
    padding: SPACING.lg,
    gap: SPACING.md,
  },
  toggleRow: {
    alignItems: 'center',
  },
  toggleBtn: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
    backgroundColor: COLORS.gray,
  },
  toggleBtnActive: {
    backgroundColor: COLORS.primary,
  },
  toggleText: {
    color: COLORS.accent,
    fontWeight: '600',
    fontSize: 14,
  },
  toggleTextActive: {
    color: COLORS.background,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.xl,
  },
  iconBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBtnComplete: {
    backgroundColor: '#00ff66',
  },
  navRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.md,
  },
  navBtn: {
    flex: 1,
  },
  instructions: {
    textAlign: 'center',
    color: COLORS.textSecondary,
    fontSize: 14,
    paddingHorizontal: SPACING.xl,
    marginTop: 'auto',
    marginBottom: SPACING.md,
  },
});
