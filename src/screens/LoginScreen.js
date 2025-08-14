import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LoginScreen = ({ navigation, onClose }) => {
  const [selectedOption, setSelectedOption] = useState('mobile'); // 'mobile' or 'email'

  const handleBackPress = () => {
    if (onClose) {
      onClose();
    } else if (navigation?.goBack) {
      navigation.goBack();
    }
  };

  const handleMobileLogin = () => {
    if (navigation?.navigate) {
      navigation.navigate('MobileLoginScreen');
    }
  };

  const handleEmailLogin = () => {
    if (navigation?.navigate) {
      navigation.navigate('EmailLoginScreen');
    }
  };

  const handleContinue = () => {
    if (selectedOption === 'mobile') {
      handleMobileLogin();
    } else {
      handleEmailLogin();
    }
  };

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
        <Text style={styles.title}>Login to your account</Text>
        
        {/* Option Selection */}
        <View style={styles.optionContainer}>
          <TouchableOpacity
            style={[
              styles.option,
              selectedOption === 'mobile' && styles.selectedOption
            ]}
            onPress={() => setSelectedOption('mobile')}
          >
            <View style={styles.optionContent}>
              <View style={[
                styles.radioButton,
                selectedOption === 'mobile' && styles.selectedRadio
              ]}>
                {selectedOption === 'mobile' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.optionText}>Mobile</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.option,
              selectedOption === 'email' && styles.selectedOption
            ]}
            onPress={() => setSelectedOption('email')}
          >
            <View style={styles.optionContent}>
              <View style={[
                styles.radioButton,
                selectedOption === 'email' && styles.selectedRadio
              ]}>
                {selectedOption === 'email' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.optionText}>Email</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Continue Button */}
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
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
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginBottom: 40,
  },
  optionContainer: {
    marginBottom: 40,
  },
  option: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    marginBottom: 16,
  },
  selectedOption: {
    borderColor: '#000',
    backgroundColor: '#f8f8f8',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRadio: {
    borderColor: '#000',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  continueButton: {
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LoginScreen;
