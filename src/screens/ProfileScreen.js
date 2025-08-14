import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import LogoutModal from './logoutmodal';
import ContactUsScreen from './contactus';
import { ForwardArrowIcon, OrdersIconNew, ContactUsIcon, SettingsIconNew } from '../assets/icons';

// Updated icon components using the new Figma-based SVG icons
const OrdersIcon = () => (
  <OrdersIconNew width={24} height={24} color="#000000" />
);

const ContactIcon = () => (
  <ContactUsIcon width={24} height={24} color="#000000" />
);

const SettingsIcon = () => (
  <SettingsIconNew width={18} height={18} color="#000000" />
);

const ProfileScreen = ({ navigation }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showContactUsModal, setShowContactUsModal] = useState(false);

  const handleEditProfile = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate('EditProfile');
    }
  };

  const handleOrders = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate('Orders');
    }
  };

  const handleContactUs = () => {
    setShowContactUsModal(true);
  };

  const handleSettings = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate('Settings');
    }
  };

  const handleInbox = () => {
    console.log('Inbox pressed');
  };

  const handleFAQ = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate('FAQ');
    }
  };

  const handleInvoices = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate('Invoice');
    }
  };

  const handleLoveUs = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate('LoveUsRateUs');
    }
  };

  const handleInviteFriend = () => {
    console.log('Invite a friend pressed');
  };

  const handlePrivacyPolicy = () => {
    console.log('Privacy policy pressed');
  };

  const handleTermsConditions = () => {
    console.log('T&C pressed');
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const handleCloseLogoutModal = () => {
    setShowLogoutModal(false);
  };

  const handleSignOut = () => {
    setShowLogoutModal(false);
    // Add your sign out logic here
    console.log('User signed out');
    // For example: navigation.navigate('Login') or clear user session
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Step 1: Client Name */}
        <View style={styles.headerContainer}>
          <Text style={styles.clientName}>John Smith</Text>
          <TouchableOpacity style={styles.editProfileButton} onPress={handleEditProfile}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Step 2: Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={handleOrders}>
            <OrdersIcon />
            <Text style={styles.actionButtonText}>Orders</Text>
          </TouchableOpacity>
          
          <View style={styles.actionDivider} />
          
          <TouchableOpacity style={styles.actionButton} onPress={handleContactUs}>
            <ContactIcon />
            <Text style={styles.actionButtonText}>Contact Us</Text>
          </TouchableOpacity>
          
          <View style={styles.actionDivider} />
          
          <TouchableOpacity style={styles.actionButton} onPress={handleSettings}>
            <SettingsIcon />
            <Text style={styles.actionButtonText}>Settings</Text>
          </TouchableOpacity>
        </View>

        {/* Step 3: Menu Items with Arrows */}
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={handleInbox}>
            <View style={styles.menuItemLeft}>
              <Text style={styles.menuItemTitle}>Inbox</Text>
              <Text style={styles.menuItemSubtitle}>View message</Text>
            </View>
            <ForwardArrowIcon color="#999999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleFAQ}>
            <View style={styles.menuItemLeft}>
              <Text style={styles.menuItemTitle}>FAQ</Text>
              <Text style={styles.menuItemSubtitle}>View queries</Text>
            </View>
            <ForwardArrowIcon color="#999999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleInvoices}>
            <View style={styles.menuItemLeft}>
              <Text style={styles.menuItemTitle}>Invoices</Text>
            </View>
            <ForwardArrowIcon color="#999999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleLoveUs}>
            <View style={styles.menuItemLeft}>
              <Text style={styles.menuItemTitle}>Love Us rate Us</Text>
            </View>
            <ForwardArrowIcon color="#999999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleInviteFriend}>
            <View style={styles.menuItemLeft}>
              <Text style={styles.menuItemTitle}>Invite a friend</Text>
            </View>
            <ForwardArrowIcon color="#999999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handlePrivacyPolicy}>
            <View style={styles.menuItemLeft}>
              <Text style={styles.menuItemTitle}>Privacy policy</Text>
            </View>
            <ForwardArrowIcon color="#999999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleTermsConditions}>
            <View style={styles.menuItemLeft}>
              <Text style={styles.menuItemTitle}>T&C</Text>
            </View>
            <ForwardArrowIcon color="#999999" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, styles.lastMenuItem]} onPress={handleLogout}>
            <View style={styles.menuItemLeft}>
              <Text style={styles.menuItemTitle}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      <LogoutModal
        visible={showLogoutModal}
        onClose={handleCloseLogoutModal}
        onSignOut={handleSignOut}
      />
      
      <ContactUsScreen
        visible={showContactUsModal}
        navigation={{ goBack: () => setShowContactUsModal(false) }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flex: 1,
  },
  
  // Header Styles
  headerContainer: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 24,
  },
  clientName: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 30,
    fontFamily: 'Montserrat-Medium',
  },
  editProfileButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 100,
    paddingHorizontal: 51,
    paddingVertical: 16,
  },
  editProfileText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    fontFamily: 'Montserrat-Medium',
  },

  // Actions Container
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 34,
  },
  actionButton: {
    alignItems: 'center',
    flex: 1,
  },
  actionDivider: {
    width: 1,
    height: 31,
    backgroundColor: '#000000',
    marginHorizontal: 0,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000000',
    marginTop: 10,
    fontFamily: 'Montserrat-Regular',
    letterSpacing: -0.3,
  },

  // Menu Styles
  menuContainer: {
    paddingHorizontal: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 21,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E4',
  },
  lastMenuItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E4',
  },
  menuItemLeft: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 6,
    fontFamily: 'Montserrat-Medium',
  },
  menuItemSubtitle: {
    fontSize: 12,
    color: '#767676',
    fontFamily: 'Montserrat-Regular',
    letterSpacing: -0.3,
  },
});

export default ProfileScreen;