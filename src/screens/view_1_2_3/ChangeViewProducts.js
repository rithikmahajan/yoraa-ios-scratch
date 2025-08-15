import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './components/Header';
import View1Default from './views/View1Default';
import View2Compact from './views/View2Compact';
import View3Staggered from './views/View3Staggered';
import { productData } from './data/productData';

const ChangeViewProducts = ({ navigation, category = 'Sale' }) => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [viewMode, setViewMode] = useState(0); // 0: 2-column grid, 1: 3-column grid, 2: large staggered grid

  useEffect(() => {
    // Set products based on category
    const categoryProducts = productData[category] || productData.Sale;
    setProducts(categoryProducts);
  }, [category]);

  const handleGridToggle = () => {
    const newViewMode = (viewMode + 1) % 3;
    console.log('Switching view mode from', viewMode, 'to', newViewMode);
    setViewMode(newViewMode); // Cycle through 0, 1, 2
  };

  const handleSearchPress = () => {
    if (navigation) {
      navigation.navigate('Search', { 
        sourceScreen: 'ChangeViewProducts',
        category: category,
        products: products 
      });
    }
  };

  const handleProductPress = (product) => {
    if (navigation) {
      navigation.navigate('ProductDetail', { 
        product: product 
      });
    }
  };

  const handleBackPress = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  const handleFilterPress = () => {
    // Handle filter functionality
    console.log('Filter button pressed');
    // You can implement filter logic here
  };

  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const handleAddToCart = (productId) => {
    // Handle add to cart functionality
    console.log('Adding product to cart:', productId);
    // You can implement actual cart logic here
    if (navigation && navigation.navigate) {
      // Optionally navigate to cart or show confirmation
      // navigation.navigate('Bag');
    }
  };

  const renderCurrentView = () => {
    const commonProps = {
      products,
      favorites,
      onProductPress: handleProductPress,
      onToggleFavorite: toggleFavorite,
      onAddToCart: handleAddToCart,
    };

    switch (viewMode) {
      case 1:
        return <View2Compact {...commonProps} />;
      case 2:
        return <View3Staggered {...commonProps} />;
      case 0:
      default:
        return <View1Default {...commonProps} />;
    }
  };

  return (
    <View style={styles.container}>
      <Header
        onBackPress={handleBackPress}
        onSearchPress={handleSearchPress}
        onGridToggle={handleGridToggle}
        onFilterPress={handleFilterPress}
        viewMode={viewMode}
      />

      {renderCurrentView()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: -160, // Move content much closer to status bar
  },
});

export default ChangeViewProducts;
