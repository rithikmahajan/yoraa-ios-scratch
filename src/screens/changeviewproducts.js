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
import CartIconSvg from '../assets/icons/CartIconSvg';
import FilterIconNew from '../assets/icons/FilterIconNew';

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
      name: 'Casual White Tank',
      subtitle: 'Relaxed Fit Top',
      price: 'US$45',
      colors: ['#FFFFFF', '#F0F0F0'],
      backgroundColor: '#F5F5F5',
      isFavorite: false,
    },
    {
      id: '6',
      name: 'Bright Orange Tee',
      subtitle: 'Cotton Blend Shirt',
      price: 'US$35',
      colors: ['#FF6B35', '#FF8C42'],
      backgroundColor: '#FF6B35',
      isFavorite: false,
    },
    {
      id: '7',
      name: 'High-Waist Jeans',
      subtitle: 'Classic Denim',
      price: 'US$89',
      colors: ['#4A90E2', '#6BB6FF'],
      backgroundColor: '#E6F3FF',
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
  ],
  Trendy: [
    {
      id: '9',
      name: 'Textured Mini Dress',
      subtitle: 'Woven Pattern Design',
      price: 'US$125',
      colors: ['#F5E6D3', '#E8D5C4'],
      backgroundColor: '#F5E6D3',
      isFavorite: false,
    },
    {
      id: '10',
      name: 'Camel Knit Sweater',
      subtitle: 'Soft Wool Blend',
      price: 'US$95',
      colors: ['#D2B48C', '#CD853F'],
      backgroundColor: '#D2B48C',
      isFavorite: false,
    },
    {
      id: '11',
      name: 'Neutral Tone Set',
      subtitle: 'Matching Top & Bottom',
      price: 'US$88',
      colors: ['#F5E6D3', '#E8D5C4', '#D2B48C'],
      backgroundColor: '#F5E6D3',
      isFavorite: false,
    },
    {
      id: '12',
      name: 'Beige Coordinated Look',
      subtitle: 'Two-Piece Ensemble',
      price: 'US$112',
      colors: ['#F5E6D3', '#E8D5C4'],
      backgroundColor: '#E8D5C4',
      isFavorite: false,
    },
  ],
};

const ChangeViewProducts = ({ navigation, category = 'Sale' }) => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [viewMode, setViewMode] = useState(0); // 0: default 2-column, 1: staggered view, 2: compact 3-column

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
    let imageHeight = 150;
    
    if (viewMode === 1) {
      // Staggered view
      cardStyle = [styles.productCard, styles.staggeredCard];
      // Alternate heights for staggered effect
      imageHeight = index % 3 === 1 ? 180 : 140;
    } else if (viewMode === 2) {
      // Compact 3-column view
      cardStyle = [styles.productCard, styles.compactCard];
      imageHeight = 120; // Smaller images for compact view
    }

    const isCompact = viewMode === 2;
    const isStaggered = viewMode === 1;

    return (
      <View style={cardStyle}>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item.id)}
        >
          <HeartIconSvg
            width={isCompact ? 16 : 20}
            height={isCompact ? 14 : 18}
            color={favorites.has(item.id) ? '#FF0000' : '#000000'}
          />
        </TouchableOpacity>
        
        <View style={[imageStyle, { height: imageHeight }]} />
        
        <View style={styles.productInfo}>
          <Text style={[
            styles.productName, 
            (isStaggered || isCompact) && styles.smallerText,
            isCompact && styles.compactText
          ]}>
            {item.name}
          </Text>
          <Text style={[
            styles.productSubtitle, 
            (isStaggered || isCompact) && styles.smallerText,
            isCompact && styles.compactText
          ]}>
            {item.subtitle}
          </Text>
          {!isCompact && renderColorDots(item.colors)}
          <View style={styles.priceContainer}>
            <Text style={[
              styles.productPrice, 
              (isStaggered || isCompact) && styles.smallerText,
              isCompact && styles.compactText
            ]}>
              {item.price}
            </Text>
            <TouchableOpacity style={styles.cartButton}>
              <CartIconSvg 
                width={isCompact ? 16 : 20} 
                height={isCompact ? 12 : 15} 
                color="#000000" 
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderGridView = () => {
    if (viewMode === 1) {
      // Staggered view - simplified approach
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
    } else if (viewMode === 2) {
      // Compact 3-column view
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
      <Text style={styles.debugText}>View Mode: {viewMode} ({viewMode === 0 ? '2-col' : viewMode === 1 ? 'staggered' : '3-col'})</Text>

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
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  staggeredCard: {
    width: (screenWidth - Spacing.md * 3) / 2,
    marginBottom: Spacing.md,
  },
  compactCard: {
    width: (screenWidth - Spacing.md * 2 - Spacing.sm * 2) / 3,
    marginBottom: Spacing.sm,
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
  },
  productSubtitle: {
    fontSize: FontSizes.xs,
    color: '#767676',
    marginBottom: Spacing.xs,
  },
  smallerText: {
    fontSize: FontSizes.xs * 0.9,
  },
  compactText: {
    fontSize: FontSizes.xs * 0.8,
    lineHeight: FontSizes.xs * 0.9,
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
  cartButton: {
    padding: Spacing.xs,
  },
});

export default ChangeViewProducts;
