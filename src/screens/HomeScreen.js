
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { FontWeights, Spacing } from '../constants';
import SearchIconSvg from '../assets/icons/SearchIconSvg';
import HeartIconSvg from '../assets/icons/HeartIconSvg';
import { GlobalShoppingBagIcon, ForwardArrowIcon } from '../assets/icons';
import {
  SaleImageSvg,
  LifestyleImageSvg,
  RunningImageSvg,
  SoccerImageSvg,
  TennisImageSvg,
  GolfImageSvg,
} from '../assets/images';

const HomeScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('My');
  const [activeCategory, setActiveCategory] = useState('Sale');

  const handleSearchPress = () => {
    if (navigation) {
      navigation.navigate('Search');
    }
  };

  const handleFavoritesPress = () => {
    if (navigation) {
      navigation.navigate('Favourites');
    }
  };

  const handleCartPress = () => {
    if (navigation) {
      navigation.navigate('Bag');
    }
  };

  const mainTabs = [
    { id: 'My', name: 'My' },
    { id: 'Men', name: 'Men' },
    { id: 'Women', name: 'Women' },
    { id: 'Kids', name: 'Kids' },
    { id: 'EyX', name: 'EyX' },
  ];

  const categories = [
    { id: 'Sale', name: 'Sale', color: '#CA3327', image: SaleImageSvg, fontWeight: FontWeights.semiBold },
    { id: 'Lifestyle', name: 'Lifestyle', color: '#000000', image: LifestyleImageSvg, fontWeight: FontWeights.normal },
    { id: 'Running', name: 'Running', color: '#000000', image: RunningImageSvg, fontWeight: FontWeights.normal },
    { id: 'Soccer', name: 'Soccer', color: '#000000', image: SoccerImageSvg, fontWeight: FontWeights.normal },
    { id: 'Tennis', name: 'Tennis', color: '#000000', image: TennisImageSvg, fontWeight: FontWeights.normal },
    { id: 'Golf', name: 'Golf', color: '#000000', image: GolfImageSvg, fontWeight: FontWeights.normal },
  ];

  const renderTabItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.tabItem,
        activeTab === item.id && styles.activeTabItem,
      ]}
      onPress={() => setActiveTab(item.id)}
    >
      <Text
        style={[
          styles.tabText,
          activeTab === item.id && styles.activeTabText,
        ]}
      >
        {item.name}
      </Text>
      {activeTab === item.id && <View style={styles.tabIndicator} />}
    </TouchableOpacity>
  );

  const handleCategoryPress = (categoryId) => {
    setActiveCategory(categoryId);
    if (navigation) {
      navigation.navigate('ChangeViewProducts', { category: categoryId });
    }
  };

  const renderCategoryItem = ({ item }) => {
    const ImageComponent = item.image;
    
    return (
      <TouchableOpacity
        style={[
          styles.categoryItem,
          activeCategory === item.id && styles.activeCategoryItem,
        ]}
        onPress={() => handleCategoryPress(item.id)}
      >
        <View style={styles.categoryImageContainer}>
          <ImageComponent width={70} height={70} />
        </View>
        <View style={styles.categoryContent}>
          <Text style={[
            styles.categoryName, 
            { 
              color: item.color,
              fontWeight: item.fontWeight || FontWeights.normal
            }
          ]}>
            {item.name}
          </Text>
        </View>
        <View style={styles.categoryArrow}>
          <ForwardArrowIcon width={14} height={14} color="#292526" strokeWidth={2} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shop</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton} onPress={handleSearchPress}>
            <SearchIconSvg width={24} height={24} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleFavoritesPress}>
            <HeartIconSvg width={23} height={21} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleCartPress}>
            <GlobalShoppingBagIcon width={23} height={23} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <FlatList
          data={mainTabs}
          renderItem={renderTabItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabBarContent}
        />
      </View>

      {/* Categories List */}
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        style={styles.categoriesList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  
  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: 15, // Reduced from 60 to bring content higher
    paddingBottom: Spacing.md, // Reduced from Spacing.lg to tighten spacing
  },
  headerTitle: {
    fontSize: 32, // Increased font size to match Figma
    fontWeight: FontWeights.medium,
    color: '#000000',
    letterSpacing: -0.32,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg, // Increased gap between icons
  },
  iconButton: {
    padding: Spacing.xs,
  },

  // Tab Bar Styles
  tabBar: {
    borderBottomWidth: 1,
    borderBottomColor: '#CDCDCD',
    paddingHorizontal: Spacing.lg,
    marginBottom: 0, // Remove margin to reduce spacing
  },
  tabBarContent: {
    gap: Spacing.lg, // Increased gap between tabs
  },
  tabItem: {
    paddingVertical: Spacing.md, // Reduced from Spacing.lg to compact the tabs
    paddingHorizontal: Spacing.sm,
    position: 'relative',
  },
  activeTabItem: {
    // Active tab styles handled by indicator
  },
  tabText: {
    fontSize: 16, // Increased font size
    fontWeight: FontWeights.medium,
    color: '#767676',
    letterSpacing: -0.32,
  },
  activeTabText: {
    color: '#000000',
    fontWeight: FontWeights.semiBold, // Made active tab bolder
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: Spacing.sm,
    right: Spacing.sm,
    height: 2,
    backgroundColor: '#000000',
  },

  // Categories Styles
  categoriesList: {
    flex: 1,
    paddingTop: 0, // Remove top padding to bring content higher
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: 20, // Increased vertical padding to match Figma
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E4',
    backgroundColor: '#FFFFFF',
    minHeight: 90, // Ensure consistent height
  },
  activeCategoryItem: {
    backgroundColor: '#F8F8F8',
  },
  categoryImageContainer: {
    marginRight: Spacing.lg,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryContent: {
    flex: 1,
    justifyContent: 'center',
  },
  categoryName: {
    fontSize: 16, // Increased font size to match Figma
    letterSpacing: -0.16,
    fontWeight: FontWeights.normal,
    lineHeight: 24, // Added line height for better spacing
  },
  categoryArrow: {
    marginLeft: Spacing.sm,
    padding: Spacing.xs, // Added padding for better touch target
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
