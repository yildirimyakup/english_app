import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDBConnection } from '../database/db';
import { deleteDatabase } from 'react-native-sqlite-storage';

export const clear = () => {
  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('✅ AsyncStorage temizlendi');
    } catch (e) {
      console.error('❌ AsyncStorage temizlenemedi:', e);
    }
  };

  const clearSQLiteData = async () => {
    try {
      await deleteDatabase({ name: 'wordbattle.db', location: 'default' });

      const db = await getDBConnection();
      await db.executeSql('DELETE FROM words');
      await db.executeSql('DELETE FROM levels');
      console.log('✅ SQLite verileri temizlendi');
    } catch (e) {
      console.error('❌ SQLite temizlenemedi:', e);
    }
  };
  return { clearAsyncStorage, clearSQLiteData };
};
