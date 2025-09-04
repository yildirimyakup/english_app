import { getDBConnection } from '../database/db';
import { logInfo } from './loger';

export const debugUserLevels = async () => {
  const db = await getDBConnection();
  const results = await db.executeSql('SELECT * FROM user_levels LIMIT 5');
  logInfo('📊 USER_LEVELS ROWS:', results[0].rows.raw());
};
