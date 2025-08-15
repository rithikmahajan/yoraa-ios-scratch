import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ProductCard from './ProductCard';
import { Spacing } from '../../../constants';

const ProductGrid = ({ 
  products, 
  viewMode, 
  favorites, 
  onProductPress, 
  onToggleFavorite, 
  onAddToCart 
}) => {
  const renderProductCard = ({ item, index }) => (
    <ProductCard
      item={item}
      index={index}
      viewMode={viewMode}
      favorites={favorites}
      onProductPress={onProductPress}
      onToggleFavorite={onToggleFavorite}
      onAddToCart={onAddToCart}
    />
  );

  const renderGridView = () => {
    if (viewMode === 1) {
      // 3-column compact view
      return (
        <FlatList
          key="compact-view"
          data={products}
          numColumns={3}
          keyExtractor={(item) => item.id}
          renderItem={renderProductCard}
          contentContainerStyle={styles.compactContainer}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.compactRow}
        />
      );
    } else if (viewMode === 2) {
      // Large staggered view
      return (
        <FlatList
          key="staggered-view"
          data={products}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={renderProductCard}
          contentContainerStyle={styles.staggeredContainer}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.staggeredRow}
        />
      );
    } else {
      // Default 2-column grid
      return (
        <FlatList
          key="default-view"
          data={products}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={renderProductCard}
          contentContainerStyle={styles.gridContainer}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.row}
        />
      );
    }
  };

  return renderGridView();
};

const styles = StyleSheet.create({
  gridContainer: {
    paddingHorizontal: 0,
    paddingVertical: Spacing.sm,
  },
  staggeredContainer: {
    paddingHorizontal: 0,
    paddingVertical: Spacing.sm,
  },
  compactContainer: {
    paddingHorizontal: 0,
    paddingVertical: Spacing.sm,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
  },
  staggeredRow: {
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
  },
  compactRow: {
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
  },
});

export default ProductGrid;
