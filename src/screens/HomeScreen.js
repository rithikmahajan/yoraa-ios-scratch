
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { FontSizes, FontWeights, Spacing, BorderRadius } from '../constants';
import SearchIconSvg from '../assets/icons/SearchIconSvg';
import HeartIconSvg from '../assets/icons/HeartIconSvg';
import CartIconSvg from '../assets/icons/CartIconSvg';
import {
  GlobalShippingIcon,
  RiskFreePurchaseIcon,
  OnlineAssistanceIcon,
} from '../assets/icons';
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

  const renderCategoryItem = ({ item }) => {
    const ImageComponent = item.image;
    
    return (
      <TouchableOpacity
        style={[
          styles.categoryItem,
          activeCategory === item.id && styles.activeCategoryItem,
        ]}
        onPress={() => setActiveCategory(item.id)}
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
          <Text style={styles.arrowIcon}>›</Text>
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
          <TouchableOpacity style={styles.iconButton}>
            <HeartIconSvg width={23} height={21} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <CartIconSvg width={23} height={17} color="#000000" />
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

      {/* Info Section */}
      <View style={styles.infoSection}>
        <View style={styles.infoItem}>
          <View style={styles.infoImageContainer}>
            <GlobalShippingIcon width={80} height={80} color="#000000" />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>GLOBAL SHIPPING</Text>
            <Text style={styles.infoDescription}>
              We offer fast and reliable free shipping options both within India, ensuring your order reaches you in a timely manner.
            </Text>
          </View>
        </View>

        <View style={[styles.infoItem, styles.infoItemReverse]}>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>RISK-FREE PURCHASE</Text>
            <Text style={styles.infoDescription}>
              We offer 4 days to exchange or return your product, ensuring a seamless shopping experience for our valued customers.
            </Text>
          </View>
          <View style={styles.infoImageContainer}>
            <RiskFreePurchaseIcon width={80} height={80} color="#000000" />
          </View>
        </View>

        <View style={styles.infoItem}>
          <View style={styles.infoImageContainer}>
            <OnlineAssistanceIcon width={80} height={80} color="#000000" />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>ONLINE ASSISTANCE</Text>
            <Text style={styles.infoDescription}>
              Our friendly and knowledgeable customer support team is available to assist you with any queries.
            </Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerLogo}>
          <Text style={styles.footerLogoText}>YORAA</Text>
        </View>
        <Text style={styles.footerText}>Thanks for being with us.</Text>
      </View>
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
    paddingTop: 60, // Account for status bar
    paddingBottom: Spacing.md,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: FontWeights.medium,
    color: '#000000',
    letterSpacing: -0.168,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  iconButton: {
    padding: Spacing.xs,
  },

  // Tab Bar Styles
  tabBar: {
    borderBottomWidth: 1,
    borderBottomColor: '#CDCDCD',
    paddingHorizontal: Spacing.lg,
  },
  tabBarContent: {
    gap: Spacing.sm,
  },
  tabItem: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    position: 'relative',
  },
  activeTabItem: {
    // Active tab styles handled by indicator
  },
  tabText: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.medium,
    color: '#767676',
    letterSpacing: -0.4,
  },
  activeTabText: {
    color: '#000000',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: Spacing.lg,
    right: Spacing.lg,
    height: 2,
    backgroundColor: '#000000',
  },

  // Categories Styles
  categoriesList: {
    flex: 1,
    paddingTop: Spacing.xs, // Reduced padding to match Figma
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E4',
    backgroundColor: '#FFFFFF', // Explicit white background
  },
  activeCategoryItem: {
    backgroundColor: '#F8F8F8',
  },
  categoryImageContainer: {
    marginRight: Spacing.lg,
  },
  categoryContent: {
    flex: 1,
  },
  categoryName: {
    fontSize: 14,
    letterSpacing: -0.14,
    fontWeight: FontWeights.normal, // Ensure normal weight for non-sale items
  },
  categoryArrow: {
    marginLeft: Spacing.sm,
  },
  arrowIcon: {
    fontSize: 18, // Slightly smaller to match Figma
    color: '#292526',
    fontWeight: '300',
  },

  // Info Section Styles
  infoSection: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
    gap: Spacing.xxxl, // Increased gap to match Figma spacing
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Changed to flex-start for better text alignment
    gap: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  infoItemReverse: {
    flexDirection: 'row-reverse',
  },
  infoImageContainer: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoImagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#EEE',
    borderRadius: BorderRadius.md,
  },
  infoContent: {
    flex: 1,
    paddingTop: Spacing.xs, // Small padding to align with icon
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: FontWeights.bold,
    color: '#000000',
    marginBottom: Spacing.xs,
    letterSpacing: 0.5, // Added letter spacing for better readability
  },
  infoDescription: {
    fontSize: 12,
    color: '#000000',
    lineHeight: 20, // Reduced line height to match Figma more closely
  },

  // Footer Styles
  footer: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    paddingBottom: Spacing.xxxl, // Extra padding for bottom
  },
  footerLogo: {
    marginBottom: Spacing.lg,
  },
  footerLogoText: {
    fontSize: 20,
    fontWeight: FontWeights.bold,
    color: '#000000',
    letterSpacing: 1.5,
  },
  footerText: {
    fontSize: 14,
    fontWeight: FontWeights.medium,
    color: '#000000',
  },
});

export default HomeScreen;
