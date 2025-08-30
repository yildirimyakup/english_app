import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import AppNavigator from './src/navigation/AppNavigator';
import Feedback from './src/components/common/Feedback';

function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
      <Feedback />
    </Provider>
  );
}

export default App;
