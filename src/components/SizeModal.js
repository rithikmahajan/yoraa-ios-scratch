import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  PanResponder,
} from 'react-native';
import { SIZES } from '../constants/bagConstants';
import { bagStyles } from '../styles/bagStyles';

const SizeModal = ({
  visible,
  selectedSize,
  setSelectedSize,
  onDone,
  onClose,
  onOpenSizeChart,
  slideAnim,
  panY,
}) => {
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dy) > 10;
    },
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dy > 0) {
        panY.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dy > 100) {
        onClose();
      } else {
        Animated.spring(panY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  if (!visible) return null;

  return (
    <View style={bagStyles.modalOverlay}>
      <Animated.View 
        style={[
          bagStyles.modalContainer,
          {
            transform: [
              { translateY: slideAnim },
              { translateY: panY }
            ]
          }
        ]}
        {...panResponder.panHandlers}
      >
        <View style={bagStyles.dragHandle} />
        <View style={bagStyles.modalContent}>
          <Text style={bagStyles.modalTitle}>Select Size</Text>
          <ScrollView style={bagStyles.sizeList}>
            {SIZES.map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  bagStyles.sizeOption,
                  selectedSize === size && bagStyles.selectedSizeOption
                ]}
                onPress={() => setSelectedSize(size)}
              >
                <Text style={[
                  bagStyles.sizeOptionText,
                  selectedSize === size && bagStyles.selectedSizeOptionText
                ]}>
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity 
            style={bagStyles.sizeChartLink}
            onPress={onOpenSizeChart}
          >
            <Text style={bagStyles.sizeChartText}>Size Chart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={bagStyles.doneButton} onPress={onDone}>
            <Text style={bagStyles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

export default SizeModal;
