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
import { HomeScreen, ShopScreen, CollectionScreen, RewardsScreen, ProfileScreen, OrdersScreen, EditProfile, SettingsScreen, DeliveryAddressesSettings, CommunicationPreferences, LinkedAccountScreen, DeleteAccount, ProfileVisibilityScreen, ContactUsScreen, InvoiceScreen, LoveUsRateUs, FAQScreen } from '../screens';

// Navigation context for handling screen navigation
const createNavigation = (setCurrentScreen, setActiveTab) => ({
  navigate: (screenName, params) => {
    if (['Home', 'Shop', 'Collection', 'Rewards', 'Profile'].includes(screenName)) {
      setActiveTab(screenName);
      setCurrentScreen(screenName);
    } else {
      setCurrentScreen(screenName);
    }
  },
  goBack: () => {
    setCurrentScreen('Profile');
    setActiveTab('Profile');
  },
});

// Placeholder content components for each tab
const HomeContent = () => <HomeScreen />;
const ShopContent = () => <ShopScreen />;
const CollectionContent = () => <CollectionScreen />;
const RewardsContent = () => <RewardsScreen />;
const ProfileContent = ({ navigation }) => <ProfileScreen navigation={navigation} />;

// Enhanced Layout with improved navigation handling
const EnhancedLayout = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [headerTitle, setHeaderTitle] = useState('YORAA');

  const navigation = createNavigation(setCurrentScreen, setActiveTab);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setCurrentScreen(tabName);
    setHeaderTitle(tabName === 'Home' ? 'YORAA' : tabName);
  };

  const renderContent = () => {
    switch (currentScreen) {
      case 'Home':
        return <HomeContent />;
      case 'Shop':
        return <ShopContent />;
      case 'Collection':
        return <CollectionContent />;
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
      case 'Invoice':
        return <InvoiceScreen navigation={navigation} />;
      case 'LoveUsRateUs':
        return <LoveUsRateUs navigation={navigation} />;
      case 'FAQ':
        return <FAQScreen navigation={navigation} />;
      default:
        return <HomeContent />;
    }
  };

  const shouldShowBottomNav = ['Home', 'Shop', 'Collection', 'Rewards', 'Profile'].includes(currentScreen);
  const shouldShowHeader = ['Home', 'Rewards', 'Profile'].includes(currentScreen);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        
        {/* Dynamic Header - Only show for main tabs except Collection */}
        {shouldShowHeader && (
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{headerTitle}</Text>
            {activeTab === 'Home' && (
              <Text style={styles.headerSubtitle}>Fashion Forward</Text>
            )}
          </View>
        )}

        {/* Main Content Area */}
        <View style={styles.mainContent}>
          {renderContent()}
        </View>
      </SafeAreaView>

      {/* Bottom Navigation - Only show for main tabs */}
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
});

export { EnhancedLayout };
export default EnhancedLayout;
