import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { HeartIcon } from '../../../assets/icons';
import GlobalCartIcon from '../../../components/GlobalCartIcon';
import { FontSizes, FontWeights, Spacing } from '../../../constants';

const { width: screenWidth } = Dimensions.get('window');

const ProductCard = ({ 
  item, 
  index, 
  viewMode, 
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

  // Different card styles for different view modes
  let cardStyle = styles.productCard;
  let imageHeight = 160;
  
  if (viewMode === 1) {
    // 3-column compact view
    cardStyle = [styles.productCard, styles.compactCard];
    imageHeight = 140;
  } else if (viewMode === 2) {
    // Large staggered view with varying heights
    cardStyle = [styles.productCard, styles.staggeredCard];
    // Create varied heights for visual interest
    const heights = [200, 160, 180, 170];
    imageHeight = heights[index % 4];
  }

  const isCompact = viewMode === 1;

  return (
    <TouchableOpacity 
      style={cardStyle}
      onPress={() => onProductPress(item)}
      activeOpacity={0.8}
    >
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => onToggleFavorite(item.id)}
      >
        <HeartIcon
          size={isCompact ? 18 : 20}
          filled={favorites.has(item.id)}
          color={favorites.has(item.id) ? '#FF0000' : '#000000'}
        />
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => onAddToCart(item.id)}
      >
        <GlobalCartIcon 
          size={isCompact ? 16 : 20} 
          onPress={() => onAddToCart(item.id)}
          containerStyle={[
            styles.globalCartButton,
            isCompact && styles.compactCartButton
          ]}
        />
      </TouchableOpacity>
      
      <View style={[imageStyle, { height: imageHeight }]} />
      
      <View style={styles.productInfo}>
        <Text style={[
          styles.productName, 
          isCompact && styles.compactText
        ]}>
          {item.name}
        </Text>
        <Text style={[
          styles.productSubtitle, 
          isCompact && styles.compactText
        ]}>
          {item.subtitle}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={[
            styles.productPrice, 
            isCompact && styles.compactText
          ]}>
            {item.price}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productCard: {
    width: (screenWidth - Spacing.md * 3) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 0,
    overflow: 'hidden',
    marginBottom: Spacing.md,
  },
  staggeredCard: {
    width: (screenWidth - Spacing.md * 3) / 2,
    marginBottom: Spacing.md,
    borderRadius: 0,
  },
  compactCard: {
    width: (screenWidth - Spacing.md * 2 - Spacing.sm * 2) / 3,
    marginBottom: Spacing.sm,
    borderRadius: 0,
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 6,
  },
  cartButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 6,
  },
  productImage: {
    width: '100%',
    height: 160,
    backgroundColor: '#F5F5F5',
  },
  whiteProductImage: {
    borderWidth: 1,
    borderColor: '#E4E4E4',
  },
  productInfo: {
    padding: 12,
    paddingTop: 10,
  },
  productName: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    color: '#000000',
    marginBottom: 2,
    lineHeight: 18,
  },
  productSubtitle: {
    fontSize: FontSizes.xs,
    color: '#767676',
    marginBottom: 6,
    lineHeight: 14,
  },
  compactText: {
    fontSize: FontSizes.xs * 0.85,
    lineHeight: FontSizes.xs * 1.1,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 2,
  },
  productPrice: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    color: '#000000',
  },
  globalCartButton: {
    width: 24,
    height: 24,
  },
  compactCartButton: {
    width: 20,
    height: 20,
  },
});

export default ProductCard;
