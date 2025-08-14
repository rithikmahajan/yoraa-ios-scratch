import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Modal,
  FlatList,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const COUNTRY_CODES = [
  { code: '+1', country: 'US', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+86', country: 'China', flag: '🇨🇳' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+81', country: 'Japan', flag: '🇯🇵' },
  { code: '+82', country: 'Korea', flag: '🇰🇷' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+55', country: 'Brazil', flag: '🇧🇷' },
];

const AuthenticationFlow = ({ navigation, onSkip, onAuthSuccess }) => {
  const [selectedTab, setSelectedTab] = useState('phone'); // 'phone', 'email'
  
  // Phone login state
  const [selectedCountryCode, setSelectedCountryCode] = useState(COUNTRY_CODES[2]); // Default to India
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  
  // Email signup state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Success modal state
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    }
  };

  const validatePhoneNumber = () => {
    const phoneRegex = /^\d{10,15}$/;
    return phoneRegex.test(phoneNumber);
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = () => {
    return password.length >= 6;
  };

  const handlePhoneSignUp = () => {
    if (!validatePhoneNumber()) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid phone number');
      return;
    }
    
    console.log('Phone sign up:', selectedCountryCode.code + phoneNumber);
    Alert.alert('Success', 'Phone number sign up initiated');
    if (onAuthSuccess) {
      onAuthSuccess('phone', selectedCountryCode.code + phoneNumber);
    }
  };

  const handleEmailSignUp = () => {
    if (!name.trim()) {
      Alert.alert('Missing Name', 'Please enter your name');
      return;
    }
    
    if (!validateEmail()) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }
    
    if (!validatePassword()) {
      Alert.alert('Invalid Password', 'Password must be at least 6 characters long');
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match');
      return;
    }
    
    console.log('Email sign up:', { name, email, password });
    // Show success modal instead of alert
    setShowSuccessModal(true);
  };

  const handleContinueShopping = () => {
    setShowSuccessModal(false);
    if (onAuthSuccess) {
      onAuthSuccess('email', { name, email });
    }
  };

  const handleAppleSignIn = () => {
    console.log('Apple Sign-In pressed');
    Alert.alert('Apple Sign-In', 'Apple Sign-In functionality will be implemented');
  };

  const handleGoogleSignIn = () => {
    console.log('Google Sign-In pressed');
    Alert.alert('Google Sign-In', 'Google Sign-In functionality will be implemented');
  };

  const renderCountryPicker = () => (
    <Modal
      visible={showCountryPicker}
      transparent
      animationType="slide"
      onRequestClose={() => setShowCountryPicker(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Country</Text>
            <TouchableOpacity
              onPress={() => setShowCountryPicker(false)}
              style={styles.closeButton}
            >
              <Icon name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={COUNTRY_CODES}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.countryItem}
                onPress={() => {
                  setSelectedCountryCode(item);
                  setShowCountryPicker(false);
                }}
              >
                <Text style={styles.countryFlag}>{item.flag}</Text>
                <Text style={styles.countryName}>{item.country}</Text>
                <Text style={styles.countryCode}>{item.code}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );

  const renderPhoneScreen = () => (
    <View style={styles.formContainer}>
      {/* Tab Selection */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'phone' && styles.activeTab]}
          onPress={() => handleTabPress('phone')}
        >
          <Text style={[styles.tabText, selectedTab === 'phone' && styles.activeTabText]}>
            Phone
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'email' && styles.activeTab]}
          onPress={() => handleTabPress('email')}
        >
          <Text style={[styles.tabText, selectedTab === 'email' && styles.activeTabText]}>
            Email
          </Text>
        </TouchableOpacity>
      </View>

      {/* Country Code and Phone Number Input */}
      <View style={styles.phoneInputContainer}>
        <TouchableOpacity
          style={styles.countryCodeSelector}
          onPress={() => setShowCountryPicker(true)}
        >
          <Text style={styles.countryFlag}>{selectedCountryCode.flag}</Text>
          <Text style={styles.countryCodeText}>{selectedCountryCode.code}</Text>
          <Icon name="keyboard-arrow-down" size={20} color="#999" />
        </TouchableOpacity>
        <TextInput
          style={styles.phoneInput}
          placeholder="Mobile Number"
          placeholderTextColor="#CCCCCC"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="numeric"
          maxLength={15}
        />
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity
        style={[styles.signUpButton, !validatePhoneNumber() && styles.disabledButton]}
        onPress={handlePhoneSignUp}
        disabled={!validatePhoneNumber()}
      >
        <Text style={styles.signUpButtonText}>SIGN UP</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEmailScreen = () => (
    <View style={styles.formContainer}>
      {/* Tab Selection */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'phone' && styles.activeTab]}
          onPress={() => handleTabPress('phone')}
        >
          <Text style={[styles.tabText, selectedTab === 'phone' && styles.activeTabText]}>
            Phone
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'email' && styles.activeTab]}
          onPress={() => handleTabPress('email')}
        >
          <Text style={[styles.tabText, selectedTab === 'email' && styles.activeTabText]}>
            Email
          </Text>
        </TouchableOpacity>
      </View>

      {/* Form Fields */}
      <View style={styles.inputsContainer}>
        {/* Name Input */}
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#CCCCCC"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />

        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#CCCCCC"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Password Input */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#CCCCCC"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Icon 
              name={showPassword ? "visibility" : "visibility-off"} 
              size={20} 
              color="#CCCCCC" 
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password Input */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirm Password"
            placeholderTextColor="#CCCCCC"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Icon 
              name={showConfirmPassword ? "visibility" : "visibility-off"} 
              size={20} 
              color="#CCCCCC" 
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity
        style={[
          styles.signUpButton,
          (!name.trim() || !validateEmail() || !validatePassword() || password !== confirmPassword) && styles.disabledButton
        ]}
        onPress={handleEmailSignUp}
        disabled={!name.trim() || !validateEmail() || !validatePassword() || password !== confirmPassword}
      >
        <Text style={styles.signUpButtonText}>SIGN UP</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Skip Button */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipButtonText}>SKIP</Text>
      </TouchableOpacity>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text style={styles.title}>Create your account</Text>
        
        {/* Render Current Screen */}
        {selectedTab === 'phone' ? renderPhoneScreen() : renderEmailScreen()}
        
        {/* Social Login Section */}
        <View style={styles.socialSection}>
          <Text style={styles.orText}>
            {selectedTab === 'phone' ? 'or log in' : 'or sign up with'}
          </Text>
          <Text style={styles.withText}>with</Text>
          
          {/* Social Login Buttons */}
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.socialButton} onPress={handleAppleSignIn}>
              <Icon name="apple" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton} onPress={handleGoogleSignIn}>
              <Text style={styles.googleIcon}>G</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Bottom Text */}
        <View style={styles.bottomTextContainer}>
          <Text style={styles.bottomText}>
            {selectedTab === 'phone' ? "Don't have an account? " : "Already have an account? "}
          </Text>
          <TouchableOpacity onPress={() => handleTabPress(selectedTab === 'phone' ? 'email' : 'phone')}>
            <Text style={styles.bottomLinkText}>
              {selectedTab === 'phone' ? 'Sign Up' : 'Log In'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {renderCountryPicker()}
      
      {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View style={styles.successModalOverlay}>
          <View style={styles.successModalContent}>
            <Text style={styles.successTitle}>Account created !</Text>
            <Text style={styles.successMessage}>
              Your YORAA account has been{'\n'}created successfully
            </Text>
            <TouchableOpacity
              style={styles.continueShoppingButton}
              onPress={handleContinueShopping}
            >
              <Text style={styles.continueShoppingText}>Continue Shopping</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  skipButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 10,
  },
  skipButtonText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '400',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'left',
    marginBottom: 40,
    marginTop: 20,
  },
  formContainer: {
    marginBottom: 60,
  },
  
  // Tab Container
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    padding: 3,
    marginBottom: 40,
    alignSelf: 'center',
  },
  tab: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 22,
    minWidth: 80,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#000000',
  },
  tabText: {
    fontSize: 14,
    color: '#999999',
    fontWeight: '400',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  
  // Phone Input Container
  phoneInputContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginBottom: 40,
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 50,
  },
  countryCodeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 12,
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
    marginRight: 12,
  },
  countryFlag: {
    fontSize: 18,
    marginRight: 8,
  },
  countryCodeText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '400',
    marginRight: 4,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    height: '100%',
  },
  
  // Email Form Inputs
  inputsContainer: {
    marginBottom: 40,
  },
  input: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 16,
    fontSize: 16,
    color: '#000000',
    marginBottom: 24,
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  passwordInput: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 16,
    paddingRight: 40,
    fontSize: 16,
    color: '#000000',
  },
  eyeIcon: {
    position: 'absolute',
    right: 0,
    top: 16,
    padding: 4,
  },
  
  // Sign Up Button
  signUpButton: {
    backgroundColor: '#000000',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 40,
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  signUpButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    letterSpacing: 1,
  },
  
  // Social Section
  socialSection: {
    alignItems: 'center',
    marginBottom: 60,
  },
  orText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 4,
  },
  withText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 24,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4285F4',
  },
  
  // Bottom Text
  bottomTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: 20,
  },
  bottomText: {
    fontSize: 14,
    color: '#666666',
  },
  bottomLinkText: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  closeButton: {
    padding: 4,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  countryName: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    marginLeft: 12,
  },
  countryCode: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
  },
  
  // Success Modal Styles
  successModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  successModalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 32,
    paddingVertical: 40,
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  continueShoppingButton: {
    backgroundColor: '#000000',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
  },
  continueShoppingText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

export default AuthenticationFlow;
