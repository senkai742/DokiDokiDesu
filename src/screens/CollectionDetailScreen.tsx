import React, { useMemo, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, FlatList,
  Alert, Modal, ScrollView, TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING } from '../constants/theme';
import { useStore } from '../store/useStore';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { ChevronLeft, Heart, Volume2, Trash2, FolderOpen, Plus } from 'lucide-react-native';
import { resolveWords } from '../utils/vocabLookup';
import { tts } from '../utils/tts';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Route = RouteProp<RootStackParamList, 'CollectionDetail'>;

export const CollectionDetailScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { collectionId } = route.params;

  const {
    progress,
    removeFavorite,
    removeWordFromCollection,
    deleteCollection,
    addWordToCollection,
  } = useStore();

  const isFavorites = collectionId === '__favorites__';

  const collection = isFavorites
    ? null
    : (progress.collections ?? []).find(c => c.id === collectionId);

  // word IDs to show
  const wordIds = isFavorites ? (progress.favorites ?? []) : (collection?.wordIds ?? []);

  const words = useMemo(() => resolveWords(wordIds), [wordIds]);

  const [showAddModal, setShowAddModal] = useState(false);

  const handleRemove = (globalId: string) => {
    if (isFavorites) {
      Alert.alert('Remove from Favourites', 'Remove this word?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => removeFavorite(globalId) },
      ]);
    } else if (collection) {
      Alert.alert('Remove Word', 'Remove this word from the collection?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => removeWordFromCollection(collection.id, globalId) },
      ]);
    }
  };

  const handleDeleteCollection = () => {
    if (!collection) return;
    Alert.alert(
      'Delete Collection',
      `Delete "${collection.name}"? Words won't be lost — they'll still exist in lessons.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete', style: 'destructive', onPress: () => {
            deleteCollection(collection.id);
            navigation.goBack();
          }
        },
      ]
    );
  };

  const title = isFavorites ? 'Favourites' : (collection?.name ?? 'Collection');
  const emoji = isFavorites ? null : collection?.emoji;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={28} color={COLORS.accent} />
        </TouchableOpacity>
        <View style={styles.headerMid}>
          {isFavorites ? (
            <Heart size={22} color="#FF4D6D" fill="#FF4D6D" />
          ) : (
            <Text style={styles.headerEmoji}>{emoji}</Text>
          )}
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
        {!isFavorites && (
          <TouchableOpacity onPress={handleDeleteCollection} style={styles.deleteBtn}>
            <Trash2 size={20} color="#FF4D6D" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.subHeader}>
        <Text style={styles.wordCount}>{words.length} {words.length === 1 ? 'word' : 'words'}</Text>
      </View>

      {words.length === 0 ? (
        <View style={styles.empty}>
          <FolderOpen size={64} color="#333" />
          <Text style={styles.emptyTitle}>No words yet</Text>
          <Text style={styles.emptySubtitle}>
            {isFavorites
              ? 'Tap ♥ on any vocab card to add words here.'
              : 'Go to a vocab lesson grid view and tap ♥ on a card, then choose this collection.'}
          </Text>
        </View>
      ) : (
        <FlatList
          key="detail-grid"
          data={words}
          keyExtractor={item => item.globalId}
          numColumns={2}
          contentContainerStyle={styles.gridContent}
          columnWrapperStyle={styles.gridRow}
          renderItem={({ item, index }) => (
            <View style={styles.gridCard}>
              <View style={styles.gridCardTop}>
                <Text style={styles.gridIndex}>{index + 1}</Text>
                <View style={styles.gridCardActions}>
                  <TouchableOpacity
                    onPress={() => tts.speak(item.kana, 'ja-JP')}
                    style={styles.gridActionBtn}
                  >
                    <Volume2 size={14} color={COLORS.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleRemove(item.globalId)}
                    style={styles.gridActionBtn}
                  >
                    <Trash2 size={14} color="#FF4D6D" />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.gridKanji} numberOfLines={1} adjustsFontSizeToFit>
                {item.kanji}
              </Text>
              <Text style={styles.gridKana} numberOfLines={1}>{item.kana}</Text>
              <View style={styles.gridDivider} />
              <Text style={styles.gridEnglish} numberOfLines={2}>{item.english}</Text>
              <Text style={styles.gridPos}>{item.partOfSpeech}</Text>
              <Text style={styles.gridLesson}>Lesson {item.lessonId}</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    gap: SPACING.sm,
  },
  backBtn: {
    padding: 4,
  },
  headerMid: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  headerEmoji: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.accent,
  },
  deleteBtn: {
    padding: 8,
  },
  subHeader: {
    marginBottom: SPACING.md,
  },
  wordCount: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textSecondary,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.md,
    paddingHorizontal: SPACING.xl,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#444',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
    lineHeight: 22,
  },
  gridContent: {
    paddingBottom: 40,
  },
  gridRow: {
    gap: 10,
    marginBottom: 10,
  },
  gridCard: {
    flex: 1,
    backgroundColor: COLORS.gray,
    borderRadius: 14,
    padding: SPACING.md,
    minHeight: 140,
    justifyContent: 'space-between',
  },
  gridCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  gridIndex: {
    fontSize: 11,
    fontWeight: '700',
    color: '#444',
    letterSpacing: 1,
  },
  gridCardActions: {
    flexDirection: 'row',
    gap: 4,
  },
  gridActionBtn: {
    padding: 4,
  },
  gridKanji: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.accent,
    marginBottom: 2,
  },
  gridKana: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '600',
    marginBottom: SPACING.sm,
  },
  gridDivider: {
    height: 1,
    backgroundColor: '#2A2A2A',
    marginBottom: SPACING.sm,
  },
  gridEnglish: {
    fontSize: 13,
    color: COLORS.accent,
    fontWeight: '600',
    lineHeight: 18,
  },
  gridPos: {
    fontSize: 10,
    color: '#555',
    fontWeight: '700',
    letterSpacing: 0.5,
    marginTop: 4,
    textTransform: 'uppercase',
  },
  gridLesson: {
    fontSize: 10,
    color: '#3A3A3A',
    fontWeight: '600',
    marginTop: 2,
  },
});
