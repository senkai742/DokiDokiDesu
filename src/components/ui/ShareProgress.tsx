import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Share, Alert } from 'react-native';
import { COLORS, SPACING } from '../../constants/theme';
import { X, Share2, Download } from 'lucide-react-native';
import { useStore } from '../../store/useStore';
import { Flame, Trophy, Brain, BookOpen } from 'lucide-react-native';

interface ShareProgressProps {
  isVisible: boolean;
  onClose: () => void;
}

export const ShareProgress: React.FC<ShareProgressProps> = ({ isVisible, onClose }) => {
  const { progress } = useStore();

  const handleShare = async () => {
    try {
      const totalLessons = (progress.completedVocabLessons?.length ?? 0) + (progress.completedGrammarLessons?.length ?? 0);
      const message = `🔥 ${progress.streakDays} Day Streak on DokiDoki Desu!\n\n` +
        `📚 ${totalLessons} Lessons Completed\n` +
        `🧠 ${progress.kanjiMastered} Kanji Mastered\n` +
        `📖 ${progress.vocabLearned} Words Learned\n\n` +
        `Join me in learning Japanese! 🇯🇵`;

      await Share.share({
        message,
        title: 'My Japanese Learning Progress',
      });
    } catch (error) {
      Alert.alert('Error', 'Could not share progress');
    }
  };

  const handleSaveImage = async () => {
    // Simplified - in production would use react-native-view-shot
    Alert.alert('Coming Soon', 'Save to gallery feature coming in next update!');
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Share Progress</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X color={COLORS.accent} size={24} />
            </TouchableOpacity>
          </View>

          {/* Share Card */}
          <View style={styles.cardContainer}>
            <View style={styles.shareCard}>
              {/* Card Header */}
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>DOKI DOKI DESU</Text>
                <Text style={styles.cardSubtitle}>Japanese Learning Journey</Text>
              </View>

              {/* Main Stat */}
              <View style={styles.mainStat}>
                <Flame size={48} color="#FF6B6B" />
                <Text style={styles.streakNumber}>{progress.streakDays}</Text>
                <Text style={styles.streakLabel}>Day Streak 🔥</Text>
              </View>

              {/* Stats Grid */}
              <View style={styles.statsGrid}>
                <View style={styles.statBox}>
                  <Trophy size={24} color="#FFD700" />
                  <Text style={styles.statNumber}>{(progress.completedVocabLessons?.length ?? 0) + (progress.completedGrammarLessons?.length ?? 0)}</Text>
                  <Text style={styles.statLabelSmall}>Lessons</Text>
                </View>
                <View style={styles.statBox}>
                  <Brain size={24} color="#4ECDC4" />
                  <Text style={styles.statNumber}>{progress.kanjiMastered}</Text>
                  <Text style={styles.statLabelSmall}>Kanji</Text>
                </View>
                <View style={styles.statBox}>
                  <BookOpen size={24} color="#45B7D1" />
                  <Text style={styles.statNumber}>{progress.vocabLearned}</Text>
                  <Text style={styles.statLabelSmall}>Words</Text>
                </View>
              </View>

              {/* Footer */}
              <View style={styles.cardFooter}>
                <Text style={styles.cardTag}>#Japanese #N5 #LanguageLearning</Text>
              </View>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionBtn} onPress={handleShare}>
              <View style={[styles.actionIcon, { backgroundColor: COLORS.primary }]}>
                <Share2 color={COLORS.background} size={24} />
              </View>
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionBtn} onPress={handleSaveImage}>
              <View style={[styles.actionIcon, { backgroundColor: '#4ECDC4' }]}>
                <Download color={COLORS.background} size={24} />
              </View>
              <Text style={styles.actionText}>Save</Text>
            </TouchableOpacity>
          </View>

          {/* Motivation Text */}
          <Text style={styles.motivation}>
            "Every day you study is a step closer to fluency! 🎌"
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: COLORS.gray,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: SPACING.xl,
    paddingBottom: SPACING.xl * 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.accent,
  },
  closeBtn: {
    padding: SPACING.sm,
  },
  cardContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  shareCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 24,
    padding: SPACING.xl,
    width: 300,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.accent,
    letterSpacing: 2,
  },
  cardSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  mainStat: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  streakNumber: {
    fontSize: 64,
    fontWeight: '900',
    color: '#FF6B6B',
    marginTop: SPACING.sm,
  },
  streakLabel: {
    fontSize: 16,
    color: COLORS.accent,
    fontWeight: '700',
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SPACING.lg,
    paddingVertical: SPACING.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.accent,
    marginTop: SPACING.sm,
  },
  statLabelSmall: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  cardFooter: {
    alignItems: 'center',
  },
  cardTag: {
    fontSize: 10,
    color: COLORS.primary,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  actionBtn: {
    alignItems: 'center',
    gap: SPACING.sm,
  },
  actionIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    color: COLORS.accent,
    fontWeight: '700',
    fontSize: 14,
  },
  motivation: {
    textAlign: 'center',
    color: COLORS.textSecondary,
    fontSize: 14,
    fontStyle: 'italic',
  },
});
