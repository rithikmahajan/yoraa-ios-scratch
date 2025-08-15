import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { FontSizes, Spacing } from '../../../constants';

const DebugInfo = ({ viewMode }) => {
  const getViewModeText = (mode) => {
    switch (mode) {
      case 0:
        return '2-col';
      case 1:
        return '3-col';
      case 2:
        return 'staggered';
      default:
        return 'unknown';
    }
  };

  return (
    <Text style={styles.debugText}>
      View Mode: {viewMode} ({getViewModeText(viewMode)})
    </Text>
  );
};

const styles = StyleSheet.create({
  debugText: {
    textAlign: 'center',
    fontSize: FontSizes.xs,
    color: '#666',
    marginBottom: Spacing.sm,
  },
});

export default DebugInfo;
