import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

export const getDBConnection = async () => {
  return SQLite.openDatabase({ name: 'wordbattle.db', location: 'default' });
};

export const createTables = async (db: SQLite.SQLiteDatabase) => {
  // Words tablosu
  await db.executeSql(`
  CREATE TABLE IF NOT EXISTS words (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    wordId TEXT,                -- backend Mongo _id
    english TEXT NOT NULL,
    turkish TEXT NOT NULL,
    example TEXT,
    audio TEXT,
    pos TEXT,
    tags TEXT,                  
    synonyms TEXT,              
    antonyms TEXT,              
    phonetic TEXT,
    xpValue INTEGER NOT NULL,
    frequency TEXT CHECK(frequency IN ('low','medium','high')),
    addedBy TEXT,
    updatedAt TEXT              -- ✅ son güncellenme zamanı
  );
`);

  // UserWords tablosu
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS user_words (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT,
      wordId TEXT,
      strength INTEGER,
      lastReviewed TEXT
    );
  `);

  // UserWords tablosu
  await db.executeSql(`
   CREATE TABLE IF NOT EXISTS user_level_modes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId TEXT NOT NULL,
    levelId TEXT NOT NULL,
    modeName TEXT NOT NULL CHECK(
      modeName IN (
        'flashcard',
        'word_clash',
        'pronunciation',
        'letter_complete',
        'listening_writing',
        'sentence_complete',
        'speech_check',
        'quick_quiz'
      )
    ),
    unlocked INTEGER NOT NULL DEFAULT 0,   -- 0 veya 1
    score REAL DEFAULT 0,                  -- % cinsinden başarı
    lastPlayed TEXT                        -- ISO tarih string
);
  `);

  // Levels tablosu
  await db.executeSql(`
  CREATE TABLE IF NOT EXISTS levels (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    levelId TEXT,
    levelNumber INTEGER,
    title TEXT,
    description TEXT,
    words TEXT,
    updatedAt TEXT              -- ✅ backend’den gelecek
  );
`);

  // UserLevels tablosu
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS user_levels (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId TEXT NOT NULL,
        levelId TEXT NOT NULL,
        completedWords TEXT,        -- JSON.stringify(wordId[])
        progress REAL,              -- yüzde ilerleme
        unlocked INTEGER            -- 0 veya 1
        );
  `);

  await db.executeSql(`
        CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId TEXT,                -- backend Mongo _id
        email TEXT NOT NULL,
        name TEXT,
        surename TEXT,
        avatar TEXT,
        xp INTEGER,
        level INTEGER,
        streak INTEGER,
        money INTEGER,
        energy INTEGER,
        verified INTEGER            -- 0 veya 1
        );
  `);

  await db.executeSql(`
        CREATE TABLE IF NOT EXISTS user_words (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId TEXT NOT NULL,
            wordId TEXT NOT NULL,
            strength INTEGER,           -- 1–5
            lastReviewed TEXT           -- ISO date string
            );
  `);
};
// ✅ En son güncellenen 20 kelime
export const getLastWords = async () => {
  const db = await getDBConnection();
  const results = await db.executeSql(
    'SELECT * FROM words ORDER BY id DESC LIMIT 20',
  );
  const rows = results[0].rows;
  let items: any[] = [];
  for (let i = 0; i < rows.length; i++) {
    items.push(rows.item(i));
  }
  return items;
};

// ✅ En son güncellenen 20 level
export const getLastLevels = async () => {
  const db = await getDBConnection();
  const results = await db.executeSql(
    'SELECT * FROM levels ORDER BY id DESC LIMIT 20',
  );
  const rows = results[0].rows;
  let items: any[] = [];
  for (let i = 0; i < rows.length; i++) {
    items.push(rows.item(i));
  }
  return items;
};
// Test için sonradan silinebilir
export const getAllUserLevels = async () => {
  const db = await getDBConnection();
  const results = await db.executeSql('SELECT * FROM user_levels');
  const rows = results[0].rows;
  let items: any[] = [];
  for (let i = 0; i < rows.length; i++) {
    items.push(rows.item(i));
  }
  return items;
};
export const insertTestUserLevel = async () => {
  const db = await getDBConnection();
  await db.executeSql(
    `
    INSERT INTO user_levels (userId, levelId, completedWords, progress, unlocked)
    VALUES (?, ?, ?, ?, ?)
  `,
    [
      'testUser123', // userId (string olabilir)
      'testLevel123', // levelId (levels tablosundaki bir id ile aynı olmalı!)
      JSON.stringify([]), // completedWords
      50, // progress (%50)
      1, // ✅ unlocked açık
    ],
  );

  console.log('✅ Test user_level kaydı eklendi.');
};
