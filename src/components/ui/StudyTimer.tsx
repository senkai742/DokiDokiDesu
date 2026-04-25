import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { COLORS, SPACING } from '../../constants/theme';
import { Play, Pause, RotateCcw, X, Clock } from 'lucide-react-native';
import Animated, { useAnimatedStyle, withTiming, useSharedValue } from 'react-native-reanimated';
import { useStore } from '../../store/useStore';

interface StudyTimerProps {
  isVisible: boolean;
  onClose: () => void;
  lessonId?: number;
}

export const StudyTimer: React.FC<StudyTimerProps> = ({ isVisible, onClose, lessonId }) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const { recordStudySession } = useStore();
  const scale = useSharedValue(1);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive]);

  const handleStartStop = () => {
    setIsActive(!isActive);
    scale.value = withTiming(0.95, { duration: 100 }, () => {
      scale.value = withTiming(1, { duration: 100 });
    });
  };

  const handleReset = () => {
    setIsActive(false);
    setSeconds(0);
  };

  const handleClose = () => {
    // Record study time when closing
    if (seconds > 0) {
      const minutes = Math.ceil(seconds / 60);
      recordStudySession(minutes, lessonId);
    }
    setIsActive(false);
    setSeconds(0);
    onClose();
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // Progress ring calculation
  const progress = (seconds % 1500) / 1500; // 25 minutes cycle
  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
            <X color={COLORS.accent} size={24} />
          </TouchableOpacity>

          {/* Title */}
          <View style={styles.header}>
            <Clock color={COLORS.primary} size={24} />
            <Text style={styles.title}>Study Timer</Text>
          </View>

          {/* Timer Circle */}
          <View style={styles.timerContainer}>
            <View style={styles.progressRing}>
              {/* Background Circle */}
              <View style={styles.ringBackground} />
              
              {/* Progress Arc */}
              <Animated.View style={[styles.progressArc, { 
                borderTopColor: progress > 0 ? COLORS.primary : COLORS.gray,
                borderRightColor: progress > 0.25 ? COLORS.primary : COLORS.gray,
                borderBottomColor: progress > 0.5 ? COLORS.primary : COLORS.gray,
                borderLeftColor: progress > 0.75 ? COLORS.primary : COLORS.gray,
              }]} />

              {/* Time Display */}
              <View style={styles.timeDisplay}>
                <Text style={styles.timeText}>{formatTime(seconds)}</Text>
                <Text style={styles.timeLabel}>
                  {seconds < 1500 ? 'Focus' : 'Break!'}
                </Text>
              </View>
            </View>
          </View>

          {/* Status */}
          <Text style={styles.statusText}>
            {isActive ? '🧠 Studying...' : seconds > 0 ? '⏸️ Paused' : 'Ready to start'}
          </Text>

          {/* Controls */}
          <View style={styles.controls}>
            <TouchableOpacity
              style={[styles.controlBtn, styles.resetBtn]}
              onPress={handleReset}
            >
              <RotateCcw color={COLORS.accent} size={24} />
            </TouchableOpacity>

            <Animated.View style={animatedStyle}>
              <TouchableOpacity
                style={[styles.controlBtn, styles.playBtn, isActive && styles.pauseBtn]}
                onPress={handleStartStop}
              >
                {isActive ? (
                  <Pause color={COLORS.background} size={32} fill={COLORS.background} />
                ) : (
                  <Play color={COLORS.background} size={32} fill={COLORS.background} />
                )}
              </TouchableOpacity>
            </Animated.View>

            <View style={[styles.controlBtn, styles.placeholder]} />
          </View>

          {/* Tip */}
          <Text style={styles.tip}>
            💡 Pomodoro: 25 min focus + 5 min break
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: COLORS.gray,
    borderRadius: 32,
    padding: SPACING.xl,
    width: '85%',
    alignItems: 'center',
  },
  closeBtn: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    padding: SPACING.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.accent,
  },
  timerContainer: {
    marginVertical: SPACING.xl,
  },
  progressRing: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ringBackground: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 100,
    borderWidth: 8,
    borderColor: COLORS.background,
  },
  progressArc: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 100,
    borderWidth: 8,
    borderTopColor: COLORS.primary,
    borderRightColor: COLORS.primary,
    borderBottomColor: COLORS.gray,
    borderLeftColor: COLORS.gray,
    transform: [{ rotate: '-45deg' }],
  },
  timeDisplay: {
    alignItems: 'center',
  },
  timeText: {
    fontSize: 48,
    fontWeight: '900',
    color: COLORS.accent,
    fontVariant: ['tabular-nums'],
  },
  timeLabel: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '700',
    marginTop: 4,
  },
  statusText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xl,
  },
  controlBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetBtn: {
    backgroundColor: COLORS.background,
  },
  playBtn: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
  },
  pauseBtn: {
    backgroundColor: '#FF6B6B',
  },
  placeholder: {
    backgroundColor: 'transparent',
  },
  tip: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: SPACING.xl,
  },
});
