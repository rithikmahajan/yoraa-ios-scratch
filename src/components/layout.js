import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import BottomNavigationBar from './bottomnavigationbar';
import { Colors, FontSizes, FontWeights, Spacing } from '../constants';
import { HomeScreen, ShopScreen, CollectionScreen, RewardsScreen, ProfileScreen, SearchScreen, OrdersScreen, EditProfile, SettingsScreen, DeliveryAddressesSettings, CommunicationPreferences, LinkedAccountScreen, DeleteAccount, ProfileVisibilityScreen, ContactUsScreen, InvoiceScreen, LoveUsRateUs, FAQScreen, ScanBarcodeFlow, FavouritesScreen, ChangeViewProducts, ProductDetailScreen, ReviewsScreen, BuyNowScreen, SizeChartScreen } from '../screens';

// Navigation context for handling screen navigation
const createNavigation = (setCurrentScreen, setActiveTab, navigationHistory, setNavigationHistory) => ({
  navigate: (screenName, params) => {
    if (['Home', 'Shop', 'Collection', 'Rewards', 'Profile'].includes(screenName)) {
      setActiveTab(screenName);
      setCurrentScreen(screenName);
      // Update navigation history
      setNavigationHistory({ previousScreen: navigationHistory.currentScreen, currentScreen: screenName });
    } else {
      // For non-tab screens like Search, remember where we came from
      setCurrentScreen(screenName);
      setNavigationHistory({ previousScreen: navigationHistory.currentScreen, currentScreen: screenName, params });
    }
  },
  goBack: () => {
    // Go back to the previous screen
    const targetScreen = navigationHistory.previousScreen || 'Home';
    setCurrentScreen(targetScreen);
    if (['Home', 'Shop', 'Collection', 'Rewards', 'Profile'].includes(targetScreen)) {
      setActiveTab(targetScreen);
    }
    setNavigationHistory({ previousScreen: 'Home', currentScreen: targetScreen });
  },
});

// Placeholder content components for each tab
const HomeContent = ({ navigation }) => <HomeScreen navigation={navigation} />;
const ShopContent = ({ navigation }) => <ShopScreen navigation={navigation} />;
const CollectionContent = ({ navigation }) => <CollectionScreen navigation={navigation} />;
const RewardsContent = () => <RewardsScreen />;
const ProfileContent = ({ navigation }) => <ProfileScreen navigation={navigation} />;

// Enhanced Layout with improved navigation handling
const EnhancedLayout = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [navigationHistory, setNavigationHistory] = useState({ previousScreen: 'Home', currentScreen: 'Home' });
  const [headerTitle, setHeaderTitle] = useState('YORAA');

  const navigation = createNavigation(setCurrentScreen, setActiveTab, navigationHistory, setNavigationHistory);

  const handleTabChange = (tabName) => {
    setNavigationHistory({ previousScreen: activeTab, currentScreen: tabName });
    setActiveTab(tabName);
    setCurrentScreen(tabName);
    setHeaderTitle(tabName === 'Home' ? 'YORAA' : tabName);
  };

  const renderContent = () => {
    switch (currentScreen) {
      case 'Home':
        return <HomeContent navigation={navigation} />;
      case 'Shop':
        return <ShopContent navigation={navigation} />;
      case 'Collection':
        return <CollectionContent navigation={navigation} />;
      case 'Rewards':
        return <RewardsContent />;
      case 'Profile':
        return <ProfileContent navigation={navigation} />;
      case 'Orders':
        return <OrdersScreen navigation={navigation} />;
      case 'EditProfile':
        return <EditProfile navigation={navigation} />;
      case 'Settings':
        return <SettingsScreen navigation={navigation} />;
      case 'DeliveryAddressesSettings':
        return <DeliveryAddressesSettings navigation={navigation} />;
      case 'CommunicationPreferences':
        return <CommunicationPreferences navigation={navigation} />;
      case 'ProfileVisibilityScreen':
        return <ProfileVisibilityScreen navigation={navigation} />;
      case 'LinkedAccount':
        return <LinkedAccountScreen navigation={navigation} />;
      case 'DeleteAccount':
        return <DeleteAccount navigation={navigation} />;
      case 'ContactUs':
        return <ContactUsScreen navigation={navigation} />;
      case 'Search':
        return <SearchScreen navigation={navigation} onClose={() => navigation.goBack()} />;
      case 'ScanBarcode':
        return <ScanBarcodeFlow navigation={navigation} />;
      case 'Invoice':
        return <InvoiceScreen navigation={navigation} />;
      case 'LoveUsRateUs':
        return <LoveUsRateUs navigation={navigation} />;
      case 'FAQ':
        return <FAQScreen navigation={navigation} />;
      case 'Favourites':
        return <FavouritesScreen navigation={navigation} />;
      case 'ChangeViewProducts':
        return <ChangeViewProducts navigation={navigation} category={navigationHistory.params?.category} />;
      case 'ProductDetail':
        return <ProductDetailScreen navigation={navigation} route={{ params: navigationHistory.params }} />;
      case 'Reviews':
        return <ReviewsScreen navigation={navigation} route={{ params: navigationHistory.params }} />;
      case 'BuyNow':
        return <BuyNowScreen navigation={navigation} route={{ params: navigationHistory.params }} />;
      case 'SizeChart':
        return <SizeChartScreen navigation={navigation} route={{ params: navigationHistory.params }} />;
      default:
        return <HomeContent />;
    }
  };

  const shouldShowBottomNav = ['Home', 'Shop', 'Collection', 'Rewards', 'Profile'].includes(currentScreen);
  const shouldShowHeader = ['Rewards', 'Profile'].includes(currentScreen);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        
        {/* Dynamic Header - Only show for main tabs except Collection */}
        {shouldShowHeader && (
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{headerTitle}</Text>
          </View>
        )}

        {/* Main Content Area */}
        <View style={[styles.mainContent, shouldShowBottomNav && styles.mainContentWithBottomNav]}>
          {renderContent()}
        </View>
      </SafeAreaView>

      {/* Bottom Navigation - Fixed at bottom */}
      {shouldShowBottomNav && (
        <BottomNavigationBar 
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  headerTitle: {
    fontSize: FontSizes.xxxl,
    fontWeight: FontWeights.bold,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.xs,
    fontWeight: FontWeights.medium,
  },
  mainContent: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
  mainContentWithBottomNav: {
    paddingBottom: 0, // Remove padding since we're not using absolute positioning
  },
});

export { EnhancedLayout };
export default EnhancedLayout;
