import {View, Text} from 'react-native';
import React from 'react';
import 'react-native-url-polyfill/auto';

import AppNavigator from './src/Navigators/Application';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './src/Store';
import {navigationRef} from './src/Navigators/utils';

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </NavigationContainer>
  );
};

export default App;
