import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import BackArrowIcon from '../assets/icons/BackArrowIcon';

// Reusable Back Button component using the global back arrow SVG icon
// Props:
// - onPress: function to execute on press (defaults to navigation.goBack handled by caller)
// - style: optional style override for the touchable container
// - hitSlop: optional hitSlop override
// - size: optional numeric multiplier to scale the icon (1 = default, gives 24x24)
// - color: optional color override for the arrow (defaults to black)
// - strokeWidth: optional stroke width override (defaults to 2)
const BackButton = ({ 
  onPress, 
  style, 
  hitSlop, 
  size = 1, 
  color = "black", 
  strokeWidth = 2 
}) => {
  const iconSize = 24 * size;
  
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style]}
      hitSlop={hitSlop || { top: 10, bottom: 10, left: 10, right: 10 }}
      accessibilityRole="button"
      accessibilityLabel="Back"
    >
      <BackArrowIcon
        width={iconSize}
        height={iconSize}
        color={color}
        strokeWidth={strokeWidth}
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
