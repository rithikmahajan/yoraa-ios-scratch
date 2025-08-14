import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { FontSizes, FontWeights, Spacing } from '../constants';
import SearchIconSvg from '../assets/icons/SearchIconSvg';
import HeartIconSvg from '../assets/icons/HeartIconSvg';
import FilterIconNew from '../assets/icons/FilterIconNew';
import GlobalCartIcon from '../components/GlobalCartIcon';

const { width: screenWidth } = Dimensions.get('window');

// Custom Grid Icon that changes based on view mode
const CustomGridIcon = ({ width = 24, height = 24, color = '#000000', viewMode = 0 }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    {viewMode === 0 ? (
      // Regular 2x2 grid icon
      <>
        <Path
          d="M3 3H11V11H3V3Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M13 3H21V11H13V3Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M13 13H21V21H13V13Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M3 13H11V21H3V13Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ) : viewMode === 1 ? (
      // Staggered grid icon - different sizes
      <>
        <Path
          d="M3 3H10V12H3V3Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M14 3H21V8H14V3Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M14 12H21V21H14V12Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M3 16H10V21H3V16Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ) : (
      // Third grid view - 3x3 grid icon
      <>
        <Path
          d="M3 3H8V8H3V3Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M10 3H15V8H10V3Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M17 3H22V8H17V3Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M3 10H8V15H3V10Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M10 10H15V15H10V10Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M17 10H22V15H17V10Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M3 17H8V22H3V17Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M10 17H15V22H10V17Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M17 17H22V22H17V17Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    )}
  </Svg>
);

// Product data for different categories
const productData = {
  Sale: [
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
  ],
  Lifestyle: [
    {
      id: '5',
      name: 'High-Waist Straight Jeans',
      subtitle: 'Vintage Blue Denim',
      price: 'US$89',
      colors: ['#4682B4', '#5F9EA0'],
      backgroundColor: '#E6F3FF',
      isFavorite: false,
    },
    {
      id: '6',
      name: 'Cropped Orange Tee',
      subtitle: 'Cotton Blend Shirt',
      price: 'US$35',
      colors: ['#FF6B35', '#FF8C42'],
      backgroundColor: '#FF6B35',
      isFavorite: false,
    },
    {
      id: '7',
      name: 'White Cotton Tank',
      subtitle: 'Relaxed Fit Top',
      price: 'US$25',
      colors: ['#FFFFFF', '#F8F8F8'],
      backgroundColor: '#F5F5F5',
      isFavorite: false,
    },
    {
      id: '8',
      name: 'Black Athleisure Set',
      subtitle: 'Two-Piece Outfit',
      price: 'US$78',
      colors: ['#000000', '#333333'],
      backgroundColor: '#F0F0F0',
      isFavorite: false,
    },
    {
      id: '9',
      name: 'Denim Jacket & Jeans',
      subtitle: 'Matching Set',
      price: 'US$125',
      colors: ['#4682B4', '#6495ED'],
      backgroundColor: '#E6F3FF',
      isFavorite: false,
    },
    {
      id: '10',
      name: 'Yellow Cardigan',
      subtitle: 'Cozy Knit Sweater',
      price: 'US$65',
      colors: ['#FFD700', '#FFA500'],
      backgroundColor: '#FFF8DC',
      isFavorite: false,
    },
    {
      id: '11',
      name: 'Dark Casual Set',
      subtitle: 'Comfort Wear',
      price: 'US$88',
      colors: ['#2F2F2F', '#000000'],
      backgroundColor: '#F0F0F0',
      isFavorite: false,
    },
  ],
  Trendy: [
    {
      id: '12',
      name: 'Textured Mini Dress',
      subtitle: 'Woven Pattern Design',
      price: 'US$125',
      colors: ['#F5E6D3', '#E8D5C4'],
      backgroundColor: '#F5E6D3',
      isFavorite: false,
    },
    {
      id: '13',
      name: 'Camel Knit Sweater',
      subtitle: 'Soft Wool Blend',
      price: 'US$95',
      colors: ['#D2B48C', '#CD853F'],
      backgroundColor: '#D2B48C',
      isFavorite: false,
    },
    {
      id: '14',
      name: 'Neutral Knit Set',
      subtitle: 'Matching Top & Bottom',
      price: 'US$88',
      colors: ['#F5E6D3', '#E8D5C4', '#D2B48C'],
      backgroundColor: '#F5E6D3',
      isFavorite: false,
    },
    {
      id: '15',
      name: 'Cream Coordinated Look',
      subtitle: 'Two-Piece Ensemble',
      price: 'US$112',
      colors: ['#F5E6D3', '#E8D5C4'],
      backgroundColor: '#E8D5C4',
      isFavorite: false,
    },
    {
      id: '16',
      name: 'Camel Sweater',
      subtitle: 'Turtleneck Style',
      price: 'US$75',
      colors: ['#D2B48C', '#CD853F'],
      backgroundColor: '#D2B48C',
      isFavorite: false,
    },
    {
      id: '17',
      name: 'Beige Textured Dress',
      subtitle: 'Vintage Inspired',
      price: 'US$135',
      colors: ['#F5E6D3', '#E8D5C4'],
      backgroundColor: '#F5E6D3',
      isFavorite: false,
    },
  ],
};

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

  const renderColorDots = (colors) => (
    <View style={styles.colorDotsContainer}>
      {colors.slice(0, 5).map((color, index) => (
        <View
          key={index}
          style={[
            styles.colorDot,
            { backgroundColor: color },
            color === '#FFFFFF' && styles.whiteColorDot,
          ]}
        />
      ))}
      {colors.length > 5 && (
        <Text style={styles.moreColors}>
          +{colors.length - 5}
        </Text>
      )}
    </View>
  );

  const renderProductCard = ({ item, index }) => {
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
        onPress={() => handleProductPress(item)}
        activeOpacity={0.8}
      >
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item.id)}
        >
          <HeartIconSvg
            width={isCompact ? 18 : 20}
            height={isCompact ? 16 : 18}
            color={favorites.has(item.id) ? '#FF0000' : '#000000'}
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
          {!isCompact && renderColorDots(item.colors)}
          <View style={styles.priceContainer}>
            <Text style={[
              styles.productPrice, 
              isCompact && styles.compactText
            ]}>
              {item.price}
            </Text>
            <GlobalCartIcon 
              size={isCompact ? 16 : 20} 
              onPress={() => handleAddToCart(item.id)}
              containerStyle={[
                styles.globalCartButton,
                isCompact && styles.compactCartButton
              ]}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderGridView = () => {
    if (viewMode === 1) {
      // 3-column compact view
      return (
        <FlatList
          key="compact-view"
          data={products}
          numColumns={3}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => renderProductCard({ item, index })}
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
          renderItem={({ item, index }) => renderProductCard({ item, index })}
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
          renderItem={({ item, index }) => renderProductCard({ item, index })}
          contentContainerStyle={styles.gridContainer}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.row}
        />
      );
    }
  };

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
          <TouchableOpacity style={styles.iconButton} onPress={handleGridToggle}>
            <CustomGridIcon width={24} height={24} color="#000000" viewMode={viewMode} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <FilterIconNew width={24} height={24} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Debug view mode indicator */}
      <Text style={styles.debugText}>View Mode: {viewMode} ({viewMode === 0 ? '2-col' : viewMode === 1 ? '3-col' : 'staggered'})</Text>

      {/* Product Grid */}
      {renderGridView()}
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
  gridContainer: {
    padding: Spacing.md,
  },
  staggeredContainer: {
    padding: Spacing.md,
  },
  compactContainer: {
    padding: Spacing.md,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xs,
  },
  staggeredRow: {
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xs,
  },
  compactRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 0,
  },
  productCard: {
    width: (screenWidth - Spacing.md * 3) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  staggeredCard: {
    width: (screenWidth - Spacing.md * 3) / 2,
    marginBottom: Spacing.md,
    borderRadius: 16,
  },
  compactCard: {
    width: (screenWidth - Spacing.md * 2 - Spacing.sm * 2) / 3,
    marginBottom: Spacing.sm,
    borderRadius: 8,
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
    height: 160,
    backgroundColor: '#F5F5F5',
  },
  whiteProductImage: {
    borderWidth: 1,
    borderColor: '#E4E4E4',
  },
  productInfo: {
    padding: Spacing.sm,
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
    marginBottom: Spacing.xs,
    lineHeight: 16,
  },
  smallerText: {
    fontSize: FontSizes.xs * 0.9,
  },
  compactText: {
    fontSize: FontSizes.xs * 0.85,
    lineHeight: FontSizes.xs * 1.1,
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
  whiteColorDot: {
    borderWidth: 1,
    borderColor: '#E4E4E4',
  },
  moreColors: {
    fontSize: FontSizes.xs,
    color: '#767676',
    marginLeft: 4,
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
  globalCartButton: {
    width: 24,
    height: 24,
    position: 'relative',
    bottom: 0,
    right: 0,
  },
  compactCartButton: {
    width: 20,
    height: 20,
  },
  debugText: {
    textAlign: 'center',
    fontSize: FontSizes.xs,
    color: '#666',
    marginBottom: Spacing.sm,
  },
});

export default ChangeViewProducts;
