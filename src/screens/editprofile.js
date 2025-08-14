import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import BackButton from '../components/BackButton';


const EditProfile = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: 'Jhin Doe',
    email: 'dsajklsaj@gamil.com',
    changePassword: '',
    confirmPassword: '',
    phone: '843783489937',
    dateOfBirth: new Date(1999, 4, 6), // May 6, 1999
    gender: 'Female',
    // Address fields
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: 'Delhi',
    pin: '',
    country: '',
    phoneNumber: '',
    countryCode: '+91',
  });

  const [passwordVisible, setPasswordVisible] = useState({
    changePassword: false,
    confirmPassword: false,
  });

  const [otherDetailsExpanded, setOtherDetailsExpanded] = useState(false);
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showCountryCodeDropdown, setShowCountryCodeDropdown] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [addressAdded, setAddressAdded] = useState(false);

  const genderOptions = ['Male', 'Female'];
  const stateOptions = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad'];
  const countryCodeOptions = [
    { code: '+1', country: 'US', flag: '🇺🇸' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
    { code: '+91', country: 'IN', flag: '🇮🇳' },
    { code: '+86', country: 'CN', flag: '🇨🇳' },
    { code: '+81', country: 'JP', flag: '🇯🇵' },
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const togglePasswordVisibility = (field) => {
    setPasswordVisible(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const getPasswordPlaceholder = (field) => {
    return field === 'changePassword' ? 'Enter new password' : 'Confirm new password';
  };

  const getPasswordDisplayValue = (field) => {
    return formData[field];
  };

  const shouldSecureEntry = (field) => {
    return !passwordVisible[field];
  };

  const handleSave = () => {
    console.log('Save profile:', formData);
    // Add save logic here
    // You can add validation and API calls here
  };

  const handleAddOtherDetails = () => {
    setOtherDetailsExpanded(!otherDetailsExpanded);
  };

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setFormData(prev => ({
        ...prev,
        dateOfBirth: selectedDate
      }));
    }
  };

  const handleGenderSelect = (gender) => {
    setFormData(prev => ({
      ...prev,
      gender: gender
    }));
    setShowGenderDropdown(false);
  };

  const handleAddAddress = () => {
    setShowAddressModal(true);
  };

  const handleCloseAddressModal = () => {
    // 300ms ease-out animation
    setTimeout(() => {
      setShowAddressModal(false);
    }, 300);
  };

  const handleAddressDone = () => {
    setShowAddressModal(false);
    setShowSuccessModal(true);
  };

  const handleSuccessModalDone = () => {
    setShowSuccessModal(false);
    setAddressAdded(true);
  };

  const handleStateSelect = (state) => {
    setFormData(prev => ({
      ...prev,
      state: state
    }));
    setShowStateDropdown(false);
  };

  const handleCountryCodeSelect = (countryCode) => {
    setFormData(prev => ({
      ...prev,
      countryCode: countryCode.code
    }));
    setShowCountryCodeDropdown(false);
  };

  const getFormattedAddress = () => {
    const { address, apartment, city, state, pin, country } = formData;
    let addressParts = [];
    
    if (address) addressParts.push(address);
    if (apartment) addressParts.push(apartment);
    if (city) addressParts.push(city);
    if (state) addressParts.push(state);
    if (pin) addressParts.push(pin);
    if (country) addressParts.push(country);
    
    return addressParts.length > 0 ? addressParts.join(', ') : 'XYZ Street';
  };

  const handleGoBack = () => {
    if (navigation && navigation.goBack) {
      // Add animation with 300ms ease-out
      setTimeout(() => {
        navigation.goBack();
      }, 300);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton 
          style={styles.backButton} 
          onPress={handleGoBack}
        />
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Form Fields */}
        <View style={styles.formContainer}>
          {/* Name Field */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={styles.textInput}
              value={formData.name}
              onChangeText={(value) => handleInputChange('name', value)}
              placeholder="Enter your name"
            />
          </View>

          {/* Email Field */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.textInput}
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Change Password Field */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Change Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.textInput, styles.passwordInput]}
                value={getPasswordDisplayValue('changePassword')}
                onChangeText={(value) => handleInputChange('changePassword', value)}
                placeholder={getPasswordPlaceholder('changePassword')}
                secureTextEntry={shouldSecureEntry('changePassword')}
              />
              <TouchableOpacity 
                style={styles.eyeButton}
                onPress={() => togglePasswordVisibility('changePassword')}
              >
                <Text style={styles.eyeText}>
                  {passwordVisible.changePassword ? '👁️' : '👁️‍🗨️'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password Field */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.textInput, styles.passwordInput]}
                value={getPasswordDisplayValue('confirmPassword')}
                onChangeText={(value) => handleInputChange('confirmPassword', value)}
                placeholder={getPasswordPlaceholder('confirmPassword')}
                secureTextEntry={shouldSecureEntry('confirmPassword')}
              />
              <TouchableOpacity 
                style={styles.eyeButton}
                onPress={() => togglePasswordVisibility('confirmPassword')}
              >
                <Text style={styles.eyeText}>
                  {passwordVisible.confirmPassword ? '👁️' : '👁️‍🗨️'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Phone Field */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Phone</Text>
            <TextInput
              style={styles.textInput}
              value={formData.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {/* Additional Sections */}
        <View style={styles.additionalContainer}>
          {/* Other Details */}
          <View style={styles.additionalSection}>
            <TouchableOpacity style={styles.additionalItem} onPress={handleAddOtherDetails}>
              <Text style={styles.additionalTitle}>Other Details</Text>
              <Text style={styles.addButton}>+ Add</Text>
            </TouchableOpacity>
            
            {otherDetailsExpanded && (
              <View style={styles.expandedContent}>
                {/* Date of Birth */}
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Date of Birth</Text>
                  <View style={styles.datePickerContainer}>
                    <DateTimePicker
                      value={formData.dateOfBirth}
                      mode="date"
                      display="compact"
                      onChange={handleDateChange}
                      style={styles.datePickerStyle}
                    />
                  </View>
                </View>

                {/* Gender */}
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Gender</Text>
                  <TouchableOpacity 
                    style={styles.dropdownContainer}
                    onPress={() => setShowGenderDropdown(!showGenderDropdown)}
                  >
                    <Text style={styles.dropdownText}>{formData.gender}</Text>
                    <Text style={styles.dropdownArrow}>▼</Text>
                  </TouchableOpacity>
                  
                  {showGenderDropdown && (
                    <View style={styles.dropdownOptions}>
                      {genderOptions.map((option) => (
                        <TouchableOpacity
                          key={option}
                          style={styles.dropdownOption}
                          onPress={() => handleGenderSelect(option)}
                        >
                          <Text style={[
                            styles.dropdownOptionText,
                            formData.gender === option && styles.selectedOption
                          ]}>
                            {option}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              </View>
            )}
          </View>

          {/* Address */}
          <View style={styles.additionalSection}>
            <TouchableOpacity style={styles.additionalItem} onPress={handleAddAddress}>
              <Text style={styles.additionalTitle}>Address</Text>
              <Text style={styles.addButton}>+ Add</Text>
            </TouchableOpacity>
            
            {addressAdded && (
              <View style={styles.addressDisplayContainer}>
                <Text style={styles.addressLabel}>Address</Text>
                <View style={styles.addressContentContainer}>
                  <Text style={styles.addressContent}>{getFormattedAddress()}</Text>
                </View>
              </View>
            )}
          </View>
        </View>

        {/* Spacer for Save Button */}
        <View style={styles.spacer} />
      </ScrollView>

      {/* Address Modal */}
      <Modal
        visible={showAddressModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          {/* Address Modal Header */}
          <View style={styles.modalHeader}>
            <BackButton 
              style={styles.backButton} 
              onPress={handleCloseAddressModal}
            />
            <Text style={styles.modalTitle}>Address</Text>
            <View style={styles.placeholder} />
          </View>

          <ScrollView style={styles.modalScrollContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.modalFormContainer}>
              {/* First Name */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={formData.firstName}
                  onChangeText={(value) => handleInputChange('firstName', value)}
                  placeholder="First Name"
                />
              </View>

              {/* Last Name */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={formData.lastName}
                  onChangeText={(value) => handleInputChange('lastName', value)}
                  placeholder="Last Name"
                />
              </View>

              {/* Address */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={formData.address}
                  onChangeText={(value) => handleInputChange('address', value)}
                  placeholder="Address"
                />
              </View>

              {/* Apartment/Suite */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={formData.apartment}
                  onChangeText={(value) => handleInputChange('apartment', value)}
                  placeholder="Apartment,suit"
                />
              </View>

              {/* City */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={formData.city}
                  onChangeText={(value) => handleInputChange('city', value)}
                  placeholder="City"
                />
              </View>

              {/* State Dropdown */}
              <View style={styles.inputContainer}>
                <TouchableOpacity 
                  style={styles.dropdownContainer}
                  onPress={() => setShowStateDropdown(!showStateDropdown)}
                >
                  <Text style={styles.dropdownText}>{formData.state}</Text>
                  <Text style={styles.dropdownArrow}>▼</Text>
                </TouchableOpacity>
                
                {showStateDropdown && (
                  <View style={styles.dropdownOptions}>
                    {stateOptions.map((option) => (
                      <TouchableOpacity
                        key={option}
                        style={styles.dropdownOption}
                        onPress={() => handleStateSelect(option)}
                      >
                        <Text style={[
                          styles.dropdownOptionText,
                          formData.state === option && styles.selectedOption
                        ]}>
                          {option}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              {/* PIN */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={formData.pin}
                  onChangeText={(value) => handleInputChange('pin', value)}
                  placeholder="PIN"
                  keyboardType="numeric"
                />
              </View>

              {/* Country */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={formData.country}
                  onChangeText={(value) => handleInputChange('country', value)}
                  placeholder="Country"
                />
              </View>

              {/* Phone with Country Code */}
              <View style={styles.inputContainer}>
                <View style={styles.phoneContainer}>
                  <TouchableOpacity 
                    style={styles.countryCodeContainer}
                    onPress={() => setShowCountryCodeDropdown(!showCountryCodeDropdown)}
                  >
                    <Text style={styles.countryCodeText}>
                      {countryCodeOptions.find(c => c.code === formData.countryCode)?.flag} {formData.countryCode}
                    </Text>
                    <Text style={styles.dropdownArrow}>▼</Text>
                  </TouchableOpacity>
                  
                  <TextInput
                    style={styles.phoneInput}
                    value={formData.phoneNumber}
                    onChangeText={(value) => handleInputChange('phoneNumber', value)}
                    placeholder="Phone"
                    keyboardType="phone-pad"
                  />
                </View>
                
                {showCountryCodeDropdown && (
                  <View style={styles.countryCodeDropdown}>
                    {countryCodeOptions.map((option) => (
                      <TouchableOpacity
                        key={option.code}
                        style={styles.dropdownOption}
                        onPress={() => handleCountryCodeSelect(option)}
                      >
                        <Text style={[
                          styles.dropdownOptionText,
                          formData.countryCode === option.code && styles.selectedOption
                        ]}>
                          {option.flag} {option.code} {option.country}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </View>

            {/* Modal Spacer */}
            <View style={styles.modalSpacer} />
          </ScrollView>

          {/* Done Button */}
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleAddressDone}>
              <Text style={styles.saveButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>

      {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.successModalOverlay}>
          <View style={styles.successModalContent}>
            <View style={styles.successIcon}>
              <Text style={styles.successIconText}>✓</Text>
            </View>
            <Text style={styles.successMessage}>
              Your profile details has been updated!
            </Text>
            <TouchableOpacity style={styles.successButton} onPress={handleSuccessModalDone}>
              <Text style={styles.successButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Save Button */}
      <View style={styles.saveButtonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  backIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 2,
  },
  backArrowLine: {
    width: 14,
    height: 2,
    backgroundColor: '#000000',
    position: 'absolute',
    left: 4,
  },
  backArrowHead1: {
    width: 8,
    height: 2,
    backgroundColor: '#000000',
    position: 'absolute',
    left: 0,
    top: -3,
    transform: [{ rotate: '45deg' }],
    transformOrigin: 'left center',
  },
  backArrowHead2: {
    width: 8,
    height: 2,
    backgroundColor: '#000000',
    position: 'absolute',
    left: 0,
    top: 3,
    transform: [{ rotate: '-45deg' }],
    transformOrigin: 'left center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  placeholder: {
    width: 30,
  },
  scrollContainer: {
    flex: 1,
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 8,
    marginLeft: 5,
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    color: '#000000',
    backgroundColor: '#FFFFFF',
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 60,
  },
  eyeButton: {
    position: 'absolute',
    right: 20,
    top: 15,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  eyeText: {
    fontSize: 16,
    color: '#666666',
  },
  additionalContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  additionalSection: {
    marginBottom: 15,
  },
  additionalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  additionalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  addButton: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  addressDisplayContainer: {
    paddingTop: 15,
  },
  addressLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 8,
    marginLeft: 5,
  },
  addressContentContainer: {
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
  },
  addressContent: {
    fontSize: 16,
    color: '#000000',
  },
  expandedContent: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  datePickerContainer: {
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  datePickerStyle: {
    flex: 1,
    height: 40,
  },
  dateText: {
    fontSize: 16,
    color: '#000000',
  },
  dropdownContainer: {
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  dropdownText: {
    fontSize: 16,
    color: '#000000',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#666666',
  },
  dropdownOptions: {
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 15,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdownOption: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  dropdownOptionText: {
    fontSize: 16,
    color: '#000000',
  },
  selectedOption: {
    fontWeight: '600',
    color: '#007AFF',
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  modalScrollContainer: {
    flex: 1,
  },
  modalFormContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCodeContainer: {
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginRight: 10,
    minWidth: 100,
  },
  countryCodeText: {
    fontSize: 16,
    color: '#000000',
    marginRight: 5,
  },
  phoneInput: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    color: '#000000',
    backgroundColor: '#FFFFFF',
  },
  countryCodeDropdown: {
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 15,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    maxHeight: 200,
  },
  modalSpacer: {
    height: 100,
  },
  modalButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  // Success Modal Styles
  successModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successModalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginHorizontal: 40,
    maxWidth: 300,
  },
  successIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  successIconText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  successMessage: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000000',
    marginBottom: 30,
    lineHeight: 22,
  },
  successButton: {
    backgroundColor: '#000000',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    minWidth: 120,
    alignItems: 'center',
  },
  successButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  spacer: {
    height: 100,
  },
  saveButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  saveButton: {
    backgroundColor: '#000000',
    borderRadius: 25,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EditProfile;
