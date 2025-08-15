import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ProductCard1 from '../components/ProductCard1';
import { Spacing } from '../../../constants';

const View1Default = ({ 
  products, 
  favorites, 
  onProductPress, 
  onToggleFavorite, 
  onAddToCart 
}) => {
  const renderProductCard = ({ item, index }) => (
    <ProductCard1
      item={item}
      index={index}
      favorites={favorites}
      onProductPress={onProductPress}
      onToggleFavorite={onToggleFavorite}
      onAddToCart={onAddToCart}
    />
  );

  return (
    <FlatList
      data={products}
      numColumns={2}
      keyExtractor={(item) => item.id}
      renderItem={renderProductCard}
      contentContainerStyle={styles.gridContainer}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={styles.row}
    />
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    paddingHorizontal: 0,
    paddingVertical: Spacing.sm,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
  },
});

export default View1Default;
