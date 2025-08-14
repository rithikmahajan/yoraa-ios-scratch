import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import BackButton from './BackButton';

// YORAA Fashion App Top Navigation Bar Component
const TopNavigationBar = ({ 
  title = "YORAA", 
  showBackButton = false, 
  onBackPress = () => {},
  showSearchIcon = true,
  showNotificationIcon = true,
  showProfileIcon = true,
  onSearchPress = () => {},
  onNotificationPress = () => {},
  onProfilePress = () => {},
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Left Section */}
        <View style={styles.leftSection}>
          {showBackButton ? (
            <BackButton onPress={onBackPress} style={styles.iconButton} />
          ) : (
            <TouchableOpacity style={styles.menuButton} activeOpacity={0.7}>
              <View style={styles.menuLine} />
              <View style={styles.menuLine} />
              <View style={styles.menuLine} />
            </TouchableOpacity>
          )}
        </View>

        {/* Center Section - Logo/Title */}
        <View style={styles.centerSection}>
          <Text style={styles.logo}>{title}</Text>
        </View>

        {/* Right Section - Action Icons */}
        <View style={styles.rightSection}>
          {showSearchIcon && (
            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={onSearchPress}
              activeOpacity={0.7}
            >
              <View style={styles.searchIcon}>
                <View style={styles.searchCircle} />
                <View style={styles.searchHandle} />
              </View>
            </TouchableOpacity>
          )}
          
          {showNotificationIcon && (
            <TouchableOpacity 
              style={[styles.iconButton, styles.notificationButton]} 
              onPress={onNotificationPress}
              activeOpacity={0.7}
            >
              <View style={styles.bellIcon}>
                <View style={styles.bellBody} />
                <View style={styles.bellClapper} />
              </View>
              {/* Notification Badge */}
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>2</Text>
              </View>
            </TouchableOpacity>
          )}
          
          {showProfileIcon && (
            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={onProfilePress}
              activeOpacity={0.7}
            >
              <View style={styles.profileIcon}>
                <View style={styles.profileHead} />
                <View style={styles.profileBody} />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      {/* Elegant Separator Line */}
      <View style={styles.separatorContainer}>
        <View style={styles.separator} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    height: 70,
  },
  leftSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 2,
    alignItems: 'center',
  },
  rightSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 10,
    color: '#888888',
    marginTop: 2,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  menuButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  menuLine: {
    width: 20,
    height: 2,
    backgroundColor: '#1A1A1A',
    marginVertical: 2,
    borderRadius: 1,
  },
  
  searchIcon: {
    width: 20,
    height: 20,
    position: 'relative',
  },
  searchCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#1A1A1A',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  searchHandle: {
    width: 8,
    height: 2,
    backgroundColor: '#1A1A1A',
    position: 'absolute',
    bottom: 2,
    right: 0,
    transform: [{ rotate: '45deg' }],
    borderRadius: 1,
  },
  bellIcon: {
    width: 18,
    height: 20,
    position: 'relative',
  },
  bellBody: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#1A1A1A',
    borderBottomWidth: 0,
    position: 'absolute',
    top: 2,
    left: 1,
  },
  bellClapper: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#1A1A1A',
    position: 'absolute',
    bottom: 6,
    left: 7,
  },
  profileIcon: {
    width: 20,
    height: 20,
    position: 'relative',
  },
  profileHead: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#1A1A1A',
    position: 'absolute',
    top: 0,
    left: 6,
  },
  profileBody: {
    width: 16,
    height: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderWidth: 2,
    borderColor: '#1A1A1A',
    borderBottomWidth: 0,
    position: 'absolute',
    bottom: 0,
    left: 2,
  },
  notificationButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  separatorContainer: {
    paddingHorizontal: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },
});

export default TopNavigationBar;