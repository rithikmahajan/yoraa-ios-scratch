import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Animated,
} from 'react-native';
import { Colors, FontWeights, Spacing } from '../constants';

const DeliveryScreen = ({ navigation }) => {
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [postcode, setPostcode] = useState('');
  const [isPincodeValid, setIsPincodeValid] = useState(true);
  const [showErrorState, setShowErrorState] = useState(false);
  const [pincodeChecked, setPincodeChecked] = useState(false);

  // Animation value for slide-in effect
  const slideAnimation = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    // Slide in from right to left animation
    Animated.timing(slideAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [slideAnimation]);

  const validatePostcode = (code) => {
    // Simulate pincode validation - some codes are "unserviceable"
    const unserviceableCodes = ['400001', '110001', '560001'];
    const isValid = /^\d{6}$/.test(code);
    const isServiceable = !unserviceableCodes.includes(code);
    
    if (isValid) {
      setIsPincodeValid(isServiceable);
      setShowErrorState(!isServiceable);
      setPincodeChecked(true);
    } else {
      setIsPincodeValid(false);
      setShowErrorState(false);
      setPincodeChecked(false);
    }
    
    return isValid && isServiceable;
  };

  const handlePostcodeChange = (text) => {
    setPostcode(text);
    if (text.length === 6) {
      validatePostcode(text);
    } else if (text.length === 0) {
      setShowErrorState(false);
      setIsPincodeValid(true);
      setPincodeChecked(false);
    } else {
      setPincodeChecked(false);
      setShowErrorState(false);
    }
  };

  const deliveryOptions = [
    {
      id: 'free',
      title: 'Free Delivery',
      subtitle: 'Arrives Wed, 11 May',
      price: '',
    },
    {
      id: 'international',
      title: 'International Delivery',
      subtitle: '',
      price: 'US$10.00',
    },
  ];

  const isUpdateButtonActive = selectedDelivery && postcode.length === 6 && isPincodeValid && pincodeChecked;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      
      <Animated.View
        style={[
          styles.content,
          {
            transform: [
              {
                translateX: slideAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [300, 0], // Slide from right to left
                }),
              },
            ],
          },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Delivery</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Postcode Section */}
          <View style={styles.section}>
            <View style={[
              styles.postcodeContainer,
              showErrorState && styles.postcodeContainerError
            ]}>
              <TextInput
                style={[
                  styles.postcodeInput,
                  showErrorState && styles.postcodeInputError
                ]}
                placeholder="Enter Postcode"
                value={postcode}
                onChangeText={handlePostcodeChange}
                keyboardType="numeric"
                maxLength={6}
                placeholderTextColor={showErrorState ? '#666' : Colors.textSecondary}
              />
              {showErrorState && (
                <Text style={styles.unserviceableText}>Unserviceable</Text>
              )}
            </View>
          </View>

          {/* Delivery Options - Only show if pincode is valid and checked */}
          {pincodeChecked && isPincodeValid && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Delivery Options</Text>
              
              {deliveryOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.deliveryOption,
                    selectedDelivery === option.id && styles.deliveryOptionSelected
                  ]}
                  onPress={() => setSelectedDelivery(option.id)}
                >
                  <View style={styles.optionContent}>
                    <Text style={styles.optionTitle}>{option.title}</Text>
                    {option.subtitle ? (
                      <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
                    ) : null}
                    {option.price ? (
                      <Text style={styles.optionPrice}>{option.price}</Text>
                    ) : null}
                  </View>
                </TouchableOpacity>
              ))}
              
              <Text style={styles.disclaimerText}>
                All dates and prices are subject to change. Actual delivery options will be calculated at checkout.
              </Text>
            </View>
          )}
        </ScrollView>

        {/* Update Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.updateButton,
              isUpdateButtonActive && styles.updateButtonActive
            ]}
            disabled={!isUpdateButtonActive}
            onPress={() => {
              // Handle update logic here
              console.log('Delivery updated:', { selectedDelivery, postcode });
              navigation.goBack();
            }}
          >
            <Text style={[
              styles.updateButtonText,
              isUpdateButtonActive && styles.updateButtonTextActive
            ]}>
              Update
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.medium,
    paddingVertical: Spacing.medium,
    backgroundColor: Colors.background,
  },
  backButton: {
    padding: Spacing.small,
  },
  backIcon: {
    fontSize: 24,
    color: Colors.text,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: FontWeights.medium,
    color: Colors.text,
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: Spacing.medium,
  },
  section: {
    marginVertical: Spacing.medium,
  },
  postcodeContainer: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.medium,
    paddingVertical: Spacing.small,
    minHeight: 50,
    justifyContent: 'center',
  },
  postcodeContainerError: {
    backgroundColor: '#FFE5E5',
    borderColor: '#FF6B6B',
    position: 'relative',
  },
  postcodeInput: {
    fontSize: 16,
    color: Colors.text,
    padding: 0,
  },
  postcodeInputError: {
    color: Colors.error,
  },
  unserviceableText: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: FontWeights.medium,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: FontWeights.semibold,
    color: Colors.text,
    marginBottom: Spacing.medium,
  },
  deliveryOption: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.small,
    overflow: 'hidden',
  },
  deliveryOptionSelected: {
    borderColor: Colors.primary,
  },
  optionContent: {
    padding: Spacing.medium,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: FontWeights.medium,
    color: Colors.text,
    marginBottom: 4,
  },
  optionSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  optionPrice: {
    fontSize: 16,
    fontWeight: FontWeights.medium,
    color: Colors.text,
  },
  disclaimerText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: Spacing.small,
    lineHeight: 16,
  },
  buttonContainer: {
    paddingHorizontal: Spacing.medium,
    paddingVertical: Spacing.medium,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  updateButton: {
    backgroundColor: Colors.lightGray,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  updateButtonActive: {
    backgroundColor: Colors.black,
  },
  updateButtonText: {
    fontSize: 16,
    fontWeight: FontWeights.medium,
    color: Colors.textSecondary,
  },
  updateButtonTextActive: {
    color: Colors.white,
  },
});

export default DeliveryScreen;
