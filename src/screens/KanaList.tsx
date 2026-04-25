import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Dimensions, Modal, Pressable } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';
import { ChevronLeft, X } from 'lucide-react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { HIRAGANA_DATA, KATAKANA_DATA } from '../constants/kana';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 5;
const CARD_SIZE = (width - SPACING.md * 2 - SPACING.sm * (COLUMN_COUNT - 1)) / COLUMN_COUNT;

export const KanaList: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'KanaList'>>();
  const { type } = route.params;
  const [selectedChar, setSelectedChar] = useState<{ char: string; romaji: string } | null>(null);

  const data = type === 'hiragana' ? HIRAGANA_DATA : KATAKANA_DATA;
  const accentColor = type === 'hiragana' ? COLORS.primary : COLORS.secondary;

  const renderItem = ({ item }: { item: { char: string; romaji: string } }) => {
    if (!item.char) return <View style={[styles.card, { opacity: 0 }]} />;

    return (
      <TouchableOpacity 
        style={[styles.card, { borderColor: accentColor + '33' }]}
        onPress={() => setSelectedChar(item)}
      >
        <Text style={[styles.charText, { color: accentColor }]}>{item.char}</Text>
        <Text style={styles.romajiText}>{item.romaji}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ChevronLeft color={COLORS.accent} size={28} />
          </TouchableOpacity>
          <Text style={styles.title}>{type.toUpperCase()}</Text>
        </View>

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={COLUMN_COUNT}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.columnWrapper}
        />

        {selectedChar && (
          <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
            <Pressable 
              style={[StyleSheet.absoluteFill, styles.overlay]} 
              onPress={() => setSelectedChar(null)}
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
                style={[styles.modalCard, { borderColor: accentColor }]}
              >
                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={() => setSelectedChar(null)}
                >
                  <X color={COLORS.textSecondary} size={24} />
                </TouchableOpacity>

                <Text style={[styles.modalChar, { color: accentColor }]}>
                  {selectedChar.char}
                </Text>
                <Text style={styles.modalRomaji}>
                  {selectedChar.romaji}
                </Text>
                
                <View style={[styles.decoration, { backgroundColor: accentColor }]} />
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
    height: CARD_SIZE * 1.2,
    backgroundColor: COLORS.gray,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  charText: {
    fontSize: 28,
    fontWeight: '900',
  },
  romajiText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.85)',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  modalCard: {
    width: width * 0.7,
    aspectRatio: 1,
    backgroundColor: COLORS.gray,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    shadowColor: COLORS.background,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 20,
  },
  closeButton: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
  },
  modalChar: {
    fontSize: 100,
    fontWeight: '900',
  },
  modalRomaji: {
    fontSize: 24,
    color: COLORS.accent,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginTop: SPACING.sm,
    letterSpacing: 4,
  },
  decoration: {
    position: 'absolute',
    bottom: 0,
    height: 10,
    width: '40%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    opacity: 0.5,
  },
});
