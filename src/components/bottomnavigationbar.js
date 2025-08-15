import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontWeights, FontFamilies, Spacing } from '../constants';
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
              paddingBottom: Platform.OS === 'ios' ? Math.max(insets.bottom,12) : 6 
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
                color={isActive ? '#FF6B6B' : '#8E8E93'}
                size={20}
              />
              <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent', // Completely transparent for seamless integration
  },
  navigationBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.98)', // Slightly transparent white for modern look
    paddingTop: 12, // Clean minimal padding
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.sm,
    borderTopWidth: 0.5, // Very subtle separation
    borderTopColor: 'rgba(229, 229, 229, 0.6)', // Subtle border
    minHeight: 56, // Optimal height for clean look
    // Add subtle backdrop blur effect for iOS
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.02,
        shadowRadius: 8,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6, // Minimal padding
    position: 'relative',
    minHeight: 36,
  },
  tabLabel: {
    fontSize: 11, // Clean, minimal font size
    fontWeight: FontWeights.normal,
    fontFamily: FontFamilies.medium,
    color: '#8E8E93', // iOS-style gray
    marginTop: 3, // Tight spacing
    textAlign: 'center',
    letterSpacing: -0.1, // Better kerning
    lineHeight: 14, // Clean line height
  },
  activeTabLabel: {
    color: '#FF6B6B', // Brand primary for active
    fontWeight: FontWeights.medium,
    fontFamily: FontFamilies.medium,
  },
  activeIndicator: {
    display: 'none', // Keep removed for H&M style
  },
});

export default BottomNavigationBar;
