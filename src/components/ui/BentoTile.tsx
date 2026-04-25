import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ViewStyle } from 'react-native';
import { COLORS, SPACING } from '../../constants/theme';
import Animated, { useAnimatedStyle, withSpring, useSharedValue } from 'react-native-reanimated';
import { Lock } from 'lucide-react-native';

interface BentoTileProps {
  title: string;
  subtitle?: string;
  isLocked?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  color?: string;
}

export const BentoTile: React.FC<BentoTileProps> = ({
  title,
  subtitle,
  isLocked,
  onPress,
  style,
  color = COLORS.primary,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={isLocked ? undefined : onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.container, style, isLocked && styles.lockedContainer]}
    >
      <Animated.View style={[styles.inner, animatedStyle]}>
        <View style={styles.content}>
          <Text style={[styles.title, { color: isLocked ? COLORS.locked : color }]}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        {isLocked && (
          <View style={styles.lockOverlay}>
            <Lock size={24} color={COLORS.locked} />
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: COLORS.gray,
    aspectRatio: 1,
  },
  lockedContainer: {
    opacity: 0.6,
  },
  inner: {
    flex: 1,
    padding: SPACING.md,
    justifyContent: 'flex-end',
  },
  content: {
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  lockOverlay: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
  },
});
