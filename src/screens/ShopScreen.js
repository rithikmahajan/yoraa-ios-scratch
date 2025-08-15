import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Spacing, BorderRadius, Shadows } from '../constants';
import Svg, { Path } from 'react-native-svg';
import GlobalCartIcon from '../components/GlobalCartIcon';
import { HeartIcon } from '../assets/icons';

// SVG Icon Components
const BackIcon = ({ color = '#000000' }) => (
  <Svg width={10} height={17} viewBox="0 0 10 17" fill="none">
    <Path
      d="M8.5 16L1 8.5L8.5 1"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </Svg>
);

const SearchIcon = ({ color = '#262626' }) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M19.0002 19.0002L14.6572 14.6572M14.6572 14.6572C15.4001 13.9143 15.9894 13.0324 16.3914 12.0618C16.7935 11.0911 17.0004 10.0508 17.0004 9.00021C17.0004 7.9496 16.7935 6.90929 16.3914 5.93866C15.9894 4.96803 15.4001 4.08609 14.6572 3.34321C13.9143 2.60032 13.0324 2.01103 12.0618 1.60898C11.0911 1.20693 10.0508 1 9.00021 1C7.9496 1 6.90929 1.20693 5.93866 1.60898C4.96803 2.01103 4.08609 2.60032 3.34321 3.34321C1.84288 4.84354 1 6.87842 1 9.00021C1 11.122 1.84288 13.1569 3.34321 14.6572C4.84354 16.1575 6.87842 17.0004 9.00021 17.0004C11.122 17.0004 13.1569 16.1575 14.6572 14.6572Z"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </Svg>
);

// Sample data for new arrivals and trending now
const NEW_ARRIVALS = [
  {
    id: '1',
    name: 'Nike Dunk Low Premium',
    price: 'US$125',
    image: null, // Placeholder for product image
  },
  {
    id: '2',
    name: 'Nike Air Huarache Runner',
    price: 'US$140',
    image: null,
  },
  {
    id: '3',
    name: 'Adidas Ultraboost',
    price: 'US$180',
    image: null,
  },
];

const TRENDING_NOW = [
  {
    id: '1',
    name: 'Nike Life',
    price: 'US$180',
    image: null,
  },
  {
    id: '2',
    name: 'Nike Life',
    price: 'US$120',
    image: null,
  },
  {
    id: '3',
    name: 'Adidas Originals',
    price: 'US$160',
    image: null,
  },
];

const SALE_CATEGORIES = [
  {
    id: '1',
    name: 'T-Shirts',
    image: null,
  },
  {
    id: '2',
    name: 'Trousers',
    image: null,
  },
];

const TABS = ['Men', 'Women', 'Kids'];

const ShopScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('Men');
  const [favorites, setFavorites] = useState(new Set());

  const handleSearchPress = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate('Search');
    }
  };

  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
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

  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.productCard}>
      <View style={styles.productImageContainer}>
        <View style={styles.productImagePlaceholder} />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item.id)}
        >
          <HeartIcon size={21} filled={favorites.has(item.id)} />
        </TouchableOpacity>
        <GlobalCartIcon 
          size={16} 
          onPress={() => handleAddToCart(item.id)}
          containerStyle={styles.globalCartButton}
        />
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderSaleCategoryItem = ({ item }) => (
    <TouchableOpacity style={styles.saleCategoryCard}>
      <View style={styles.saleCategoryImagePlaceholder} />
      <View style={styles.saleCategoryOverlay}>
        <Text style={styles.saleCategoryText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderTab = (tab) => (
    <TouchableOpacity
      key={tab}
      style={styles.tabItem}
      onPress={() => setSelectedTab(tab)}
    >
      <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
        {tab}
      </Text>
      {selectedTab === tab && <View style={styles.tabIndicator} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header with back and search */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <BackIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearchPress}>
          <SearchIcon />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* New Arrivals Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>New Arrivals</Text>
          <FlatList
            data={NEW_ARRIVALS}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        {/* Trending Now Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending Now</Text>
          <FlatList
            data={TRENDING_NOW}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        {/* Sale Section */}
        <View style={styles.section}>
          <Text style={styles.saleTitle}>Sale</Text>
          
          {/* Tabs */}
          <View style={styles.tabContainer}>
            {TABS.map(renderTab)}
          </View>

          {/* Sale Categories */}
          <FlatList
            data={SALE_CATEGORIES}
            renderItem={renderSaleCategoryItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>
      </ScrollView>
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
    paddingHorizontal: Spacing.xl,
    paddingTop: 15, // Status bar height + padding
    paddingBottom: Spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
  },
  section: {
    marginBottom: 38,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000000',
    marginBottom: Spacing.lg,
    fontFamily: 'Montserrat-Medium',
  },
  saleTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#CA3327',
    marginBottom: Spacing.lg,
    fontFamily: 'Montserrat-Medium',
  },
  horizontalList: {
    paddingRight: Spacing.xl,
    gap: 6,
  },
  productCard: {
    width: 246,
    marginRight: 6,
  },
  productImageContainer: {
    position: 'relative',
    height: 246,
    backgroundColor: '#EEEEEE',
    borderRadius: BorderRadius.md,
    marginBottom: 12,
  },
  productImagePlaceholder: {
    flex: 1,
    borderRadius: BorderRadius.md,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 34,
    height: 34,
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.small,
  },
  globalCartButton: {
    bottom: 12,
    right: 12,
    width: 34,
    height: 34,
  },
  productInfo: {
    gap: 2,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    fontFamily: 'Montserrat-Medium',
    letterSpacing: -0.14,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '400',
    color: '#767676',
    fontFamily: 'Montserrat-Regular',
    letterSpacing: -0.14,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#CDCDCD',
    marginBottom: Spacing.lg,
  },
  tabItem: {
    paddingVertical: 12,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#767676',
    fontFamily: 'Montserrat-Medium',
    letterSpacing: -0.4,
    marginBottom: 16,
  },
  activeTabText: {
    color: '#000000',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#000000',
  },
  saleCategoryCard: {
    width: 246,
    height: 292,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    marginRight: 6,
    position: 'relative',
  },
  saleCategoryImagePlaceholder: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
  saleCategoryOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  saleCategoryText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Medium',
  },
});

export default ShopScreen;
