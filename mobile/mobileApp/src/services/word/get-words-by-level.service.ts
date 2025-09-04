import { getDBConnection } from '../../database/db';

export const getWordsByLevel = async (levelId: string) => {
  const db = await getDBConnection();

  const results = await db.executeSql(
    'SELECT words FROM levels WHERE levelId = ?',
    [levelId],
  );

  if (results[0].rows.length > 0) {
    const row = results[0].rows.item(0);
    const words = JSON.parse(row.words ?? '[]');
    return words; // [{ wordId, english, turkish, ... }, ...]
  }

  return [];
};
