import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/level.map';
import CircleIcon from './CircleIcon';
import { getWordsByLevel } from '../../services/word/get-words-by-level.service';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
type FlashCardNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'FlashCard'
>;
const ICONS: Record<string, string> = {
  flashcard: '🃏', // Kart
  word_clash: '❓', // Çoktan seçmeli / quiz
  pronunciation: '🎤', // Mikrofon
  letter_complete: '🧩', // Harf tamamlama
  listening_writing: '🎧', // Dinleme & yazma
  sentence_complete: '✍️', // Cümle tamamlama
  speech_check: '🗣️', // Ses tanıma
  quick_quiz: '⏱', // Hızlı quiz
};

export default function LevelCard({ item }: { item: any }) {
  const progressWidth: any = `${item.progress}%`;
  const level: string = item.levelNumber ?? '?';
  const navigation = useNavigation<FlashCardNavigationProp>();

  return (
    <View style={[styles.levelCard, !item.unlocked && styles.lockedCard]}>
      {/* ✅ Üstte yeşil progress bar */}
      <View style={styles.progressBar}>
        <View
          style={[
            progressWidth < 50
              ? styles.progressFillRed
              : progressWidth < 70
              ? styles.progressFillYellow
              : styles.progressFill,
            { width: `${progressWidth}%` },
          ]}
        />
      </View>

      <View style={styles.row}>
        {/* Sol daire */}
        <View style={styles.circle}>
          <Text style={styles.circleText}>{level}</Text>
        </View>

        {/* Sağ içerik */}
        <View style={styles.info}>
          <Text style={styles.title}>{item.title}</Text>

          {!item.unlocked ? (
            <Text style={styles.lockText}>🔒 Locked</Text>
          ) : (
            <View style={styles.iconRow}>
              {item.modes.map((mode: any, i: number) => (
                <TouchableOpacity
                  key={mode.modeName}
                  disabled={!mode.unlocked && mode.modeName !== 'flashcard'}
                  onPress={async () => {
                    const words: any = await getWordsByLevel(item.levelId);
                    navigation.navigate('FlashCard', { words });
                  }}
                >
                  <CircleIcon
                    icon={ICONS[mode.modeName]}
                    progress={
                      mode.unlocked || mode.modeName === 'flashcard'
                        ? mode.score
                        : 0
                    }
                    unlocked={mode.unlocked || mode.modeName === 'flashcard'}
                  />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
