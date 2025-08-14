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

// Arrow Icon Component - Simple Chevron style to match Figma
const ArrowIcon = () => (
  <View style={styles.arrowIcon}>
    <Text style={styles.chevronText}>〉</Text>
  </View>
);

// Icon Components
const OrdersIcon = () => (
  <View style={styles.iconContainer}>
    {/* Main container representing the document/order */}
    <View style={styles.ordersMainContainer}>
      {/* Top section (header area) */}
      <View style={styles.ordersHeader} />
      {/* Content area with line */}
      <View style={styles.ordersContent}>
        <View style={styles.ordersContentLine} />
      </View>
    </View>
  </View>
);

const ContactIcon = () => (
  <View style={styles.iconContainer}>
    <View style={styles.contactCircle} />
    <View style={styles.contactLine1} />
    <View style={styles.contactLine2} />
  </View>
);

const SettingsIcon = () => (
  <View style={styles.iconContainer}>
    <View style={styles.settingsGear} />
    <View style={styles.settingsCenter} />
  </View>
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
            <ArrowIcon />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleFAQ}>
            <View style={styles.menuItemLeft}>
              <Text style={styles.menuItemTitle}>FAQ</Text>
              <Text style={styles.menuItemSubtitle}>View queries</Text>
            </View>
            <ArrowIcon />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleInvoices}>
            <View style={styles.menuItemLeft}>
              <Text style={styles.menuItemTitle}>Invoices</Text>
            </View>
            <ArrowIcon />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleLoveUs}>
            <View style={styles.menuItemLeft}>
              <Text style={styles.menuItemTitle}>Love Us rate Us</Text>
            </View>
            <ArrowIcon />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleInviteFriend}>
            <View style={styles.menuItemLeft}>
              <Text style={styles.menuItemTitle}>Invite a friend</Text>
            </View>
            <ArrowIcon />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handlePrivacyPolicy}>
            <View style={styles.menuItemLeft}>
              <Text style={styles.menuItemTitle}>Privacy policy</Text>
            </View>
            <ArrowIcon />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleTermsConditions}>
            <View style={styles.menuItemLeft}>
              <Text style={styles.menuItemTitle}>T&C</Text>
            </View>
            <ArrowIcon />
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
    paddingTop: 40,
    paddingBottom: 32,
    paddingHorizontal: 24,
  },
  clientName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 24,
  },
  editProfileButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 24,
    paddingHorizontal: 40,
    paddingVertical: 12,
  },
  editProfileText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },

  // Actions Container
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  actionButton: {
    alignItems: 'center',
    flex: 1,
  },
  actionDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 16,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginTop: 8,
  },

  // Icon Styles
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  ordersMainContainer: {
    width: 20,
    height: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#000000',
    borderRadius: 2,
    overflow: 'hidden',
  },
  ordersHeader: {
    width: '100%',
    height: 5,
    backgroundColor: '#000000',
  },
  ordersContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  ordersContentLine: {
    width: '80%',
    height: 1.5,
    backgroundColor: '#000000',
    borderRadius: 0.5,
  },
  contactCircle: {
    width: 16,
    height: 16,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 8,
  },
  contactLine1: {
    position: 'absolute',
    width: 8,
    height: 2,
    backgroundColor: '#000000',
    top: 6,
    left: 4,
  },
  contactLine2: {
    position: 'absolute',
    width: 6,
    height: 2,
    backgroundColor: '#000000',
    top: 10,
    left: 5,
  },
  settingsGear: {
    width: 20,
    height: 20,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 10,
  },
  settingsCenter: {
    position: 'absolute',
    width: 8,
    height: 8,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 4,
  },

  // Menu Styles
  menuContainer: {
    paddingHorizontal: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: '#666666',
  },

  // Arrow Icon
  // Arrow Icon - Simple Chevron
  arrowIcon: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chevronText: {
    fontSize: 14,
    color: '#999999',
    fontWeight: '400',
  },
});

export default ProfileScreen;