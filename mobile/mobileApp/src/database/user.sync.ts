// database/userSync.ts
import { getDBConnection } from './db';

export const resetUserData = async () => {
  const db = await getDBConnection();
  await db.executeSql('DELETE FROM user_words');
  await db.executeSql('DELETE FROM user_levels');
};

export const insertUserWords = async (userId: string, words: any[]) => {
  const db = await getDBConnection();
  for (const w of words) {
    await db.executeSql(
      `INSERT INTO user_words (userId, wordId, strength, lastReviewed) VALUES (?,?,?,?)`,
      [userId, w.wordId, w.strength ?? 0, w.lastReviewed ?? null],
    );
  }
};

export const insertUserLevels = async (userId: string, levels: any[]) => {
  const db = await getDBConnection();

  for (const l of levels) {
    const levelId = String(l.levelId?._id ?? l.levelId);

    // Önce user_levels tablosuna ekle
    await db.executeSql(
      `INSERT INTO user_levels (userId, levelId, completedWords, progress, unlocked)
       VALUES (?,?,?,?,?)`,
      [
        userId,
        levelId,
        JSON.stringify(l.completedWords ?? []),
        l.progress ?? 0,
        l.unlocked ? 1 : 0,
      ],
    );

    // Sonra her mode için user_level_modes tablosuna ekle
    if (Array.isArray(l.modes)) {
      for (const mode of l.modes) {
        await db.executeSql(
          `INSERT INTO user_level_modes (userId, levelId, modeName, unlocked, score, lastPlayed)
           VALUES (?,?,?,?,?,?)`,
          [
            userId,
            levelId,
            mode.modeName,
            mode.unlocked ? 1 : 0,
            mode.score ?? 0,
            mode.lastPlayed ?? null,
          ],
        );
      }
    }
  }
};
