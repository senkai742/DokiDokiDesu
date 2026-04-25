import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Animated, { useAnimatedStyle, withRepeat, withTiming, withSpring, useSharedValue } from 'react-native-reanimated';
import { COLORS, SPACING } from '../../constants/theme';
import { ChevronRight } from 'lucide-react-native';

interface DokiButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  color?: string;
  icon?: React.ReactNode;
}

export const DokiButton: React.FC<DokiButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  color = COLORS.primary,
  icon = <ChevronRight color={COLORS.background} size={24} />,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // Pulse effect shared value
  const pulseScale = useSharedValue(1);

  React.useEffect(() => {
    pulseScale.value = withRepeat(
      withTiming(1.05, { duration: 1000 }),
      -1,
      true
    );
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
    opacity: interpolatePulse(pulseScale.value),
  }));

  function interpolatePulse(val: number) {
    'worklet';
    return 1.1 - val; // Fades out as it grows
  }

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.container, { backgroundColor: color }, style]}
    >
      <Animated.View style={[styles.pulseOverlay, { borderColor: color }, pulseStyle]} />
      <Animated.View style={[styles.content, animatedStyle]}>
        <Text style={[styles.text, textStyle]}>{title}</Text>
        {icon}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  pulseOverlay: {
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderRadius: 20,
    borderWidth: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  text: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.background,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
