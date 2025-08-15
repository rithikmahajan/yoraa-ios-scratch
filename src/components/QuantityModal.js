import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  PanResponder,
} from 'react-native';
import { QUANTITIES } from '../constants/bagConstants';
import { bagStyles } from '../styles/bagStyles';

const QuantityModal = ({
  visible,
  selectedQuantity,
  setSelectedQuantity,
  onDone,
  onClose,
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
          <Text style={bagStyles.modalTitle}>Select Quantity</Text>
          <ScrollView style={bagStyles.quantityList}>
            {QUANTITIES.map((qty) => (
              <TouchableOpacity
                key={qty}
                style={[
                  bagStyles.quantityOption,
                  selectedQuantity === qty && bagStyles.selectedQuantityOption
                ]}
                onPress={() => setSelectedQuantity(qty)}
              >
                <Text style={[
                  bagStyles.quantityOptionText,
                  selectedQuantity === qty && bagStyles.selectedQuantityOptionText
                ]}>
                  {qty}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity style={bagStyles.doneButton} onPress={onDone}>
            <Text style={bagStyles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

export default QuantityModal;
