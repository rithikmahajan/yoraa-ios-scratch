import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  StatusBar,
  Alert,
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

const MobileLoginScreen = ({ navigation, onClose }) => {
  const [selectedTab, setSelectedTab] = useState('phone'); // 'phone' or 'email'
  const [selectedCountryCode, setSelectedCountryCode] = useState(COUNTRY_CODES[2]); // Default to India
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  const handleBackPress = () => {
    if (onClose) {
      onClose();
    } else if (navigation?.goBack) {
      navigation.goBack();
    }
  };

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
    if (tab === 'email' && navigation?.navigate) {
      navigation.navigate('EmailLoginScreen');
    }
  };

  const validatePhoneNumber = () => {
    const phoneRegex = /^\d{10,15}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleLogin = () => {
    if (!validatePhoneNumber()) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid phone number');
      return;
    }
    
    // Navigate to OTP verification screen
    if (navigation?.navigate) {
      navigation.navigate('OTPVerificationScreen', {
        phoneNumber: selectedCountryCode.code + phoneNumber
      });
    }
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Login to your account</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <View style={styles.content}>
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
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mobile Number</Text>
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
              placeholder="Enter mobile number"
              placeholderTextColor="#CCCCCC"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="numeric"
              maxLength={15}
            />
          </View>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          style={[styles.loginButton, !validatePhoneNumber() && styles.disabledButton]}
          onPress={handleLogin}
          disabled={!validatePhoneNumber()}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>

      {renderCountryPicker()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  tabText: {
    fontSize: 16,
    color: '#999',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#000',
    fontWeight: '600',
  },
  inputContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  countryCodeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
    minWidth: 100,
  },
  countryFlag: {
    fontSize: 18,
    marginRight: 8,
  },
  countryCodeText: {
    fontSize: 16,
    color: '#000',
    marginRight: 4,
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#000',
  },
  loginButton: {
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  closeButton: {
    padding: 8,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  countryName: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    marginLeft: 12,
  },
  countryCode: {
    fontSize: 16,
    color: '#666',
  },
});

export default MobileLoginScreen;
