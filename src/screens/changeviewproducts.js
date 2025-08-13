import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';
import { FontSizes, FontWeights, Spacing } from '../constants';
import SearchIconSvg from '../assets/icons/SearchIconSvg';
import HeartIconSvg from '../assets/icons/HeartIconSvg';
import CartIconSvg from '../assets/icons/CartIconSvg';
import GridViewIcon from '../assets/icons/GridViewIcon';
import FilterIconNew from '../assets/icons/FilterIconNew';

const { width: screenWidth } = Dimensions.get('window');

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

  useEffect(() => {
    // Set products based on category
    const categoryProducts = productData[category] || productData.Sale;
    setProducts(categoryProducts);
  }, [category]);

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

  const renderProductCard = ({ item }) => {
    const imageStyle = [
      styles.productImage, 
      { backgroundColor: item.backgroundColor },
      item.backgroundColor === '#FFFFFF' && styles.whiteProductImage,
    ];

    return (
      <View style={styles.productCard}>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item.id)}
        >
          <HeartIconSvg
            width={20}
            height={18}
            color={favorites.has(item.id) ? '#FF0000' : '#000000'}
          />
        </TouchableOpacity>
        
        <View style={imageStyle} />
        
        <View style={styles.productInfo}>
          <Text style={styles.productName}>
            {item.name}
          </Text>
          <Text style={styles.productSubtitle}>
            {item.subtitle}
          </Text>
          {renderColorDots(item.colors)}
          <View style={styles.priceContainer}>
            <Text style={styles.productPrice}>
              {item.price}
            </Text>
            <TouchableOpacity style={styles.cartButton}>
              <CartIconSvg 
                width={20} 
                height={15} 
                color="#000000" 
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
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
          <TouchableOpacity style={styles.iconButton}>
            <GridViewIcon width={24} height={24} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <FilterIconNew width={24} height={24} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Product Grid */}
      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={renderProductCard}
        contentContainerStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
      />
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
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xs,
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
