import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Dimensions, Pressable } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';
import { ChevronLeft, X } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { KANJI_DATA } from '../constants/kanji';
import Animated, { FadeIn, FadeOut, ZoomIn, ZoomOut } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 3;
const CARD_SIZE = (width - SPACING.md * 2 - SPACING.sm * (COLUMN_COUNT - 1)) / COLUMN_COUNT;

export const KanjiList: React.FC = () => {
  const navigation = useNavigation();
  const [selectedKanji, setSelectedKanji] = useState<typeof KANJI_DATA[0] | null>(null);

  const renderItem = ({ item }: { item: typeof KANJI_DATA[0] }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => setSelectedKanji(item)}
    >
      <Text style={styles.kanjiText}>{item.kanji}</Text>
      <Text style={styles.meaningText} numberOfLines={1}>{item.meaning}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ChevronLeft color={COLORS.accent} size={28} />
          </TouchableOpacity>
          <Text style={styles.title}>KANJI LIST</Text>
        </View>

        <FlatList
          data={KANJI_DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.kanji}
          numColumns={COLUMN_COUNT}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.columnWrapper}
        />

        {selectedKanji && (
          <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
            <Pressable 
              style={[StyleSheet.absoluteFill, styles.overlay]} 
              onPress={() => setSelectedKanji(null)}
            >
              <Animated.View 
                entering={FadeIn.duration(200)}
                exiting={FadeOut.duration(200)}
                style={StyleSheet.absoluteFill}
              />
            </Pressable>
            
            <View style={styles.modalContainer}>
              <Animated.View 
                entering={FadeIn.duration(400)}
                exiting={FadeOut.duration(200)}
                style={styles.modalCard}
              >
                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={() => setSelectedKanji(null)}
                >
                  <X color={COLORS.textSecondary} size={24} />
                </TouchableOpacity>

                <Text style={styles.modalKanji}>{selectedKanji.kanji}</Text>
                <Text style={styles.modalMeaning}>{selectedKanji.meaning}</Text>
                <Text style={styles.modalReading}>{selectedKanji.reading}</Text>
                
                <View style={styles.decoration} />
              </Animated.View>
            </View>
          </View>
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
    marginBottom: SPACING.lg,
    marginTop: SPACING.lg,
  },
  backButton: {
    marginRight: SPACING.md,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.accent,
    letterSpacing: 2,
  },
  listContent: {
    paddingBottom: 40,
  },
  columnWrapper: {
    justifyContent: 'flex-start',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE * 1.3,
    backgroundColor: COLORS.gray,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  kanjiText: {
    fontSize: 40,
    fontWeight: '900',
    color: '#FF00FF', // Neon Pink/Purple for Kanji vibe
  },
  meaningText: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 8,
    fontWeight: '600',
    textTransform: 'uppercase',
    textAlign: 'center',
    paddingHorizontal: 4,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  modalCard: {
    width: width * 0.8,
    backgroundColor: COLORS.gray,
    borderRadius: 30,
    padding: SPACING.xl,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF00FF',
  },
  closeButton: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
  },
  modalKanji: {
    fontSize: 120,
    fontWeight: '900',
    color: '#FF00FF',
  },
  modalMeaning: {
    fontSize: 28,
    color: COLORS.accent,
    fontWeight: '900',
    marginTop: SPACING.md,
    textAlign: 'center',
  },
  modalReading: {
    fontSize: 18,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
    fontWeight: '600',
    letterSpacing: 2,
  },
  decoration: {
    marginTop: SPACING.xl,
    height: 4,
    width: 60,
    backgroundColor: '#FF00FF',
    borderRadius: 2,
    opacity: 0.5,
  },
});
