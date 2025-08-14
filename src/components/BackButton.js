import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

// Reusable Back Button component using the global back-button asset
// Props:
// - onPress: function to execute on press (defaults to navigation.goBack handled by caller)
// - style: optional style override for the touchable container
// - hitSlop: optional hitSlop override
// - size: optional numeric multiplier to scale the icon (1 = default)
const BackButton = ({ onPress, style, hitSlop, size = 1 }) => {
  const width = 34 * size;
  const height = 12 * size;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style]}
      hitSlop={hitSlop || { top: 10, bottom: 10, left: 10, right: 10 }}
      accessibilityRole="button"
      accessibilityLabel="Back"
    >
      <Image
        source={require('../assets/icons/back-button.png')}
        style={{ width, height }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
  },
});

export default BackButton;
