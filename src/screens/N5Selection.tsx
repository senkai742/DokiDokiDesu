import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';
import { BentoTile } from '../components/ui/BentoTile';
import { ChevronLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

export const N5Selection: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ChevronLeft color={COLORS.accent} size={28} />
          </TouchableOpacity>
          <Text style={styles.title}>N5 CATEGORIES</Text>
        </View>

        <View style={styles.grid}>
          <View style={styles.row}>
            <BentoTile
              title="KANA"
              subtitle="Hiragana & Katakana"
              color={COLORS.primary}
              style={styles.tile}
              onPress={() => navigation.navigate('KanaSelection')}
            />
            <BentoTile
              title="VOCAB"
              subtitle="25 Lessons"
              color={COLORS.secondary}
              style={styles.tile}
              onPress={() => navigation.navigate('LessonMap', { level: 'N5', mode: 'vocab' })}
            />
          </View>
          <View style={styles.row}>
            <BentoTile
              title="GRAMMAR"
              subtitle="Patterns & Rules"
              color="#FFD700"
              style={styles.tile}
              onPress={() => navigation.navigate('LessonMap', { level: 'N5', mode: 'grammar' })}
            />
            <BentoTile
              title="KANJI"
              subtitle="N5 Characters"
              color="#FF00FF"
              style={styles.tile}
              onPress={() => navigation.navigate('KanjiList')}
            />
          </View>
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
  grid: {
    gap: SPACING.md,
  },
  row: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  tile: {
    flex: 1,
  },
});
