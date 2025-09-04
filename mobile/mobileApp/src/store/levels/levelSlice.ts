import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getDBConnection } from '../../database/db';
import { logInfo } from '../../utils/loger';

interface Level {
  id: string;
  levelId: string;
  levelNumber: number;
  title: string;
  description?: string;
  progress: number;
  unlocked: boolean;
  modes: any[];
}

interface LevelState {
  levels: Level[];
  loading: boolean;
  error?: string;
}

const initialState: LevelState = {
  levels: [],
  loading: false,
  error: undefined,
};

// ✅ SQLite'tan levelleri çeken thunk
export const fetchLevelsFromDB = createAsyncThunk(
  'levels/fetchFromDB',
  async () => {
    const db = await getDBConnection();
    const levelsRows = await db.executeSql(
      'SELECT levelId, title FROM levels LIMIT 5',
    );
    logInfo('LEVELS:', levelsRows[0].rows.raw());
    const userLevelsRows = await db.executeSql(
      'SELECT levelId, unlocked FROM user_levels LIMIT 5',
    );
    logInfo('USER_LEVELS:', userLevelsRows[0].rows.raw());
    const results = await db.executeSql(`
  SELECT 
    l.levelId,
    l.levelNumber,
    l.title,
    l.description,
    IFNULL(ul.progress, 0) as progress,
    CASE WHEN ul.unlocked = 1 THEN 1 ELSE 0 END as unlocked,
    (
      SELECT json_group_array(
        json_object(
          'modeName', modeName,
          'unlocked', unlocked,
          'score', score
        )
      )
      FROM user_level_modes
      WHERE userId = ul.userId AND levelId = l.levelId
    ) as modes
  FROM levels l
  LEFT JOIN user_levels ul ON l.levelId = ul.levelId
`);
    const DEFAULT_MODES = [
      'flashcard',
      'word_clash',
      'pronunciation',
      'letter_complete',
      'listening_writing',
      'sentence_complete',
      'speech_check',
      'quick_quiz',
    ];
    const rows = results[0].rows;
    const data: Level[] = [];

    for (let i = 0; i < rows.length; i++) {
      const item = rows.item(i);
      const dbModes = item.modes ? JSON.parse(item.modes) : [];

      // ✅ Eksik modları default olarak kilitli ekle
      const mergedModes = DEFAULT_MODES.map(modeName => {
        const found = dbModes.find((m: any) => m.modeName === modeName);
        return found || { modeName, unlocked: false, score: 0 };
      });

      data.push({
        id: item.levelId,
        levelId: item.levelId,
        levelNumber: item.levelNumber,
        title: item.title,
        description: item.description,
        progress: item.progress,
        unlocked: Boolean(Number(item.unlocked)),
        modes: mergedModes,
      });
    }
    console.log('✅ Levels fetched:', data);
    return data;
  },
);

const levelSlice = createSlice({
  name: 'levels',
  initialState,
  reducers: {
    setLevels(state, action: PayloadAction<Level[]>) {
      state.levels = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchLevelsFromDB.pending, state => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchLevelsFromDB.fulfilled, (state, action) => {
        state.loading = false;
        state.levels = action.payload;
      })
      .addCase(fetchLevelsFromDB.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setLevels, setLoading } = levelSlice.actions;
export default levelSlice.reducer;
