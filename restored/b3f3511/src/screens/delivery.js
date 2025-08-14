import React, { useState, useRef, useEffect } from 'react';
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
  Modal,
  PanResponder,
  Dimensions,
} from 'react-native';
import { Colors, FontWeights, Spacing } from '../constants';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const DeliveryScreen = ({ navigation }) => {
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [postcode, setPostcode] = useState('');
  const [isPincodeValid, setIsPincodeValid] = useState(true);
  const [showErrorState, setShowErrorState] = useState(false);
  const [pincodeChecked, setPincodeChecked] = useState(false);

  // Modal states
  const [showDeliveryOptionsModal, setShowDeliveryOptionsModal] = useState(false);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [showAddressUpdatedModal, setShowAddressUpdatedModal] = useState(false);

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

  // Modal handlers
  const handleUpdatePress = () => {
    if (isUpdateButtonActive) {
      setShowDeliveryOptionsModal(true);
    }
  };

  const handleDeliveryOptionsClose = () => {
    setShowDeliveryOptionsModal(false);
  };

  const handleDeliveryOptionsContinue = () => {
    setShowDeliveryOptionsModal(false);
    navigation.goBack();
  };

  const handleAddAddressPress = () => {
    setShowDeliveryOptionsModal(false);
    setShowAddAddressModal(true);
  };

  const handleAddAddressClose = () => {
    setShowAddAddressModal(false);
    setShowDeliveryOptionsModal(true);
  };

  const handleAddAddressDone = (formData) => {
    console.log('Address form data:', formData);
    setShowAddAddressModal(false);
    setShowAddressUpdatedModal(true);
  };

  const handleAddressUpdatedClose = () => {
    setShowAddressUpdatedModal(false);
  };

  const handleAddressUpdatedDone = () => {
    setShowAddressUpdatedModal(false);
    setShowDeliveryOptionsModal(true);
  };

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
            onPress={handleUpdatePress}
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

      {/* Modals */}
      <DeliveryOptionsModal
        visible={showDeliveryOptionsModal}
        onClose={handleDeliveryOptionsClose}
        onContinue={handleDeliveryOptionsContinue}
        onAddAddress={handleAddAddressPress}
        selectedDeliveryOption={selectedDelivery}
      />

      <AddAddressModal
        visible={showAddAddressModal}
        onClose={handleAddAddressClose}
        onDone={handleAddAddressDone}
      />

      <AddressUpdatedModal
        visible={showAddressUpdatedModal}
        onClose={handleAddressUpdatedClose}
        onDone={handleAddressUpdatedDone}
      />
    </SafeAreaView>
  );
};

