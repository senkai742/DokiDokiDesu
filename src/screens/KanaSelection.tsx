import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';
import { ChevronLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

export const KanaSelection: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ChevronLeft color={COLORS.accent} size={28} />
          </TouchableOpacity>
          <Text style={styles.title}>KANA SELECT</Text>
        </View>

        <View style={styles.options}>
          <TouchableOpacity 
            style={styles.optionCard}
            onPress={() => navigation.navigate('KanaList', { type: 'hiragana' })}
          >
            <Text style={styles.kanaLarge}>あ</Text>
            <View>
              <Text style={styles.optionTitle}>HIRAGANA</Text>
              <Text style={styles.optionSubtitle}>The foundation</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.optionCard}
            onPress={() => navigation.navigate('KanaList', { type: 'katakana' })}
          >
            <Text style={[styles.kanaLarge, { color: COLORS.secondary }]}>ア</Text>
            <View>
              <Text style={styles.optionTitle}>KATAKANA</Text>
              <Text style={styles.optionSubtitle}>Foreign loanwords</Text>
            </View>
          </TouchableOpacity>
        </View>
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
    marginBottom: SPACING.xl,
    marginTop: SPACING.lg,
  },
  backButton: {
    marginRight: SPACING.md,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.accent,
    letterSpacing: 1,
  },
  options: {
    gap: SPACING.md,
  },
  optionCard: {
    backgroundColor: COLORS.gray,
    padding: SPACING.xl,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.lg,
    borderWidth: 1,
    borderColor: '#333',
  },
  kanaLarge: {
    fontSize: 64,
    fontWeight: '900',
    color: COLORS.primary,
  },
  optionTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.accent,
  },
  optionSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
});
