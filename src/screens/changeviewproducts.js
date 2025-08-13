import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import { FontSizes, FontWeights, Spacing } from '../constants';
import SearchIconSvg from '../assets/icons/SearchIconSvg';
import HeartIconSvg from '../assets/icons/HeartIconSvg';
import CartIconSvg from '../assets/icons/CartIconSvg';
import GridViewIcon from '../assets/icons/GridViewIcon';
import FilterIconNew from '../assets/icons/FilterIconNew';
import LoadingScreen from '../components/LoadingScreen';

const { width: screenWidth } = Dimensions.get('window');

// Mock product data
const mockProducts = [
  {
    id: '1',
    name: 'Nike Everyday Plus Cushioned',
    subtitle: 'Training Crew Socks (3 Pairs)',
    price: 'US$22',
    colors: ['#8B4513', '#D2B48C', '#F5DEB3'],
    backgroundColor: '#8B4513',
    isFavorite: false,
  },
  {
    id: '2',
    name: 'Nike Everyday Plus Cushioned',
    subtitle: 'Training Crew Socks (6 Pairs)',
    price: 'US$28',
    colors: ['#F5DEB3', '#D2B48C', '#8B4513', '#654321', '#A0522D'],
    backgroundColor: '#F5DEB3',
    isFavorite: false,
  },
  {
    id: '3',
    name: 'Nike Elite Crew',
    subtitle: 'Basketball Socks',
    price: 'US$16',
    colors: ['#FFFFFF', '#000000'],
    backgroundColor: '#FFFFFF',
    isFavorite: false,
  },
  {
    id: '4',
    name: 'Nike Everyday Plus Cushioned',
    subtitle: 'Training Ankle Socks (6 Pairs)',
    price: 'US$28',
    colors: ['#FFFFFF', '#E5E5E5', '#D3D3D3'],
    backgroundColor: '#E5E5E5',
    isFavorite: false,
  },
  {
    id: '5',
    name: 'Nike Air Cushioned',
    subtitle: 'Performance Running Socks',
    price: 'US$25',
    colors: ['#FF0000', '#000000', '#FFFFFF'],
    backgroundColor: '#FF0000',
    isFavorite: false,
  },
  {
    id: '6',
    name: 'Nike Pro',
    subtitle: 'Compression Athletic Socks',
    price: 'US$35',
    colors: ['#000000', '#808080'],
    backgroundColor: '#000000',
    isFavorite: false,
  },
];

