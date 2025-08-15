import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import ProductCard3 from '../components/ProductCard3';
import { Spacing } from '../../../constants';

const View3Staggered = ({ 
  products, 
  favorites, 
  onProductPress, 
  onToggleFavorite, 
  onAddToCart 
}) => {
  const renderProducts = () => {
    const rows = [];
    for (let i = 0; i < products.length; i += 2) {
      const rowProducts = products.slice(i, i + 2);
      rows.push(
        <View key={i} style={styles.row}>
          {rowProducts.map((item, index) => (
            <ProductCard3
              key={item.id}
              item={item}
              index={i + index}
              favorites={favorites}
              onProductPress={onProductPress}
              onToggleFavorite={onToggleFavorite}
              onAddToCart={onAddToCart}
            />
          ))}
        </View>
      );
    }
    return rows;
  };

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
      {renderProducts()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: Spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
});

export default View3Staggered;
