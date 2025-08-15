import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { HeartIcon } from '../../../assets/icons';
import { Spacing } from '../../../constants';

const { width: screenWidth } = Dimensions.get('window');

const ProductCard3 = ({ 
  item, 
  index, 
  favorites, 
  onProductPress, 
  onToggleFavorite, 
  onAddToCart 
}) => {
  const imageStyle = [
    styles.productImage, 
    { backgroundColor: item.backgroundColor },
    item.backgroundColor === '#FFFFFF' && styles.whiteProductImage,
  ];

  // Create staggered heights for visual interest
  const heights = [200, 160, 180, 170, 190, 150, 220, 140];
  const imageHeight = heights[index % heights.length];

  return (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => onProductPress(item)}
      activeOpacity={0.8}
    >
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => onToggleFavorite(item.id)}
      >
        <HeartIcon
          size={16}
          filled={favorites.has(item.id)}
          color={favorites.has(item.id) ? '#FF0000' : '#000000'}
        />
      </TouchableOpacity>
      
      <View style={[imageStyle, { height: imageHeight }]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productCard: {
    width: (screenWidth - Spacing.md * 3) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 0,
    overflow: 'hidden',
    marginBottom: Spacing.xs,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 4,
  },
  productImage: {
    width: '100%',
    backgroundColor: '#F5F5F5',
  },
  whiteProductImage: {
    borderWidth: 1,
    borderColor: '#E4E4E4',
  },
});

export default ProductCard3;
