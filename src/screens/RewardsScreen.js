import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  SafeAreaView,
  Modal,
} from 'react-native';
import AuthenticationFlow from './authenticationflow';
import { ForwardArrowIcon } from '../assets/icons';

// Sample user data
const USER_POINTS = {
  current: 100,
  used: 0,
  level: 'bronze', // bronze, silver, gold, platinum, black
};

const LEVELS = [
  { name: 'bronze', points: 100, color: '#CD7F32' },
  { name: 'silver', points: 200, color: '#C0C0C0' },
  { name: 'gold', points: 300, color: '#FFD700' },
  { name: 'platinum', points: 400, color: '#E5E4E2' },
  { name: 'black', points: 500, color: '#000000' },
];

const SHOPPING_PREFERENCES = ['Women', 'Men'];
const ADDITIONAL_PREFERENCES = ['Boy', 'Women', 'Mens', 'Girls'];

const RewardsScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('giveaways'); // Default to giveaways as per requirement
  const [selectedShoppingPreference, setSelectedShoppingPreference] = useState('Women');
  const [selectedAdditionalPreferences, setSelectedAdditionalPreferences] = useState(['Boy']);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  const handleLanguagePress = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate('Language');
    }
  };

  const handleCreateAccount = () => {
    setShowAuthModal(true);
  };

  const handleSignIn = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate('LoginScreen');
    }
  };

  const handleAuthSkip = () => {
    setShowAuthModal(false);
  };

  const handleAuthSuccess = (type, data) => {
    setShowAuthModal(false);
    console.log('Authentication successful:', type, data);
    // Handle successful authentication here
    // You might want to update user state, navigate to another screen, etc.
  };

  const renderTabButtons = () => (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'rewards' && styles.activeTab]}
        onPress={() => setActiveTab('rewards')}
      >
        <Text style={[styles.tabText, activeTab === 'rewards' && styles.activeTabText]}>
          Rewards
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'giveaways' && styles.activeTab]}
        onPress={() => setActiveTab('giveaways')}
      >
        <Text style={[styles.tabText, activeTab === 'giveaways' && styles.activeTabText]}>
          Giveaways
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderRewardsTab = () => (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Black promotional section */}
      <View style={styles.promoSection}>
        <Text style={styles.promoWant}>WANT</Text>
        <Text style={styles.promoDiscount}>10% OFF</Text>
        <Text style={styles.promoSubtext}>YOUR NEXT PURCHASE?</Text>
        <Text style={styles.promoBonus}>PLUS REWARD GIVEAWAY AND MORE!</Text>
        
        <Text style={styles.promoQuestion}>What are you waiting for?</Text>
        <Text style={styles.promoCTA}>Become arewards member today!</Text>
      </View>

      {/* Progress indicator */}
      <View style={styles.progressSection}>
        <View style={styles.levelIndicator}>
          {LEVELS.map((level, index) => (
            <View key={level.name} style={styles.levelPoint}>
              <View style={[
                styles.levelDot,
                { backgroundColor: level.color },
                USER_POINTS.current >= level.points && styles.levelDotActive
              ]}>
                <Text style={styles.levelPoints}>{level.points}</Text>
              </View>
              {index < LEVELS.length - 1 && <View style={styles.levelLine} />}
            </View>
          ))}
        </View>
        
        <Text style={styles.journeyText}>
          The journey to becoming ✨ XCLUSIVE
        </Text>
        
        <View style={styles.pointsSection}>
          <TouchableOpacity onPress={() => navigation.navigate('PointsHistory')}>
            <Text style={styles.currentPointsLabel}>Current Points</Text>
          </TouchableOpacity>
          <View style={styles.pointsRow}>
            <Text style={styles.currentPoints}>{USER_POINTS.current}</Text>
            <View style={styles.pointsUsedSection}>
              <Text style={styles.pointsUsed}>{USER_POINTS.used}</Text>
              <Text style={styles.pointsUsedLabel}>Points Used</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Sign in and Create Account buttons */}
      <View style={styles.authButtons}>
        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.createAccountButton} onPress={handleCreateAccount}>
          <Text style={styles.createAccountButtonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderGiveawaysTab = () => (
    <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={false}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
      )}
      scrollEventThrottle={16}
    >
      {/* Dynamic yellow section that moves on scroll */}
      <Animated.View style={[styles.yellowSection, {
        transform: [{
          translateY: scrollY.interpolate({
            inputRange: [0, 200],
            outputRange: [0, -100],
            extrapolate: 'clamp',
          })
        }]
      }]}>
        <Text style={styles.expiresText}>Expires in 8 days</Text>
        <Text style={styles.giveawayTitle}>YORAA Concert Giveaways</Text>
      </Animated.View>

      {/* Static content below - this stays in place */}
      <View style={styles.staticContent}>
        {/* Membership Exclusive Button - Always visible */}
        <TouchableOpacity 
          style={styles.membersExclusiveButton}
          onPress={() => navigation.navigate('MembersExclusive')}
        >
          <Text style={styles.membersExclusiveText}>MEMBERS EXCLUSIVE</Text>
        </TouchableOpacity>

        {/* Static content that doesn't move */}
        <View style={styles.staticInnerContent}>
          <Text style={styles.expiresTextStatic}>Expires in 8 days</Text>
          <Text style={styles.giveawayTitleStatic}>YORAA Concert Giveaways</Text>

          {/* Sign in and Create Account buttons */}
          <View style={styles.authButtons}>
            <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
              <Text style={styles.signInButtonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.createAccountButton} onPress={handleCreateAccount}>
              <Text style={styles.createAccountButtonText}>Create Account</Text>
            </TouchableOpacity>
          </View>

          {/* Language and Region */}
          <View style={styles.preferencesSection}>
            <Text style={styles.sectionTitle}>Language and region</Text>
            
            <TouchableOpacity style={styles.preferenceItem} onPress={handleLanguagePress}>
              <View style={styles.preferenceLeft}>
                <Text style={styles.flagIcon}>🌐</Text>
                <View>
                  <Text style={styles.preferenceMain}>English (United kingdom)</Text>
                  <Text style={styles.preferenceLabel}>Language</Text>
                </View>
              </View>
              <ForwardArrowIcon color="#999999" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.preferenceItem}
              onPress={() => navigation.navigate('Region')}
            >
              <View style={styles.preferenceLeft}>
                <Text style={styles.flagIcon}>🇮🇳</Text>
                <View>
                  <Text style={styles.preferenceMain}>India (USD $)</Text>
                  <Text style={styles.preferenceLabel}>Region</Text>
                </View>
              </View>
              <ForwardArrowIcon color="#999999" />
            </TouchableOpacity>
            
            <Text style={styles.shippingNote}>
              You are currently shipping to India and your order will be billed in USD $
            </Text>
          </View>

          {/* Shopping Preferences */}
          <View style={styles.preferencesSection}>
            <Text style={styles.sectionTitle}>My shopping preferences</Text>
            
            {SHOPPING_PREFERENCES.map((pref) => (
              <TouchableOpacity
                key={pref}
                style={styles.radioItem}
                onPress={() => setSelectedShoppingPreference(pref)}
              >
                <Text style={styles.radioLabel}>{pref}</Text>
                <View style={styles.radioButton}>
                  {selectedShoppingPreference === pref && <View style={styles.radioButtonSelected} />}
                </View>
              </TouchableOpacity>
            ))}
            
            <Text style={styles.preferenceNote}>
              Tailor your app experience with the items most suited to you
            </Text>
          </View>

          {/* Additional Preferences */}
          <View style={styles.preferencesSection}>
            <Text style={styles.sectionTitle}>Additional preferences</Text>
            
            {ADDITIONAL_PREFERENCES.map((pref) => (
              <TouchableOpacity
                key={pref}
                style={styles.checkboxItem}
                onPress={() => {
                  if (selectedAdditionalPreferences.includes(pref)) {
                    setSelectedAdditionalPreferences(prev => prev.filter(p => p !== pref));
                  } else {
                    setSelectedAdditionalPreferences(prev => [...prev, pref]);
                  }
                }}
              >
                <Text style={styles.checkboxLabel}>{pref}</Text>
                <View style={styles.checkbox}>
                  {selectedAdditionalPreferences.includes(pref) && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {renderTabButtons()}
      {activeTab === 'rewards' ? renderRewardsTab() : renderGiveawaysTab()}
      
      {/* Authentication Modal */}
      <Modal
        visible={showAuthModal}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={handleAuthSkip}
      >
        <AuthenticationFlow
          navigation={navigation}
          onSkip={handleAuthSkip}
          onAuthSuccess={handleAuthSuccess}
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  
  // Tab Styles
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#000000',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#999999',
  },
  activeTabText: {
    color: '#000000',
    fontWeight: '600',
  },

  // Rewards Tab Styles
  promoSection: {
    backgroundColor: '#000000',
    padding: 40,
    alignItems: 'center',
    minHeight: 400,
    justifyContent: 'center',
  },
  promoWant: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 10,
  },
  promoDiscount: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: 'bold',
    lineHeight: 50,
  },
  promoSubtext: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  promoBonus: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '400',
    marginBottom: 40,
  },
  promoQuestion: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 5,
  },
  promoCTA: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  progressSection: {
    padding: 20,
    alignItems: 'center',
  },
  levelIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  levelPoint: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  levelDot: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  levelDotActive: {
    borderColor: '#000000',
  },
  levelPoints: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  levelLine: {
    width: 40,
    height: 2,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 5,
  },
  journeyText: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 30,
    textAlign: 'center',
  },
  pointsSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  currentPointsLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  pointsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 40,
  },
  currentPoints: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000000',
  },
  pointsUsedSection: {
    alignItems: 'center',
  },
  pointsUsed: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  pointsUsedLabel: {
    fontSize: 12,
    color: '#FF6B6B',
    marginTop: 5,
  },

  // Giveaways Tab Styles
  yellowSection: {
    backgroundColor: '#FFEB3B',
    padding: 20,
    minHeight: 400,
    justifyContent: 'flex-start',
    paddingTop: 40,
  },
  expiresText: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 10,
    fontWeight: '400',
  },
  giveawayTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
  },
  membersExclusiveButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#000000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: 'flex-start',
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  membersExclusiveText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },

  staticContent: {
    backgroundColor: '#F5F5F5',
    paddingTop: 60, // Space for the members exclusive button
    flex: 1,
    minHeight: 800,
  },
  staticInnerContent: {
    padding: 20,
  },
  expiresTextStatic: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 10,
    fontWeight: '400',
  },
  giveawayTitleStatic: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 30,
  },

  // Auth Buttons
  authButtons: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 40,
  },
  signInButton: {
    flex: 1,
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  createAccountButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#000000',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  createAccountButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },

  // Preferences Sections
  preferencesSection: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 20,
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  preferenceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  flagIcon: {
    fontSize: 24,
  },
  preferenceMain: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  preferenceLabel: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  shippingNote: {
    fontSize: 12,
    color: '#666666',
    marginTop: 15,
    lineHeight: 16,
  },

  // Radio buttons
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  radioLabel: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '400',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#000000',
  },
  preferenceNote: {
    fontSize: 12,
    color: '#666666',
    marginTop: 15,
    lineHeight: 16,
  },

  // Checkboxes
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '400',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  checkmark: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default RewardsScreen;