const ChangeViewProducts = ({ navigation, category = 'Sale' }) => {
  const [viewMode, setViewMode] = useState(0); // 0: default 2x2 grid, 1: 3-column grid, 2: staggered
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  // const [searchQuery, setSearchQuery] = useState('');
  
  const slideAnim = useRef(new Animated.Value(screenWidth)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Show loading screen when component mounts
    setIsLoading(true);
  }, [category]);

  const handleLoadingComplete = () => {
    console.log('Loading complete, setting products:', mockProducts.length);
    setIsLoading(false);
    setAllProducts(mockProducts);
    setProducts(mockProducts);
    
    // Animate in the product view
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleViewToggle = () => {
    const nextMode = (viewMode + 1) % 3;
    console.log('Switching view mode from', viewMode, 'to', nextMode);
    
    // Animate slide transition
    Animated.timing(slideAnim, {
      toValue: -screenWidth,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      setViewMode(nextMode);
      slideAnim.setValue(screenWidth);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleSearchPress = () => {
    if (navigation) {
      navigation.navigate('Search', { 
        sourceScreen: 'ChangeViewProducts',
        category: category,
        products: allProducts 
      });
    }
  };

  const handleBackPress = () => {
    if (navigation) {
      navigation.goBack();
    }
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

  const renderColorDots = (colors, isCompact = false) => (
    <View style={styles.colorDotsContainer}>
      {colors.slice(0, 5).map((color, index) => (
        <View
          key={index}
          style={[
            styles.colorDot,
            isCompact && styles.compactColorDot,
            { backgroundColor: color },
            color === '#FFFFFF' && styles.whiteColorDot,
          ]}
        />
      ))}
      {colors.length > 5 && (
        <Text style={[styles.moreColors, isCompact && styles.compactMoreColors]}>
          +{colors.length - 5}
        </Text>
      )}
    </View>
  );

  const renderProductCard = (item, style = {}) => {
    const imageStyle = [
      styles.productImage, 
      { backgroundColor: item.backgroundColor },
      item.backgroundColor === '#FFFFFF' && styles.whiteProductImage,
    ];

    // Determine if this is a compact view (for smaller text/elements)
    const isCompactView = viewMode === 1;

    return (
      <View style={[styles.productCard, style]}>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item.id)}
        >
          <HeartIconSvg
            width={isCompactView ? 16 : 20}
            height={isCompactView ? 14 : 18}
            color={favorites.has(item.id) ? '#FF0000' : '#000000'}
          />
        </TouchableOpacity>
        
        <View style={[imageStyle, isCompactView && styles.compactProductImage]} />
        
        <View style={[styles.productInfo, isCompactView && styles.compactProductInfo]}>
          <Text style={[styles.productName, isCompactView && styles.compactProductName]}>
            {item.name}
          </Text>
          <Text style={[styles.productSubtitle, isCompactView && styles.compactProductSubtitle]}>
            {item.subtitle}
          </Text>
          {renderColorDots(item.colors, isCompactView)}
          <View style={styles.priceContainer}>
            <Text style={[styles.productPrice, isCompactView && styles.compactProductPrice]}>
              {item.price}
            </Text>
            <TouchableOpacity style={styles.cartButton}>
              <CartIconSvg 
                width={isCompactView ? 16 : 20} 
                height={isCompactView ? 12 : 15} 
                color="#000000" 
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderDefaultGridView = () => (
    <FlatList
      data={products}
      numColumns={2}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => renderProductCard(item, styles.defaultGridItem)}
      contentContainerStyle={styles.gridContainer}
      showsVerticalScrollIndicator={false}
    />
  );

  const renderCompactGridView = () => (
    <FlatList
      data={products}
      numColumns={3}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => renderProductCard(item, styles.compactGridItem)}
      contentContainerStyle={styles.gridContainer}
      showsVerticalScrollIndicator={false}
    />
  );

  const renderStaggeredView = () => (
    <ScrollView contentContainerStyle={styles.staggeredContainer}>
      <View style={styles.staggeredColumn}>
        {products.filter((_, index) => index % 2 === 0).map((item, index) => (
          <View key={item.id}>
            {renderProductCard(item, StyleSheet.flatten([
              styles.staggeredItem,
              index === 0 ? styles.staggeredItemTall : styles.staggeredItemRegular
            ]))}
          </View>
        ))}
      </View>
      <View style={styles.staggeredColumn}>
        {products.filter((_, index) => index % 2 === 1).map((item, index) => (
          <View key={item.id}>
            {renderProductCard(item, StyleSheet.flatten([
              styles.staggeredItem,
              index % 2 === 0 ? styles.staggeredItemRegular : styles.staggeredItemTall
            ]))}
          </View>
        ))}
      </View>
    </ScrollView>
  );

  const getCurrentView = () => {
    console.log('Rendering view mode:', viewMode, 'with products:', products.length);
    
    if (!products || products.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No products available</Text>
        </View>
      );
    }
    
    switch (viewMode) {
      case 0:
        return renderDefaultGridView();
      case 1:
        return renderCompactGridView();
      case 2:
        return renderStaggeredView();
      default:
        return renderDefaultGridView();
    }
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton} onPress={handleSearchPress}>
            <SearchIconSvg width={24} height={24} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleViewToggle}>
            <GridViewIcon width={24} height={24} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <FilterIconNew width={24} height={24} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Animated Content */}
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        {getCurrentView()}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: 60,
    paddingBottom: Spacing.md,
  },
  backButton: {
    padding: Spacing.xs,
  },
  backArrow: {
    fontSize: 28,
    color: '#000000',
    fontWeight: '300',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  iconButton: {
    padding: Spacing.xs,
  },
  content: {
    flex: 1,
  },
  gridContainer: {
    padding: Spacing.md,
  },
  // Default 2x2 Grid View (View 1)
  defaultGridItem: {
    width: (screenWidth - Spacing.md * 3) / 2,
    marginHorizontal: Spacing.xs,
    marginBottom: Spacing.lg,
  },
  // Compact 3-column Grid View (View 2)
  compactGridItem: {
    width: (screenWidth - Spacing.md * 4) / 3,
    marginHorizontal: Spacing.xs / 2,
    marginBottom: Spacing.md,
  },
  // Staggered View (View 3)
  staggeredContainer: {
    flexDirection: 'row',
    padding: Spacing.md,
  },
  staggeredColumn: {
    flex: 1,
    paddingHorizontal: Spacing.xs,
  },
  staggeredItem: {
    marginBottom: Spacing.lg,
  },
  staggeredItemRegular: {
    minHeight: 280,
  },
  staggeredItemTall: {
    minHeight: 350,
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  favoriteButton: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: Spacing.xs,
  },
  productImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#F5F5F5',
  },
  compactProductImage: {
    height: 120,
  },
  whiteProductImage: {
    borderWidth: 1,
    borderColor: '#E4E4E4',
  },
  productInfo: {
    padding: Spacing.sm,
  },
  compactProductInfo: {
    padding: Spacing.xs,
  },
  productName: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    color: '#000000',
    marginBottom: 2,
  },
  compactProductName: {
    fontSize: FontSizes.xs,
    marginBottom: 1,
  },
  productSubtitle: {
    fontSize: FontSizes.xs,
    color: '#767676',
    marginBottom: Spacing.xs,
  },
  compactProductSubtitle: {
    fontSize: 10,
    marginBottom: Spacing.xs / 2,
  },
  colorDotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 4,
  },
  compactColorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 3,
  },
  whiteColorDot: {
    borderWidth: 1,
    borderColor: '#E4E4E4',
  },
  moreColors: {
    fontSize: FontSizes.xs,
    color: '#767676',
    marginLeft: 4,
  },
  compactMoreColors: {
    fontSize: 10,
    marginLeft: 2,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    color: '#000000',
  },
  compactProductPrice: {
    fontSize: FontSizes.xs,
  },
  cartButton: {
    padding: Spacing.xs,
  },
  // Empty state styles
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  emptyText: {
    fontSize: FontSizes.md,
    color: '#767676',
    textAlign: 'center',
  },
});

export default ChangeViewProducts;