// DeliveryOptionsModal Component
const DeliveryOptionsModal = ({ 
  visible, 
  onClose, 
  onContinue,
  onAddAddress,
  selectedDeliveryOption = 'free',
  deliveryAddress = {
    name: 'John Smith',
    phone: '652-858-0392',
    address: '2950 S 108th St, West Allis, United States'
  }
}) => {
  const [selectedOption, setSelectedOption] = useState(selectedDeliveryOption);
  const [selectedAddress, setSelectedAddress] = useState(true);
  
  const slideAnimation = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  // Pan responder for swipe to close
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return gestureState.dy > 10 && Math.abs(gestureState.dx) < 100;
      },
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 0) {
          slideAnimation.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 50 || gestureState.vy > 0.3) {
          handleClose();
        } else {
          Animated.spring(slideAnimation, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (visible) {
      // Animate in (move up, ease in, 250ms)
      Animated.parallel([
        Animated.timing(slideAnimation, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, slideAnimation, overlayOpacity]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(slideAnimation, {
        toValue: SCREEN_HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  const deliveryOptionsForModal = [
    {
      id: 'free',
      title: 'Free Delivery',
      subtitle: 'Arrives Wed, 11 May to Fri, 13 May',
      price: '',
    },
    {
      id: 'international',
      title: 'International Delivery',
      subtitle: 'Arrives Wed, 18 May to Fri, 13 May',
      price: '$50 + Delivery Charges',
    },
  ];

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <View style={deliveryOptionsModalStyles.container}>
        <Animated.View 
          style={[
            deliveryOptionsModalStyles.overlay,
            {
              opacity: overlayOpacity,
            }
          ]}
        />
        
        <Animated.View
          style={[
            deliveryOptionsModalStyles.modalContainer,
            {
              transform: [{ translateY: slideAnimation }],
            },
          ]}
          {...panResponder.panHandlers}
        >
          {/* Header */}
          <View style={deliveryOptionsModalStyles.header}>
            <Text style={deliveryOptionsModalStyles.headerTitle}>Delivery</Text>
            <TouchableOpacity style={deliveryOptionsModalStyles.closeButton} onPress={handleClose}>
              <Text style={deliveryOptionsModalStyles.closeIcon}>−</Text>
            </TouchableOpacity>
          </View>

          {/* Delivery Options */}
          <View style={deliveryOptionsModalStyles.section}>
            {deliveryOptionsForModal.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  deliveryOptionsModalStyles.optionItem,
                  option.id === selectedOption && deliveryOptionsModalStyles.optionItemSelected
                ]}
                onPress={() => setSelectedOption(option.id)}
              >
                <View style={deliveryOptionsModalStyles.optionContent}>
                  <View style={deliveryOptionsModalStyles.radioButton}>
                    <View style={[
                      deliveryOptionsModalStyles.radioCircle,
                      option.id === selectedOption && deliveryOptionsModalStyles.radioCircleSelected
                    ]}>
                      {option.id === selectedOption && (
                        <View style={deliveryOptionsModalStyles.radioInner} />
                      )}
                    </View>
                  </View>
                  
                  <View style={deliveryOptionsModalStyles.optionText}>
                    <Text style={deliveryOptionsModalStyles.optionTitle}>{option.title}</Text>
                    <Text style={deliveryOptionsModalStyles.optionSubtitle}>{option.subtitle}</Text>
                    {option.price ? (
                      <Text style={deliveryOptionsModalStyles.optionPrice}>{option.price}</Text>
                    ) : null}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Delivery Details */}
          <View style={deliveryOptionsModalStyles.section}>
            <Text style={deliveryOptionsModalStyles.sectionTitle}>Delivery Details</Text>
            
            <TouchableOpacity
              style={[
                deliveryOptionsModalStyles.addressItem,
                selectedAddress && deliveryOptionsModalStyles.optionItemSelected
              ]}
              onPress={() => setSelectedAddress(!selectedAddress)}
            >
              <View style={deliveryOptionsModalStyles.optionContent}>
                <View style={deliveryOptionsModalStyles.radioButton}>
                  <View style={[
                    deliveryOptionsModalStyles.radioCircle,
                    selectedAddress && deliveryOptionsModalStyles.radioCircleSelected
                  ]}>
                    {selectedAddress && (
                      <View style={deliveryOptionsModalStyles.radioInner} />
                    )}
                  </View>
                </View>
                
                <View style={deliveryOptionsModalStyles.optionText}>
                  <Text style={deliveryOptionsModalStyles.addressName}>
                    {deliveryAddress.name}, {deliveryAddress.phone}
                  </Text>
                  <Text style={deliveryOptionsModalStyles.addressText}>
                    {deliveryAddress.address}
                  </Text>
                </View>
                
                <TouchableOpacity style={deliveryOptionsModalStyles.editButton}>
                  <Text style={deliveryOptionsModalStyles.editText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>

          {/* Buttons */}
          <View style={deliveryOptionsModalStyles.buttonContainer}>
            <TouchableOpacity
              style={deliveryOptionsModalStyles.continueButton}
              onPress={onContinue}
            >
              <Text style={deliveryOptionsModalStyles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={deliveryOptionsModalStyles.addAddressButton}
              onPress={onAddAddress}
            >
              <Text style={deliveryOptionsModalStyles.addAddressButtonText}>Add Address</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

// AddAddressModal Component
const AddAddressModal = ({ 
  visible, 
  onClose, 
  onDone,
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: 'Delhi',
    pincode: '',
    country: '',
    phone: '',
  });
  const [sameAsDelivery, setSameAsDelivery] = useState(true);
  
  const slideAnimation = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  // Pan responder for swipe to close
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return gestureState.dy > 10 && Math.abs(gestureState.dx) < 100;
      },
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 0) {
          slideAnimation.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 50 || gestureState.vy > 0.3) {
          handleClose();
        } else {
          Animated.spring(slideAnimation, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (visible) {
      // Animate in (move up, ease in, 250ms)
      Animated.parallel([
        Animated.timing(slideAnimation, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, slideAnimation, overlayOpacity]);

  const handleClose = () => {
    // Dissolve animation (ease out, 300ms)
    Animated.parallel([
      Animated.timing(slideAnimation, {
        toValue: SCREEN_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  const handleDone = () => {
    onDone(formData);
  };

  const updateFormField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <View style={addAddressModalStyles.container}>
        <Animated.View 
          style={[
            addAddressModalStyles.overlay,
            {
              opacity: overlayOpacity,
            }
          ]}
        />
        
        <Animated.View
          style={[
            addAddressModalStyles.modalContainer,
            {
              transform: [{ translateY: slideAnimation }],
            },
          ]}
        >
          {/* Header */}
          <View style={addAddressModalStyles.header} {...panResponder.panHandlers}>
            <Text style={addAddressModalStyles.headerTitle}>Add Address</Text>
            <TouchableOpacity style={addAddressModalStyles.closeButton} onPress={handleClose}>
              <Text style={addAddressModalStyles.closeIcon}>−</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={addAddressModalStyles.scrollView} showsVerticalScrollIndicator={false}>
            {/* Payment Info (Design shows card info) */}
            <View style={addAddressModalStyles.cardSection}>
              <View style={addAddressModalStyles.cardInput}>
                <View style={addAddressModalStyles.cardIcon}>
                  <View style={addAddressModalStyles.mastercardIcon} />
                </View>
                <Text style={addAddressModalStyles.cardNumber}>136541818383</Text>
                <Text style={addAddressModalStyles.cardExpiry}>11/24</Text>
                <Text style={addAddressModalStyles.cardCvv}>520</Text>
                <View style={addAddressModalStyles.cameraIcon}>
                  <Text style={addAddressModalStyles.cameraText}>📷</Text>
                </View>
              </View>
            </View>

            {/* Billing Address */}
            <View style={addAddressModalStyles.section}>
              <Text style={addAddressModalStyles.sectionTitle}>Billing Address</Text>
              
              <TouchableOpacity
                style={addAddressModalStyles.checkboxContainer}
                onPress={() => setSameAsDelivery(!sameAsDelivery)}
              >
                <View style={[
                  addAddressModalStyles.checkbox,
                  sameAsDelivery && addAddressModalStyles.checkboxSelected
                ]}>
                  {sameAsDelivery && (
                    <Text style={addAddressModalStyles.checkmark}>✓</Text>
                  )}
                </View>
                <Text style={addAddressModalStyles.checkboxLabel}>Same as Delivery Address</Text>
              </TouchableOpacity>
            </View>

            {/* Form Fields */}
            <View style={addAddressModalStyles.formContainer}>
              <View style={addAddressModalStyles.inputContainer}>
                <TextInput
                  style={addAddressModalStyles.input}
                  placeholder="First Name"
                  value={formData.firstName}
                  onChangeText={(value) => updateFormField('firstName', value)}
                  placeholderTextColor="#666"
                />
              </View>

              <View style={addAddressModalStyles.inputContainer}>
                <TextInput
                  style={addAddressModalStyles.input}
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChangeText={(value) => updateFormField('lastName', value)}
                  placeholderTextColor="#666"
                />
              </View>

              <View style={addAddressModalStyles.inputContainer}>
                <TextInput
                  style={addAddressModalStyles.input}
                  placeholder="Address"
                  value={formData.address}
                  onChangeText={(value) => updateFormField('address', value)}
                  placeholderTextColor="#666"
                />
              </View>

              <View style={addAddressModalStyles.inputContainer}>
                <TextInput
                  style={addAddressModalStyles.input}
                  placeholder="Apartment, suit"
                  value={formData.apartment}
                  onChangeText={(value) => updateFormField('apartment', value)}
                  placeholderTextColor="#666"
                />
              </View>

              <View style={addAddressModalStyles.inputContainer}>
                <TextInput
                  style={addAddressModalStyles.input}
                  placeholder="City"
                  value={formData.city}
                  onChangeText={(value) => updateFormField('city', value)}
                  placeholderTextColor="#666"
                />
              </View>

              {/* State Dropdown */}
              <View style={addAddressModalStyles.inputContainer}>
                <TouchableOpacity style={addAddressModalStyles.dropdownContainer}>
                  <View style={addAddressModalStyles.dropdownContent}>
                    <Text style={addAddressModalStyles.dropdownLabel}>State</Text>
                    <Text style={addAddressModalStyles.dropdownValue}>Delhi</Text>
                  </View>
                  <Text style={addAddressModalStyles.dropdownArrow}>▼</Text>
                </TouchableOpacity>
              </View>

              <View style={addAddressModalStyles.inputContainer}>
                <TextInput
                  style={addAddressModalStyles.input}
                  placeholder="PIN"
                  value={formData.pincode}
                  onChangeText={(value) => updateFormField('pincode', value)}
                  placeholderTextColor="#666"
                  keyboardType="numeric"
                />
              </View>

              <View style={addAddressModalStyles.inputContainer}>
                <TextInput
                  style={addAddressModalStyles.input}
                  placeholder="Country"
                  value={formData.country}
                  onChangeText={(value) => updateFormField('country', value)}
                  placeholderTextColor="#666"
                />
              </View>

              {/* Phone with country code */}
              <View style={addAddressModalStyles.inputContainer}>
                <View style={addAddressModalStyles.phoneContainer}>
                  <Text style={addAddressModalStyles.phoneLabel}>Phone</Text>
                  <View style={addAddressModalStyles.phoneInputContainer}>
                    <Text style={addAddressModalStyles.countryCode}>+91</Text>
                    <Text style={addAddressModalStyles.flag}>🇮🇳</Text>
                    <Text style={addAddressModalStyles.phoneDropdown}>▼</Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Done Button */}
          <View style={addAddressModalStyles.buttonContainer}>
            <TouchableOpacity
              style={addAddressModalStyles.doneButton}
              onPress={handleDone}
            >
              <Text style={addAddressModalStyles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

// AddressUpdatedModal Component
const AddressUpdatedModal = ({ 
  visible, 
  onClose, 
  onDone,
}) => {
  const scaleAnimation = useRef(new Animated.Value(0)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Fade in animation
      Animated.parallel([
        Animated.spring(scaleAnimation, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, scaleAnimation, overlayOpacity]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(scaleAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  const handleDone = () => {
    handleClose();
    setTimeout(() => {
      onDone();
    }, 250);
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <View style={addressUpdatedModalStyles.container}>
        <Animated.View 
          style={[
            addressUpdatedModalStyles.overlay,
            {
              opacity: overlayOpacity,
            }
          ]}
        />
        
        <Animated.View
          style={[
            addressUpdatedModalStyles.modalContainer,
            {
              transform: [{ scale: scaleAnimation }],
            },
          ]}
        >
          {/* Success Icon */}
          <View style={addressUpdatedModalStyles.iconContainer}>
            <View style={addressUpdatedModalStyles.successIconBackground}>
              <View style={addressUpdatedModalStyles.successIcon}>
                <Text style={addressUpdatedModalStyles.checkmark}>✓</Text>
              </View>
            </View>
          </View>

          {/* Message */}
          <Text style={addressUpdatedModalStyles.message}>Your address has been updated!</Text>

          {/* Done Button */}
          <TouchableOpacity
            style={addressUpdatedModalStyles.doneButton}
            onPress={handleDone}
          >
            <Text style={addressUpdatedModalStyles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
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

// DeliveryOptionsModal Styles
const deliveryOptionsModalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E4',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: FontWeights.medium,
    color: Colors.text,
  },
  closeButton: {
    padding: 4,
  },
  closeIcon: {
    fontSize: 20,
    color: Colors.text,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: FontWeights.medium,
    color: Colors.text,
    marginBottom: 16,
  },
  optionItem: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: '#E4E4E4',
    borderRadius: 8,
    marginBottom: 1,
    overflow: 'hidden',
  },
  optionItemSelected: {
    borderColor: Colors.primary || Colors.black,
  },
  addressItem: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: '#E4E4E4',
    borderRadius: 8,
    overflow: 'hidden',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  radioButton: {
    marginRight: 22,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    backgroundColor: Colors.black,
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.white,
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: FontWeights.regular,
    color: Colors.text,
    marginBottom: 2,
  },
  optionSubtitle: {
    fontSize: 16,
    color: '#767676',
    marginBottom: 2,
  },
  optionPrice: {
    fontSize: 16,
    color: '#767676',
  },
  addressName: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 2,
  },
  addressText: {
    fontSize: 16,
    color: '#767676',
  },
  editButton: {
    marginLeft: 16,
  },
  editText: {
    fontSize: 12,
    color: Colors.text,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 14,
  },
  continueButton: {
    backgroundColor: Colors.black,
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: FontWeights.medium,
    color: Colors.white,
  },
  addAddressButton: {
    borderWidth: 1,
    borderColor: '#E4E4E4',
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: 'center',
  },
  addAddressButtonText: {
    fontSize: 16,
    fontWeight: FontWeights.medium,
    color: Colors.text,
  },
});

// AddAddressModal Styles
const addAddressModalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT * 0.9,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#CDCDCD',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: FontWeights.medium,
    color: Colors.text,
  },
  closeButton: {
    padding: 4,
  },
  closeIcon: {
    fontSize: 20,
    color: Colors.text,
  },
  scrollView: {
    flex: 1,
  },
  cardSection: {
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  cardInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: '#E4E4E4',
    borderRadius: 3,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 14,
  },
  cardIcon: {
    width: 43.5,
    height: 29,
  },
  mastercardIcon: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FF5F00',
    borderRadius: 4,
  },
  cardNumber: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
  },
  cardExpiry: {
    fontSize: 14,
    color: Colors.text,
  },
  cardCvv: {
    fontSize: 14,
    color: Colors.text,
  },
  cameraIcon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraText: {
    fontSize: 16,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: FontWeights.medium,
    color: Colors.text,
    marginBottom: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: Colors.black,
    borderRadius: 4,
    marginRight: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: Colors.black,
  },
  checkmark: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 16,
    color: Colors.text,
  },
  formContainer: {
    paddingHorizontal: 20,
    gap: 14,
    paddingBottom: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#CDCDCD',
    borderRadius: 12,
    backgroundColor: Colors.white,
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    fontSize: 14,
    color: Colors.text,
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  dropdownContent: {
    flex: 1,
  },
  dropdownLabel: {
    fontSize: 12,
    color: Colors.text,
    marginBottom: 2,
  },
  dropdownValue: {
    fontSize: 14,
    color: Colors.text,
  },
  dropdownArrow: {
    fontSize: 12,
    color: Colors.text,
  },
  phoneContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  phoneLabel: {
    fontSize: 12,
    color: Colors.text,
    marginBottom: 2,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  countryCode: {
    fontSize: 14,
    color: Colors.text,
  },
  flag: {
    fontSize: 16,
  },
  phoneDropdown: {
    fontSize: 12,
    color: Colors.text,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 30,
  },
  doneButton: {
    backgroundColor: Colors.black,
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: 'center',
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: FontWeights.medium,
    color: Colors.white,
  },
});

// AddressUpdatedModal Styles
const addressUpdatedModalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(53, 57, 69, 0.5)',
  },
  modalContainer: {
    width: SCREEN_WIDTH * 0.87,
    backgroundColor: Colors.white,
    borderRadius: 13.47,
    paddingVertical: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  iconContainer: {
    marginBottom: 24,
  },
  successIconBackground: {
    width: 81,
    height: 81,
    borderRadius: 40.5,
    backgroundColor: 'rgba(80, 138, 123, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#508A7B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 16,
    fontWeight: FontWeights.bold,
    color: '#43484B',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22.5,
  },
  doneButton: {
    width: 234,
    height: 48,
    backgroundColor: Colors.black,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: FontWeights.semibold,
    color: Colors.white,
  },
});

export default DeliveryScreen;
