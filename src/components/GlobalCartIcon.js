import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import CartIconSvg from '../assets/icons/CartIconSvg';

const GlobalCartIcon = ({ 
  size = 20, 
  color = '#000000', 
  onPress, 
  style = {},
  containerStyle = {} 
}) => {
  return (
    <TouchableOpacity 
      style={[styles.container, containerStyle]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <CartIconSvg 
        width={size} 
        height={size * 0.75} // Maintain aspect ratio based on original SVG
        color={color} 
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default GlobalCartIcon;
