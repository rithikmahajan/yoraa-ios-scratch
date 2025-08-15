import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { HeartIcon } from '../../../assets/icons';
import GlobalCartIcon from '../../../components/GlobalCartIcon';
import { FontSizes, FontWeights, Spacing } from '../../../constants';

const { width: screenWidth } = Dimensions.get('window');

const ProductCard1 = ({ 
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
          size={20}
          filled={favorites.has(item.id)}
          color={favorites.has(item.id) ? '#FF0000' : '#000000'}
        />
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => onAddToCart(item.id)}
      >
        <GlobalCartIcon 
          size={20} 
          onPress={() => onAddToCart(item.id)}
          containerStyle={styles.globalCartButton}
        />
      </TouchableOpacity>
      
      <View style={[imageStyle, styles.imageHeight]} />
      
      <View style={styles.productInfo}>
        <Text style={styles.productName}>
          {item.name}
        </Text>
        <Text style={styles.productSubtitle}>
          {item.subtitle}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.productPrice}>
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
    bottom: 70,
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
  imageHeight: {
    height: 160,
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
});

export default ProductCard1;
