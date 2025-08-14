import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Linking,
} from 'react-native';
import BackButton from '../components/BackButton';
import CheckboxIcon from '../components/icons/CheckboxIcon';

const DeleteAccount = ({ navigation }) => {
  const [isFirstCheckboxChecked, setIsFirstCheckboxChecked] = useState(true);
  const [isSecondCheckboxChecked, setIsSecondCheckboxChecked] = useState(true);

  const handleTermsAndConditionsPress = () => {
    // Replace with your actual terms and conditions URL
    const termsUrl = 'https://yoraa.com/terms-and-conditions';
    Linking.openURL(termsUrl).catch(err => {
      console.error('Error opening terms and conditions:', err);
      Alert.alert('Error', 'Unable to open terms and conditions');
    });
  };

  const handleContinue = () => {
    if (!isFirstCheckboxChecked || !isSecondCheckboxChecked) {
      Alert.alert(
        'Action Required',
        'Please select all checkboxes before proceeding.',
        [{ text: 'OK', style: 'default' }]
      );
      return;
    }

    // Proceed with account deletion
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // Handle account deletion logic here
            console.log('Account deletion confirmed');
            // You can add your account deletion API call here
          },
        },
      ]
    );
  };

  const renderCheckbox = (isChecked, onPress) => (
    <TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
      <CheckboxIcon 
        isChecked={isChecked}
        size={20}
        checkedColor="#111111"
        uncheckedBorderColor="#BCBCBC"
        uncheckedBackgroundColor="transparent"
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Delete Accounts</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.guidelineSection}>
          <Text style={styles.guidelineTitle}>General Guideline</Text>
          <Text style={styles.guidelineText}>
            Read deletion{' '}
            <Text style={styles.termsLink} onPress={handleTermsAndConditionsPress}>
              terms and conditions
            </Text>
            {' '}carefully.
          </Text>
        </View>

        <View style={styles.checkboxSection}>
          <View style={styles.checkboxRow}>
            {renderCheckbox(isFirstCheckboxChecked, () => setIsFirstCheckboxChecked(!isFirstCheckboxChecked))}
            <Text style={styles.checkboxText}>
              Yes , proceed for account deletion
            </Text>
          </View>

          <View style={styles.checkboxRow}>
            {renderCheckbox(isSecondCheckboxChecked, () => setIsSecondCheckboxChecked(!isSecondCheckboxChecked))}
            <Text style={styles.checkboxText}>
              I completely consent that i have gone through the terms and conditions very carefully and wish to delete my account
            </Text>
          </View>
        </View>

        <TouchableOpacity 
          style={[
            styles.continueButton,
            (!isFirstCheckboxChecked || !isSecondCheckboxChecked) && styles.continueButtonDisabled
          ]}
          onPress={handleContinue}
          disabled={!isFirstCheckboxChecked || !isSecondCheckboxChecked}
        >
          <Text style={[
            styles.continueButtonText,
            (!isFirstCheckboxChecked || !isSecondCheckboxChecked) && styles.continueButtonTextDisabled
          ]}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  backButton: {
    marginRight: 16,
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  guidelineSection: {
    marginBottom: 24,
  },
  guidelineTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  guidelineText: {
    fontSize: 16,
    color: '#000000',
    lineHeight: 22,
  },
  termsLink: {
    textDecorationLine: 'underline',
    color: '#000000',
    fontWeight: '500',
  },
  checkboxSection: {
    marginBottom: 32,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  checkboxContainer: {
    marginRight: 12,
    marginTop: 2,
  },
  checkboxText: {
    flex: 1,
    fontSize: 16,
    color: '#666666',
    lineHeight: 22,
  },
  continueButton: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 32,
  },
  continueButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  continueButtonTextDisabled: {
    color: '#999999',
  },
});

export default DeleteAccount;
