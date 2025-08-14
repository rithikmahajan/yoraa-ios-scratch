import React from 'react';
import { View, StyleSheet } from 'react-native';

const FilterIcon = ({ size = 20, color = '#262626' }) => (
  <View style={[styles.container, { width: size, height: size }]}>
    <View style={[styles.line1, { backgroundColor: color }]} />
    <View style={[styles.circle1, { borderColor: color }]} />
    <View style={[styles.line2, { backgroundColor: color }]} />
    <View style={[styles.circle2, { borderColor: color }]} />
    <View style={[styles.line3, { backgroundColor: color }]} />
    <View style={[styles.circle3, { borderColor: color }]} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '13%',
  },
  line1: {
    position: 'absolute',
    height: 1.5,
    top: '13.4%',
    left: 0,
    right: 0,
  },
  circle1: {
    position: 'absolute',
    width: '21.9%',
    height: '21.9%',
    borderRadius: 50,
    borderWidth: 1.5,
    backgroundColor: 'white',
    top: '2.8%',
    left: '25.4%',
  },
  line2: {
    position: 'absolute',
    height: 1.5,
    top: '47.85%',
    left: 0,
    right: 0,
  },
  circle2: {
    position: 'absolute',
    width: '21.9%',
    height: '21.9%',
    borderRadius: 50,
    borderWidth: 1.5,
    backgroundColor: 'white',
    top: '37.15%',
    left: '57.3%',
  },
  line3: {
    position: 'absolute',
    height: 1.5,
    top: '82.3%',
    left: 0,
    right: 0,
  },
  circle3: {
    position: 'absolute',
    width: '21.9%',
    height: '21.9%',
    borderRadius: 50,
    borderWidth: 1.5,
    backgroundColor: 'white',
    top: '71.6%',
    left: '73.7%',
  },
});

export default FilterIcon;
