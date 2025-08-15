import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import ProductCard2 from '../components/ProductCard2';
import { Spacing } from '../../../constants';

const View2Compact = ({ 
  products, 
  favorites, 
  onProductPress, 
  onToggleFavorite, 
  onAddToCart 
}) => {
  const renderProducts = () => {
    const rows = [];
    for (let i = 0; i < products.length; i += 3) {
      const rowProducts = products.slice(i, i + 3);
      rows.push(
        <View key={i} style={styles.row}>
          {rowProducts.map((item, index) => (
            <ProductCard2
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
    marginBottom: Spacing.sm,
  },
});

export default View2Compact;
