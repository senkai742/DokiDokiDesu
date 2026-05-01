import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  withTiming, 
  interpolate, 
  SharedValue 
} from 'react-native-reanimated';
import { COLORS, SPACING } from '../../constants/theme';

interface FlipCardProps {
  isFlipped: SharedValue<number>;
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  onPress: () => void;
}

const { width } = Dimensions.get('window');

export const FlipCard: React.FC<FlipCardProps> = ({ isFlipped, frontContent, backContent, onPress }) => {
  const frontStyle = useAnimatedStyle(() => {
    const rotateValue = interpolate(isFlipped.value, [0, 1], [0, 180]);
    return {
      transform: [
        { perspective: 1000 },
        { rotateY: `${rotateValue}deg` }
      ],
    };
  });

  const backStyle = useAnimatedStyle(() => {
    const rotateValue = interpolate(isFlipped.value, [0, 1], [180, 360]);
    return {
      transform: [
        { perspective: 1000 },
        { rotateY: `${rotateValue}deg` }
      ],
    };
  });

  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress} style={styles.container}>
      <Animated.View style={[styles.card, styles.front, frontStyle]}>
        {frontContent}
      </Animated.View>
      <Animated.View style={[styles.card, styles.back, backStyle]}>
        {backContent}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.85,
    height: width * 0.85,
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 30,
    padding: SPACING.xl,
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    borderWidth: 2,
  },
  front: {
    backgroundColor: COLORS.gray,
    borderColor: COLORS.primary,
  },
  back: {
    backgroundColor: '#111',
    borderColor: COLORS.secondary,
  },
});
