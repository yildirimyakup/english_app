import { getDBConnection } from '../database/db';
import { getLastSync, saveLastSync } from '../utils/storage';
import { Alert } from 'react-native';

export const syncWords = async (
  db: any,
  words: any[],
  setProgress: Function,
  doneRef: { current: number },
  total: number,
  setLastWord: Function,
) => {
  for (const w of words) {
    try {
      await db.executeSql(
        `INSERT OR REPLACE INTO words 
          (wordId, english, turkish, example, audio, pos, tags, synonyms, antonyms, phonetic, xpValue, frequency, addedBy, updatedAt)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          w._id,
          w.english?.trim() || 'UNKNOWN',
          w.turkish ?? '???',
          w.example ?? null,
          w.audio ?? null,
          w.pos ?? null,
          JSON.stringify(w.tags ?? []),
          JSON.stringify(w.synonyms ?? []),
          JSON.stringify(w.antonyms ?? []),
          w.phonetic ?? null,
          w.xpValue ?? 0,
          w.frequency ?? 'low',
          w.addedBy ?? null,
          w.updatedAt ?? new Date().toISOString(),
        ],
      );
      setLastWord(w.english || 'UNKNOWN');
      doneRef.current++;
      setProgress(doneRef.current / total);
    } catch (err) {
      console.error('❌ Kelime eklenirken hata:', err);
    }
  }
};

export const syncLevels = async (
  db: any,
  levels: any[],
  setProgress: Function,
  doneRef: { current: number },
  total: number,
) => {
  for (const l of levels) {
    try {
      await db.executeSql(
        `INSERT OR REPLACE INTO levels 
          (levelId, levelNumber, title, description, words, updatedAt)
        VALUES (?,?,?,?,?,?)`,
        [
          l._id,
          l.levelNumber,
          l.title,
          l.description ?? null,
          JSON.stringify(l.words ?? []),
          l.updatedAt ?? new Date().toISOString(),
        ],
      );
      doneRef.current++;
      setProgress(doneRef.current / total);
    } catch (err) {
      console.error('❌ Seviye eklenirken hata:', err);
    }
  }
};

export const syncAll = async ({
  getWords,
  getLevels,
  setProgress,
  setLastWord,
}: any) => {
  try {
    const lastSync = await getLastSync();
    console.log('⏳ lastSync:', lastSync);

    const wordsRes = await getWords(lastSync).unwrap();
    const levelsRes = await getLevels(lastSync).unwrap();

    const words = wordsRes.words ?? [];
    const levels = levelsRes.levels ?? [];
    const total = words.length + levels.length;
    const doneRef = { current: 0 };

    const db = await getDBConnection();

    await syncWords(db, words, setProgress, doneRef, total, setLastWord);
    await syncLevels(db, levels, setProgress, doneRef, total);

    await saveLastSync();
    console.log('✅ Sync tamamlandı');
    return true;
  } catch (error) {
    console.error('❌ Sync işlemi başarısız:', error);
    Alert.alert('Hata', 'Veriler senkronize edilirken bir sorun oluştu.');
    return false;
  }
};
