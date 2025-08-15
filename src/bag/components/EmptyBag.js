import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { EmptyBagIcon } from '../../assets/icons';
import { bagStyles } from '../styles/bagStyles';

const EmptyBag = ({ onShopNow }) => {
  return (
    <View style={bagStyles.emptyBagContainer}>
      <View style={bagStyles.emptyBagContent}>
        <View style={bagStyles.emptyBagIcon}>
          <View style={bagStyles.bagIconCircle}>
            <EmptyBagIcon width={40} height={40} color="#000000" />
          </View>
        </View>
        <Text style={bagStyles.emptyBagTitle}>Your bag is empty.</Text>
        <Text style={bagStyles.emptyBagSubtitle}>
          When you add products, they'll{'\n'}appear here.
        </Text>
      </View>
      
      <TouchableOpacity 
        style={bagStyles.shopNowButton}
        onPress={onShopNow}
      >
        <Text style={bagStyles.shopNowButtonText}>Shop Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyBag;
