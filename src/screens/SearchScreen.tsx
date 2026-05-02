import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING } from '../constants/theme';
import { Search, X, ChevronLeft, Filter, Heart, Brain, Volume2 } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useSharedValue } from 'react-native-reanimated';
import { VocabWord } from '../types/lesson';
import { tts } from '../utils/tts';
import { LESSON_1_VOCAB, LESSON_2_VOCAB, LESSON_3_VOCAB } from '../constants/vocab';
import { useStore } from '../store/useStore';
import { FlipCard } from '../components/ui/FlipCard';

const { width } = Dimensions.get('window');

const ALL_VOCAB = [...LESSON_1_VOCAB, ...LESSON_2_VOCAB, ...LESSON_3_VOCAB];

type FilterType = 'all' | 'favorites' | 'difficult';

export const SearchScreen: React.FC = () => {
  const navigation = useNavigation();
  const { progress, addFavorite, removeFavorite, addDifficultWord, removeDifficultWord } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [selectedWord, setSelectedWord] = useState<VocabWord | null>(null);

  const filteredWords = useMemo(() => {
    let words = ALL_VOCAB;

    // Apply filter
    if (activeFilter === 'favorites') {
      words = words.filter(w => progress.favorites?.includes(w.id) ?? false);
    } else if (activeFilter === 'difficult') {
      words = words.filter(w => progress.difficultWords?.includes(w.id) ?? false);
    }

    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      words = words.filter(word =>
        word.english.toLowerCase().includes(query) ||
        word.kana.includes(query) ||
        word.kanji.includes(query) ||
        word.romaji.toLowerCase().includes(query)
      );
    }

    return words;
  }, [searchQuery, activeFilter, progress.favorites, progress.difficultWords]);

  const isFlipped = useSharedValue(0);

  const handleWordPress = (word: VocabWord) => {
    setSelectedWord(word);
    isFlipped.value = 0;
  };

  const handleCloseModal = () => {
    setSelectedWord(null);
    isFlipped.value = 0;
  };

  const handleFlip = () => {
    isFlipped.value = isFlipped.value === 0 ? 1 : 0;
    // Auto-read when revealing Japanese side
    if (isFlipped.value === 0 && selectedWord) {
      tts.speak(selectedWord.kana, 'ja-JP');
    }
  };

  const handleSpeak = () => {
    if (selectedWord) {
      tts.speak(selectedWord.kana, 'ja-JP');
    }
  };

  const toggleFavorite = (wordId: string, e: any) => {
    e.stopPropagation();
    if (progress.favorites?.includes(wordId) ?? false) {
      removeFavorite(wordId);
    } else {
      addFavorite(wordId);
    }
  };

  const toggleDifficult = (wordId: string, e: any) => {
    e.stopPropagation();
    if (progress.difficultWords?.includes(wordId) ?? false) {
      removeDifficultWord(wordId);
    } else {
      addDifficultWord(wordId);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft color={COLORS.accent} size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dictionary</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search color={COLORS.textSecondary} size={20} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search words, kanji, meanings..."
          placeholderTextColor={COLORS.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <X color={COLORS.textSecondary} size={20} />
          </TouchableOpacity>
        )}
      </View>

      {/* Filters */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[styles.filterBtn, activeFilter === 'all' && styles.filterBtnActive]}
          onPress={() => setActiveFilter('all')}
        >
          <Text style={[styles.filterText, activeFilter === 'all' && styles.filterTextActive]}>
            All Words
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterBtn, activeFilter === 'favorites' && styles.filterBtnActive]}
          onPress={() => setActiveFilter('favorites')}
        >
          <Heart size={16} color={activeFilter === 'favorites' ? COLORS.background : COLORS.accent} />
          <Text style={[styles.filterText, activeFilter === 'favorites' && styles.filterTextActive]}>
            Favorites
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterBtn, activeFilter === 'difficult' && styles.filterBtnActive]}
          onPress={() => setActiveFilter('difficult')}
        >
          <Brain size={16} color={activeFilter === 'difficult' ? COLORS.background : COLORS.accent} />
          <Text style={[styles.filterText, activeFilter === 'difficult' && styles.filterTextActive]}>
            Difficult
          </Text>
        </TouchableOpacity>
      </View>

      {/* Results Count */}
      <Text style={styles.resultsCount}>
        {filteredWords.length} word{filteredWords.length !== 1 ? 's' : ''} found
      </Text>

      {/* Word List */}
      <ScrollView style={styles.wordList} showsVerticalScrollIndicator={false}>
        {filteredWords.map((word, index) => (
          <TouchableOpacity
            key={`${word.id}-${index}`}
            style={styles.wordCard}
            onPress={() => handleWordPress(word)}
            activeOpacity={0.8}
          >
            <View style={styles.wordLeft}>
              <Text style={styles.wordKanji}>{word.kanji}</Text>
              <View style={styles.wordInfo}>
                <Text style={styles.wordKana}>{word.kana}</Text>
                <Text style={styles.wordEnglish}>{word.english}</Text>
              </View>
            </View>
            <View style={styles.wordActions}>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={(e) => toggleFavorite(word.id, e)}
              >
                <Heart
                  size={20}
                  color={progress.favorites?.includes(word.id) ? '#FF6B6B' : COLORS.textSecondary}
                  fill={progress.favorites?.includes(word.id) ? '#FF6B6B' : 'transparent'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={(e) => toggleDifficult(word.id, e)}
              >
                <Brain
                  size={20}
                  color={progress.difficultWords?.includes(word.id) ? COLORS.primary : COLORS.textSecondary}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Word Detail Modal */}
      {selectedWord && (
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.modalBg} onPress={handleCloseModal} />
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Word Details</Text>
              <TouchableOpacity onPress={handleCloseModal}>
                <X color={COLORS.accent} size={24} />
              </TouchableOpacity>
            </View>

            <FlipCard
              isFlipped={isFlipped}
              frontContent={
                <View style={styles.detailCard}>
                  <Text style={styles.detailKanji}>{selectedWord.kanji}</Text>
                  <Text style={styles.detailKana}>{selectedWord.kana}</Text>
                  <TouchableOpacity style={styles.speakBtn} onPress={handleSpeak}>
                    <Volume2 color={COLORS.primary} size={32} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.flipBtn}
                    onPress={handleFlip}
                  >
                    <Text style={styles.flipText}>Tap to see meaning</Text>
                  </TouchableOpacity>
                </View>
              }
              backContent={
                <View style={styles.detailCard}>
                  <Text style={styles.detailLabel}>MEANING</Text>
                  <Text style={styles.detailEnglish}>{selectedWord.english}</Text>
                  <Text style={styles.detailRomaji}>{selectedWord.romaji}</Text>
                  <View style={styles.detailBadge}>
                    <Text style={styles.detailBadgeText}>{selectedWord.partOfSpeech}</Text>
                  </View>
                  <TouchableOpacity style={styles.speakBtnBack} onPress={handleSpeak}>
                    <Volume2 color={COLORS.primary} size={24} />
                    <Text style={styles.speakBtnText}>Play pronunciation</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.flipBtn}
                    onPress={handleFlip}
                  >
                    <Text style={styles.flipText}>Tap to see word</Text>
                  </TouchableOpacity>
                </View>
              }
              onPress={handleFlip}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalActionBtn, progress.favorites?.includes(selectedWord.id) && styles.modalActionActive]}
                onPress={() => toggleFavorite(selectedWord.id, {})}
              >
                <Heart
                  size={24}
                  color={progress.favorites?.includes(selectedWord.id) ? '#FF6B6B' : COLORS.accent}
                  fill={progress.favorites?.includes(selectedWord.id) ? '#FF6B6B' : 'transparent'}
                />
                <Text style={styles.modalActionText}>
                  {progress.favorites?.includes(selectedWord.id) ? 'Favorited' : 'Add to Favorites'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalActionBtn, progress.difficultWords?.includes(selectedWord.id) && styles.modalActionActive]}
                onPress={() => toggleDifficult(selectedWord.id, {})}
              >
                <Brain
                  size={24}
                  color={progress.difficultWords?.includes(selectedWord.id) ? COLORS.primary : COLORS.accent}
                />
                <Text style={styles.modalActionText}>
                  {progress.difficultWords?.includes(selectedWord.id) ? 'Marked Difficult' : 'Mark as Difficult'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray,
    margin: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderRadius: 16,
    gap: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    height: 48,
    color: COLORS.accent,
    fontSize: 16,
  },
  filterRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    backgroundColor: COLORS.gray,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
  },
  filterBtnActive: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    color: COLORS.accent,
    fontWeight: '600',
    fontSize: 14,
  },
  filterTextActive: {
    color: COLORS.background,
  },
  resultsCount: {
    color: COLORS.textSecondary,
    fontSize: 14,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
  },
  wordList: {
    flex: 1,
    paddingHorizontal: SPACING.md,
  },
  wordCard: {
    backgroundColor: COLORS.gray,
    borderRadius: 16,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wordLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  wordKanji: {
    fontSize: 36,
    fontWeight: '900',
    color: COLORS.accent,
    width: 50,
  },
  wordInfo: {
    flex: 1,
  },
  wordKana: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  wordEnglish: {
    fontSize: 16,
    color: COLORS.accent,
    fontWeight: '600',
  },
  wordActions: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  actionBtn: {
    padding: SPACING.sm,
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalBg: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    backgroundColor: COLORS.gray,
    borderRadius: 24,
    padding: SPACING.lg,
    width: width * 0.85,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.accent,
  },
  detailCard: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: SPACING.xl,
    alignItems: 'center',
    minHeight: 200,
    justifyContent: 'center',
  },
  detailKanji: {
    fontSize: 64,
    fontWeight: '900',
    color: COLORS.accent,
    marginBottom: SPACING.sm,
  },
  detailKana: {
    fontSize: 18,
    color: COLORS.textSecondary,
  },
  flipBtn: {
    marginTop: SPACING.lg,
    padding: SPACING.sm,
  },
  flipText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 14,
  },
  detailLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: SPACING.md,
  },
  detailEnglish: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.accent,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  detailRomaji: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
  },
  detailBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
  },
  detailBadgeText: {
    color: COLORS.background,
    fontWeight: '700',
    fontSize: 12,
  },
  modalActions: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.lg,
  },
  modalActionBtn: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: SPACING.md,
    alignItems: 'center',
    gap: SPACING.sm,
  },
  modalActionActive: {
    backgroundColor: COLORS.primary + '30',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  modalActionText: {
    color: COLORS.accent,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  speakBtn: {
    padding: SPACING.md,
    marginVertical: SPACING.md,
  },
  speakBtnBack: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    padding: SPACING.md,
    marginVertical: SPACING.md,
  },
  speakBtnText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
});
