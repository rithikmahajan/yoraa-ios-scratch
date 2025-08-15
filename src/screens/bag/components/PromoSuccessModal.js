import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { bagStyles } from '../styles/bagStyles';

const PromoSuccessModal = ({
  visible,
  appliedPromoCode,
  onClose,
  slideAnim,
  opacityAnim,
}) => {
  if (!visible) return null;

  return (
    <Animated.View 
      style={[
        bagStyles.modalOverlay,
        {
          opacity: opacityAnim
        }
      ]}
    >
      <Animated.View 
        style={[
          bagStyles.promoSuccessModalContainer,
          {
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <View style={bagStyles.promoSuccessContent}>
          <View style={bagStyles.successIconContainer}>
            <View style={bagStyles.successIcon}>
              <Text style={bagStyles.successCheckmark}>✓</Text>
            </View>
          </View>
          
          <Text style={bagStyles.promoSuccessTitle}>Promo code Applied</Text>
          <Text style={bagStyles.promoSuccessDescription}>
            {appliedPromoCode?.discount}% OFF applied to the total bag items
          </Text>
          
          <TouchableOpacity 
            style={bagStyles.promoSuccessDoneButton} 
            onPress={onClose}
          >
            <Text style={bagStyles.promoSuccessDoneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

export default PromoSuccessModal;
