import React from 'react';
import { View, StyleSheet } from 'react-native';

const SearchIcon = ({ size = 20, color = '#262626' }) => (
  <View style={[styles.container, { width: size, height: size }]}>
    <View style={[styles.circle, { borderColor: color }]} />
    <View style={[styles.handle, { backgroundColor: color }]} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    position: 'absolute',
    width: '50%',
    height: '50%',
    borderRadius: 50,
    borderWidth: 1.5,
    top: '12.5%',
    left: '12.5%',
  },
  handle: {
    position: 'absolute',
    width: '20%',
    height: 1.5,
    bottom: '12.5%',
    right: '12.5%',
    transform: [{ rotate: '45deg' }],
  },
});

export default SearchIcon;
