import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import Game from './src/components/Game';

const App = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Game />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  adContainer: {
    alignSelf: 'stretch',
    bottom: 0,
    height: 90,
    backgroundColor: '#FF0000',
    position: 'absolute',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
