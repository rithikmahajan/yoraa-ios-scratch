import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { bagStyles } from '../styles/bagStyles';
import { calculateFinalTotal, DELIVERY_COST, POINTS_DISCOUNT } from '../utils/bagUtils';

const BagSummary = ({ 
  cartItems,
  appliedPromoCode,
  pointsApplied,
  promoCode,
  setPromoCode,
  onApplyPromoCode,
  onTogglePoints,
  onRemovePromoCode,
  onCheckout 
}) => {
  const renderDeliverySection = () => (
    <View style={bagStyles.deliverySection}>
      <Text style={bagStyles.deliveryTitle}>Delivery</Text>
      <Text style={bagStyles.deliveryText}>Arrives Wed, 11 May</Text>
      <View style={bagStyles.deliveryLocationContainer}>
        <Text style={bagStyles.deliveryLocationIcon}>📍</Text>
        <Text style={bagStyles.deliveryLocationText}>Pin to PM Location</Text>
        <TouchableOpacity style={bagStyles.editLocationButton}>
          <Text style={bagStyles.editLocationText}>Edit location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPointsSection = () => (
    <View style={bagStyles.pointsSection}>
      <TouchableOpacity style={bagStyles.pointsContainer} onPress={onTogglePoints}>
        <View style={[bagStyles.checkbox, pointsApplied && bagStyles.checkboxChecked]}>
          {pointsApplied && <Text style={bagStyles.checkmark}>✓</Text>}
        </View>
        <Text style={bagStyles.pointsText}>Apply ✓ Points</Text>
        <Text style={bagStyles.pointsSubtext}>Available: 1500 points</Text>
      </TouchableOpacity>
    </View>
  );

  const renderPromoSection = () => (
    <View style={bagStyles.promoSection}>
      <Text style={bagStyles.promoTitle}>Have a Promo Code?</Text>
      <View style={bagStyles.promoInputContainer}>
        <TextInput
          style={bagStyles.promoInput}
          placeholder="Enter promo code"
          value={promoCode}
          onChangeText={setPromoCode}
          autoCapitalize="characters"
        />
        <TouchableOpacity 
          style={[bagStyles.applyButton, promoCode.trim() === '' && bagStyles.applyButtonDisabled]}
          onPress={onApplyPromoCode}
          disabled={promoCode.trim() === ''}
        >
          <Text style={[bagStyles.applyButtonText, promoCode.trim() === '' && bagStyles.applyButtonTextDisabled]}>
            Apply
          </Text>
        </TouchableOpacity>
      </View>
      {appliedPromoCode && (
        <View style={bagStyles.appliedPromoContainer}>
          <Text style={bagStyles.appliedPromoText}>
            {appliedPromoCode.discount}% OFF - {appliedPromoCode.code}
          </Text>
          <TouchableOpacity onPress={onRemovePromoCode}>
            <Text style={bagStyles.removePromoText}>Remove</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const renderSummarySection = () => {
    const finalTotal = calculateFinalTotal(cartItems, appliedPromoCode, pointsApplied);
    
    return (
      <View style={bagStyles.summarySection}>
        <View style={bagStyles.summaryRow}>
          <Text style={bagStyles.summaryLabel}>Delivery</Text>
          <Text style={bagStyles.summaryValue}>Standard - Free</Text>
        </View>
        <View style={bagStyles.summaryRow}>
          <Text style={bagStyles.summaryLabel}>International Delivery</Text>
          <Text style={bagStyles.summaryValue}>Standard - ${DELIVERY_COST}</Text>
        </View>
        {appliedPromoCode && (
          <View style={bagStyles.summaryRow}>
            <Text style={bagStyles.summaryLabel}>Promo ({appliedPromoCode.code})</Text>
            <Text style={bagStyles.summaryValue}>-US${appliedPromoCode.discountAmount.toFixed(2)}</Text>
          </View>
        )}
        {pointsApplied && (
          <View style={bagStyles.summaryRow}>
            <Text style={bagStyles.summaryLabel}>Points Discount</Text>
            <Text style={bagStyles.summaryValue}>-${POINTS_DISCOUNT.toFixed(2)}</Text>
          </View>
        )}
        <View style={[bagStyles.summaryRow, bagStyles.totalRow]}>
          <Text style={bagStyles.totalLabel}>Total</Text>
          <Text style={bagStyles.totalValue}>
            US${finalTotal.toFixed(2)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <>
      {renderDeliverySection()}
      {renderPointsSection()}
      {renderPromoSection()}
      {renderSummarySection()}
    </>
  );
};

export default BagSummary;
