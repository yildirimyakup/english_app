import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import AppNavigator from './src/navigation/AppNavigator';
import Feedback from './src/components/common/Feedback';
import { createTables, getDBConnection } from './src/database/db';

function App() {
  useEffect(() => {
    (async () => {
      const db = await getDBConnection();
      await createTables(db);
      console.log('✅ SQLite tabloları hazır');
    })();
  }, []);

  return (
    <Provider store={store}>
      <AppNavigator />
      <Feedback />
    </Provider>
  );
}

export default App;
