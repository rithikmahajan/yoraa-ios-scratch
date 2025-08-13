import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Colors } from './src/constants';
import { EnhancedLayout } from './src/components/layout';
import { FavoritesProvider } from './src/contexts/FavoritesContext';

const App = () => {
  return (
    <SafeAreaProvider>
      <FavoritesProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar 
            barStyle="dark-content" 
            backgroundColor={Colors.background} 
            translucent={false}
          />
          <EnhancedLayout />
        </SafeAreaView>
      </FavoritesProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default App;
