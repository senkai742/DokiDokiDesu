import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  TextInput, Modal, ScrollView, Alert, Keyboard, Platform, KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING } from '../constants/theme';
import { useStore } from '../store/useStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Heart, Plus, FolderOpen, ChevronRight, Trash2, Pencil, X, Check } from 'lucide-react-native';

const EMOJI_OPTIONS = [
  '📚', '⭐', '🔥', '💡', '🎯', '🌸', '🍣', '🎋', '🗾', '🏮',
  '🌊', '🎌', '💎', '🌙', '⚡', '🦋', '🍡', '🎭', '🎴', '🗻',
];

type Nav = NativeStackNavigationProp<RootStackParamList>;

export const CollectionsScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const {
    progress,
    createCollection,
    deleteCollection,
    renameCollection,
  } = useStore();

  const collections = progress.collections ?? [];
  const favoriteCount = (progress.favorites ?? []).length;

  // New collection form
  const [showNewForm, setShowNewForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmoji, setNewEmoji] = useState('📚');

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editEmoji, setEditEmoji] = useState('📚');

  const handleCreate = () => {
    if (!newName.trim()) return;
    createCollection(newName.trim(), newEmoji);
    setNewName('');
    setNewEmoji('📚');
    setShowNewForm(false);
  };

  const handleStartEdit = (id: string, name: string, emoji: string) => {
    setEditingId(id);
    setEditName(name);
    setEditEmoji(emoji);
  };

  const handleSaveEdit = () => {
    if (!editName.trim() || !editingId) return;
    renameCollection(editingId, editName.trim(), editEmoji);
    setEditingId(null);
  };

  const handleDelete = (id: string, name: string) => {
    Alert.alert(
      'Delete Collection',
      `Delete "${name}"? Words won't be lost — they'll still exist in lessons.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteCollection(id) },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Collections</Text>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => setShowNewForm(true)}
        >
          <Plus size={20} color={COLORS.background} />
          <Text style={styles.addBtnText}>New</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Favourites — built-in, always shown */}
        <TouchableOpacity
          style={styles.favouritesCard}
          onPress={() => navigation.navigate('CollectionDetail', { collectionId: '__favorites__' })}
          activeOpacity={0.8}
        >
          <View style={styles.collectionIconWrap}>
            <Heart size={28} color="#FF4D6D" fill="#FF4D6D" />
          </View>
          <View style={styles.collectionMeta}>
            <Text style={styles.collectionName}>Favourites</Text>
            <Text style={styles.collectionCount}>
              {favoriteCount} {favoriteCount === 1 ? 'word' : 'words'}
            </Text>
          </View>
          <ChevronRight size={20} color={COLORS.textSecondary} />
        </TouchableOpacity>

        {/* Custom collections */}
        {collections.length === 0 && (
          <View style={styles.emptyState}>
            <FolderOpen size={48} color="#333" />
            <Text style={styles.emptyTitle}>No collections yet</Text>
            <Text style={styles.emptySubtitle}>
              Tap <Text style={{ color: COLORS.primary }}>+ New</Text> to create one, then add words from vocab lessons.
            </Text>
          </View>
        )}

        {collections.map(col => (
          <View key={col.id}>
            {editingId === col.id ? (
              /* Edit inline */
              <View style={styles.editCard}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.emojiPicker}>
                  {EMOJI_OPTIONS.map(e => (
                    <TouchableOpacity
                      key={e}
                      onPress={() => setEditEmoji(e)}
                      style={[styles.emojiBtn, editEmoji === e && styles.emojiBtnActive]}
                    >
                      <Text style={styles.emojiText}>{e}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <View style={styles.editRow}>
                  <TextInput
                    style={styles.editInput}
                    value={editName}
                    onChangeText={setEditName}
                    placeholder="Collection name..."
                    placeholderTextColor={COLORS.textSecondary}
                    autoFocus
                  />
                  <TouchableOpacity onPress={handleSaveEdit} style={styles.editActionBtn}>
                    <Check size={20} color={COLORS.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setEditingId(null)} style={styles.editActionBtn}>
                    <X size={20} color={COLORS.textSecondary} />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.collectionCard}
                onPress={() => navigation.navigate('CollectionDetail', { collectionId: col.id })}
                activeOpacity={0.8}
              >
                <View style={styles.collectionIconWrap}>
                  <Text style={styles.emojiLarge}>{col.emoji}</Text>
                </View>
                <View style={styles.collectionMeta}>
                  <Text style={styles.collectionName}>{col.name}</Text>
                  <Text style={styles.collectionCount}>
                    {col.wordIds.length} {col.wordIds.length === 1 ? 'word' : 'words'}
                  </Text>
                </View>
                <View style={styles.cardActions}>
                  <TouchableOpacity
                    onPress={() => handleStartEdit(col.id, col.name, col.emoji)}
                    style={styles.iconBtn}
                  >
                    <Pencil size={16} color={COLORS.textSecondary} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDelete(col.id, col.name)}
                    style={styles.iconBtn}
                  >
                    <Trash2 size={16} color="#FF4D6D" />
                  </TouchableOpacity>
                  <ChevronRight size={20} color={COLORS.textSecondary} />
                </View>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>

      {/* New Collection Modal */}
      <Modal
        visible={showNewForm}
        transparent
        animationType="slide"
        onRequestClose={() => setShowNewForm(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowNewForm(false)}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoidingView}
          >
            <TouchableOpacity activeOpacity={1} style={styles.modalSheet}>
              <View style={styles.sheetHandle} />
              <Text style={styles.sheetTitle}>New Collection</Text>

              <Text style={styles.sheetLabel}>Pick an icon</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.emojiPickerModal}>
                {EMOJI_OPTIONS.map(e => (
                  <TouchableOpacity
                    key={e}
                    onPress={() => setNewEmoji(e)}
                    style={[styles.emojiBtn, newEmoji === e && styles.emojiBtnActive]}
                  >
                    <Text style={styles.emojiText}>{e}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <Text style={styles.sheetLabel}>Name</Text>
              <TextInput
                style={styles.sheetInput}
                value={newName}
                onChangeText={setNewName}
                placeholder="e.g. Daily verbs, Food words..."
                placeholderTextColor={COLORS.textSecondary}
                maxLength={40}
                autoFocus
              />

              <TouchableOpacity
                style={[styles.createBtn, !newName.trim() && styles.createBtnDisabled]}
                onPress={handleCreate}
                disabled={!newName.trim()}
              >
                <Text style={styles.createBtnText}>Create Collection</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </TouchableOpacity>
      </Modal>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.accent,
    letterSpacing: 0.5,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
  },
  addBtnText: {
    color: COLORS.background,
    fontWeight: '700',
    fontSize: 14,
  },
  scrollContent: {
    paddingBottom: 40,
    gap: 10,
  },
  favouritesCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A0A0D',
    borderRadius: 16,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: '#3D1520',
    gap: SPACING.md,
    marginBottom: 2,
  },
  collectionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray,
    borderRadius: 16,
    padding: SPACING.md,
    gap: SPACING.md,
  },
  collectionIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiLarge: {
    fontSize: 26,
  },
  collectionMeta: {
    flex: 1,
  },
  collectionName: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.accent,
  },
  collectionCount: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  iconBtn: {
    padding: 8,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
    gap: SPACING.md,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#444',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
    lineHeight: 22,
  },
  editCard: {
    backgroundColor: COLORS.gray,
    borderRadius: 16,
    padding: SPACING.md,
    gap: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  editRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  editInput: {
    flex: 1,
    backgroundColor: '#222',
    borderRadius: 10,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    color: COLORS.accent,
    fontSize: 15,
    fontWeight: '600',
  },
  editActionBtn: {
    padding: 8,
  },
  emojiPicker: {
    marginBottom: SPACING.sm,
  },
  emojiPickerModal: {
    marginBottom: SPACING.md,
  },
  emojiBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  emojiBtnActive: {
    backgroundColor: COLORS.primary + '40',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  emojiText: {
    fontSize: 22,
  },
  // Modal sheet
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#161616',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: SPACING.lg,
    paddingBottom: 40,
    gap: SPACING.md,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: SPACING.sm,
  },
  sheetTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.accent,
  },
  sheetLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textSecondary,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: -SPACING.sm,
  },
  sheetInput: {
    backgroundColor: '#222',
    borderRadius: 12,
    paddingHorizontal: SPACING.md,
    paddingVertical: 14,
    color: COLORS.accent,
    fontSize: 16,
    fontWeight: '600',
  },
  createBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  createBtnDisabled: {
    opacity: 0.4,
  },
  createBtnText: {
    color: COLORS.background,
    fontWeight: '900',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
