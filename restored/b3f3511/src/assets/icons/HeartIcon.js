import React from 'react';
import { View, StyleSheet } from 'react-native';

const HeartIcon = ({ size = 16, color = '#000000', filled = false }) => {
  const backgroundColor = filled ? color : 'transparent';
  
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={[
        styles.heart,
        {
          backgroundColor,
          borderColor: color,
          width: size * 0.75,
          height: size * 0.625,
          top: size * 0.188,
        }
      ]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heart: {
    position: 'absolute',
    borderWidth: 1.5,
    borderRadius: 8,
    transform: [{ rotate: '45deg' }],
  },
});

export default HeartIcon;
