import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';

export const App = () => {

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={styles.container}
      >
        <Text>Hello World</Text>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
