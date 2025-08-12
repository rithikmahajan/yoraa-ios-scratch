import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, FontWeights, FontFamilies, Spacing, Shadows } from '../constants';
import {
  HomeIcon,
  ShopIcon,
  CollectionIcon,
  RewardsIcon,
  ProfileIcon,
} from '../assets/icons';

const BottomNavigationBar = ({ activeTab = 'Home', onTabChange }) => {
  const [internalActiveTab, setInternalActiveTab] = useState('Home');
  const insets = useSafeAreaInsets();
  
  // Use external activeTab if provided, otherwise use internal state
  const currentActiveTab = activeTab || internalActiveTab;

  const tabs = [
    {
      name: 'Home',
      label: 'Home',
      icon: HomeIcon,
    },
    {
      name: 'Shop',
      label: 'Shop',
      icon: ShopIcon,
    },
    {
      name: 'Collection',
      label: 'Collection',
      icon: CollectionIcon,
    },
    {
      name: 'Rewards',
      label: 'Rewards',
      icon: RewardsIcon,
    },
    {
      name: 'Profile',
      label: 'Profile',
      icon: ProfileIcon,
    },
  ];

  const handleTabPress = (tabName) => {
    // Update internal state if no external handler provided
    if (!onTabChange) {
      setInternalActiveTab(tabName);
    } else {
      // Use external handler
      onTabChange(tabName);
    }
    // Log the tab change but stay on the same page as requested
    console.log(`Tab selected: ${tabName} - staying on the same page`);
  };

      return (
        <View style={styles.container}>
          <View style={[
            styles.navigationBar, 
            { 
              paddingBottom: Platform.OS === 'ios' ? Math.max(insets.bottom, 20) : 10 
            }
          ]}>
            {tabs.map((tab) => {
              const isActive = currentActiveTab === tab.name;
              
              return (
            <TouchableOpacity
              key={tab.name}
              style={styles.tabButton}
              onPress={() => handleTabPress(tab.name)}
              activeOpacity={0.7}
            >
              <tab.icon 
                active={isActive} 
                color={isActive ? Colors.primary : Colors.textTertiary}
                size={24}
              />
              <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
                {tab.label}
              </Text>
              {isActive && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    ...Shadows.medium,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  navigationBar: {
    flexDirection: 'row',
    backgroundColor: Colors.background,
    paddingTop: Spacing.lg,
    paddingHorizontal: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    minHeight: 70,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xs,
    position: 'relative',
    minHeight: 50,
  },
  tabLabel: {
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.medium,
    fontFamily: FontFamilies.medium,
    color: Colors.textTertiary,
    marginTop: Spacing.xs,
    textAlign: 'center',
  },
  activeTabLabel: {
    color: Colors.primary,
    fontWeight: FontWeights.semiBold,
    fontFamily: FontFamilies.semiBold,
  },
  activeIndicator: {
    position: 'absolute',
    top: 2,
    width: 24,
    height: 3,
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
});

export default BottomNavigationBar;
