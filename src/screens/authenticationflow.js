import React, { useState, useEffect, useRef } from 'react';
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
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { appleAuth } from '@invertase/react-native-apple-authentication';

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

// Constants
const OTP_LENGTH = 6;
const OTP_TIMER_DURATION = 30;
const MIN_PASSWORD_LENGTH = 6;
const MIN_NAME_LENGTH = 2;

const AuthenticationFlow = ({ navigation, onSkip, onAuthSuccess }) => {
  // Current screen state
  const [currentScreen, setCurrentScreen] = useState('loginOption'); // 'loginOption', 'mobileLogin', 'emailLogin', 'otpVerification', 'createAccount'
  
  // Login option state
  const [selectedOption, setSelectedOption] = useState('mobile'); // 'mobile' or 'email'
  
  // Phone login state
  const [selectedCountryCode, setSelectedCountryCode] = useState(COUNTRY_CODES[2]); // Default to India
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  
  // Email login/signup state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // OTP state
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState(OTP_TIMER_DURATION);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);
  
  // Tab state for mobile/email switching
  const [selectedTab, setSelectedTab] = useState('phone'); // 'phone', 'email'

  // Timer effect for OTP
  useEffect(() => {
    if (currentScreen === 'otpVerification' && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentScreen, timer]);

  // Navigation functions
  const handleBackPress = () => {
    switch (currentScreen) {
      case 'mobileLogin':
      case 'emailLogin':
        setCurrentScreen('loginOption');
        break;
      case 'otpVerification':
        setCurrentScreen('mobileLogin');
        break;
      case 'createAccount':
        setCurrentScreen('emailLogin');
        break;
      default:
        if (onSkip) {
          onSkip();
        }
        break;
    }
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    }
  };

  // Login option handlers
  const handleLoginOptionContinue = () => {
    if (selectedOption === 'mobile') {
      setCurrentScreen('mobileLogin');
      setSelectedTab('phone');
    } else {
      setCurrentScreen('emailLogin');
      setSelectedTab('email');
    }
  };

  // Tab switching handlers
  const handleTabPress = (tab) => {
    setSelectedTab(tab);
    if (tab === 'phone') {
      setCurrentScreen('mobileLogin');
    } else {
      setCurrentScreen('emailLogin');
    }
  };

  // Validation functions
  const validatePhoneNumber = () => {
    if (!phoneNumber || phoneNumber.trim().length === 0) {
      return false;
    }
    const phoneRegex = /^\d{10,15}$/;
    return phoneRegex.test(phoneNumber.trim());
  };

  const validateEmail = () => {
    if (!email || email.trim().length === 0) {
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim().toLowerCase());
  };

  const validatePassword = () => {
    if (!password || password.length === 0) {
      return false;
    }
    return password.length >= MIN_PASSWORD_LENGTH;
  };

  const validateName = () => {
    if (!name || name.trim().length === 0) {
      return false;
    }
    return name.trim().length >= MIN_NAME_LENGTH;
  };

  const isOtpComplete = () => {
    return otp.every(digit => digit.length === 1 && /^\d$/.test(digit));
  };

  const isFormValid = () => {
    return validateName() && 
           validateEmail() && 
           validatePassword() && 
           password === confirmPassword &&
           confirmPassword.length > 0;
  };

  // Phone login handlers
  const handlePhoneLogin = () => {
    if (!phoneNumber || phoneNumber.trim().length === 0) {
      Alert.alert('Missing Phone Number', 'Please enter your phone number');
      return;
    }
    
    if (!validatePhoneNumber()) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid phone number (10-15 digits)');
      return;
    }
    
    // Reset OTP state before moving to verification
    setOtp(new Array(OTP_LENGTH).fill(''));
    setTimer(OTP_TIMER_DURATION);
    setCanResend(false);
    setCurrentScreen('otpVerification');
  };

  // Email login handlers
  const handleEmailLogin = () => {
    if (!email || email.trim().length === 0) {
      Alert.alert('Missing Email', 'Please enter your email address');
      return;
    }
    
    if (!validateEmail()) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }
    
    if (!password || password.length === 0) {
      Alert.alert('Missing Password', 'Please enter your password');
      return;
    }
    
    if (!validatePassword()) {
      Alert.alert('Invalid Password', `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`);
      return;
    }
    
    // Simulate successful login
    Alert.alert('Login Successful', 'You have been logged in successfully', [
      {
        text: 'OK',
        onPress: () => {
          if (onAuthSuccess) {
            onAuthSuccess('email', { email: email.trim().toLowerCase() });
          }
        }
      }
    ]);
  };

  // OTP handlers
  const handleOtpChange = (value, index) => {
    // Only allow single digit numbers
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input if value entered and not last input
      if (value && index < OTP_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (e, index) => {
    // Handle backspace navigation
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = () => {
    if (!isOtpComplete()) {
      Alert.alert('Incomplete OTP', `Please enter the complete ${OTP_LENGTH}-digit verification code`);
      return;
    }

    const otpString = otp.join('');
    console.log('Verifying OTP:', otpString);
    
    // Simulate OTP verification
    Alert.alert('Success', 'Phone number verified successfully!', [
      {
        text: 'OK',
        onPress: () => {
          if (onAuthSuccess) {
            const fullPhoneNumber = selectedCountryCode.code + phoneNumber.trim();
            onAuthSuccess('phone', fullPhoneNumber);
          }
        }
      }
    ]);
  };

  const handleResendOtp = () => {
    if (!canResend) {
      Alert.alert('Please Wait', `You can resend the code in ${formatTime(timer)}`);
      return;
    }
    
    // Reset OTP and timer
    setOtp(new Array(OTP_LENGTH).fill(''));
    setTimer(OTP_TIMER_DURATION);
    setCanResend(false);
    
    // Focus first input after reset
    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 100);
    
    Alert.alert('OTP Sent', 'A new verification code has been sent to your phone number');
  };

  // Create account handlers
  const handleCreateAccount = () => {
    if (!validateName()) {
      Alert.alert('Invalid Name', `Please enter your name (at least ${MIN_NAME_LENGTH} characters)`);
      return;
    }
    
    if (!validateEmail()) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }
    
    if (!validatePassword()) {
      Alert.alert('Invalid Password', `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`);
      return;
    }
    
    if (!confirmPassword || confirmPassword.length === 0) {
      Alert.alert('Missing Confirmation', 'Please confirm your password');
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match. Please try again.');
      return;
    }
    
    // Simulate account creation
    Alert.alert('Account Created', 'Your account has been created successfully!', [
      {
        text: 'OK',
        onPress: () => {
          if (onAuthSuccess) {
            onAuthSuccess('signup', { 
              name: name.trim(), 
              email: email.trim().toLowerCase() 
            });
          }
        }
      }
    ]);
  };

  // Social authentication handlers
  const handleAppleSignIn = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user
      );

      if (credentialState === appleAuth.State.AUTHORIZED) {
        Alert.alert('Apple Sign-In Successful', 'You have been signed in with Apple successfully', [
          {
            text: 'OK',
            onPress: () => {
              if (onAuthSuccess) {
                onAuthSuccess('apple', appleAuthRequestResponse);
              }
            }
          }
        ]);
      } else {
        Alert.alert('Apple Sign-In Failed', 'Unable to verify Apple credentials. Please try again.');
      }
    } catch (error) {
      console.error('Apple Sign-In Error:', error);
      
      if (error.code === appleAuth.Error.CANCELED) {
        // User cancelled, no need to show error
        return;
      } else if (error.code === appleAuth.Error.FAILED) {
        Alert.alert('Apple Sign-In Failed', 'Unable to complete Apple Sign-In. Please try again.');
      } else if (error.code === appleAuth.Error.NOT_HANDLED) {
        Alert.alert('Apple Sign-In Error', 'Apple Sign-In is not available on this device.');
      } else {
        Alert.alert('Apple Sign-In Error', error.message || 'An unexpected error occurred during Apple Sign-In');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      // Configure Google Sign-In
      await GoogleSignin.configure({
        webClientId: 'YOUR_WEB_CLIENT_ID', // Replace with your actual web client ID
        offlineAccess: true,
      });

      // Check for Play Services availability
      await GoogleSignin.hasPlayServices({ 
        showPlayServicesUpdateDialog: true 
      });
      
      // Perform sign-in
      const userInfo = await GoogleSignin.signIn();
      
      Alert.alert('Google Sign-In Successful', `Welcome ${userInfo.user.name}!`, [
        {
          text: 'OK',
          onPress: () => {
            if (onAuthSuccess) {
              onAuthSuccess('google', userInfo);
            }
          }
        }
      ]);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // User cancelled, no need to show error
        return;
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Google Sign-In In Progress', 'Google Sign-In is already in progress. Please wait.');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Google Sign-In Error', 'Google Play Services is not available or needs to be updated.');
      } else {
        Alert.alert('Google Sign-In Error', error.message || 'An unexpected error occurred during Google Sign-In');
      }
    }
  };

  // Utility functions
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const sanitizeInput = (input, type = 'text') => {
    if (!input) return '';
    
    switch (type) {
      case 'email':
        return input.trim().toLowerCase();
      case 'phone':
        return input.replace(/[^\d]/g, '');
      case 'name':
        return input.trim().replace(/\s+/g, ' ');
      default:
        return input.trim();
    }
  };

  // Render functions for different screens
  const renderLoginOptionScreen = () => (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSkip} style={styles.backButton}>
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
        <TouchableOpacity style={styles.continueButton} onPress={handleLoginOptionContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  const renderMobileLoginScreen = () => (
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
              onChangeText={(text) => setPhoneNumber(sanitizeInput(text, 'phone'))}
              keyboardType="numeric"
              maxLength={15}
            />
          </View>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          style={[styles.loginButton, !validatePhoneNumber() && styles.disabledButton]}
          onPress={handlePhoneLogin}
          disabled={!validatePhoneNumber()}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  const renderEmailLoginScreen = () => (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Login to your account</Text>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
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

        {/* Form Fields */}
        <View style={styles.formContainer}>
          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#CCCCCC"
              value={email}
              onChangeText={(text) => setEmail(sanitizeInput(text, 'email'))}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
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
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.loginButton, (!validateEmail() || !validatePassword()) && styles.disabledButton]}
            onPress={handleEmailLogin}
            disabled={!validateEmail() || !validatePassword()}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          {/* Or Divider */}
          <View style={styles.orContainer}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>or log in with</Text>
            <View style={styles.orLine} />
          </View>

          {/* Social Login Buttons */}
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton} onPress={handleAppleSignIn}>
              <Icon name="apple" size={24} color="#000" />
              <Text style={styles.socialButtonText}>Sign in with Apple</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton} onPress={handleGoogleSignIn}>
              <Icon name="google" size={24} color="#000" />
              <Text style={styles.socialButtonText}>Sign in with Google</Text>
            </TouchableOpacity>
          </View>

          {/* Sign Up Link */}
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => setCurrentScreen('createAccount')}>
              <Text style={styles.signUpLink}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );

  const renderOTPVerificationScreen = () => (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Verify Phone Number</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Enter Verification Code</Text>
        <Text style={styles.subtitle}>
          We've sent a {OTP_LENGTH}-digit code to {selectedCountryCode.code}{phoneNumber}
        </Text>

        {/* OTP Input */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={[
                styles.otpInput,
                digit.length === 1 && styles.otpInputFilled
              ]}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="numeric"
              maxLength={1}
              textAlign="center"
            />
          ))}
        </View>

        {/* Timer and Resend */}
        <View style={styles.timerContainer}>
          {!canResend ? (
            <Text style={styles.timerText}>
              Resend code in {formatTime(timer)}
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResendOtp}>
              <Text style={styles.resendText}>Resend Code</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Verify Button */}
        <TouchableOpacity
          style={[styles.verifyButton, !isOtpComplete() && styles.disabledButton]}
          onPress={handleVerifyOtp}
          disabled={!isOtpComplete()}
        >
          <Text style={styles.verifyButtonText}>Verify</Text>
        </TouchableOpacity>

        {/* Change Number */}
        <TouchableOpacity onPress={handleBackPress} style={styles.changeNumberButton}>
          <Text style={styles.changeNumberText}>Change Phone Number</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  const renderCreateAccountScreen = () => (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Account</Text>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Create an account with email</Text>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          {/* Name Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              placeholderTextColor="#CCCCCC"
              value={name}
              onChangeText={(text) => setName(sanitizeInput(text, 'name'))}
              autoCapitalize="words"
            />
          </View>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#CCCCCC"
              value={email}
              onChangeText={(text) => setEmail(sanitizeInput(text, 'email'))}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
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
          </View>

          {/* Confirm Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Confirm your password"
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

          {/* Create Account Button */}
          <TouchableOpacity
            style={[styles.signUpButton, !isFormValid() && styles.disabledButton]}
            onPress={handleCreateAccount}
            disabled={!isFormValid()}
          >
            <Text style={styles.signUpButtonText}>Create Account</Text>
          </TouchableOpacity>

          {/* Or Divider */}
          <View style={styles.orContainer}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>or sign up with</Text>
            <View style={styles.orLine} />
          </View>

          {/* Social Sign Up Buttons */}
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton} onPress={handleAppleSignIn}>
              <Icon name="apple" size={24} color="#000" />
              <Text style={styles.socialButtonText}>Sign up with Apple</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton} onPress={handleGoogleSignIn}>
              <Icon name="google" size={24} color="#000" />
              <Text style={styles.socialButtonText}>Sign up with Google</Text>
            </TouchableOpacity>
          </View>

          {/* Sign In Link */}
          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => setCurrentScreen('emailLogin')}>
              <Text style={styles.signInLink}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

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

  // Main render function
  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'loginOption':
        return renderLoginOptionScreen();
      case 'mobileLogin':
        return renderMobileLoginScreen();
      case 'emailLogin':
        return renderEmailLoginScreen();
      case 'otpVerification':
        return renderOTPVerificationScreen();
      case 'createAccount':
        return renderCreateAccountScreen();
      default:
        return renderLoginOptionScreen();
    }
  };

  return (
    <View style={styles.mainContainer}>
      {renderCurrentScreen()}
      {renderCountryPicker()}
    </View>
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
  skipButton: {
    padding: 8,
  },
  skipText: {
    fontSize: 16,
    color: '#666',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  
  // Login Option Screen Styles
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
  
  // Tab Container Styles
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
  
  // Form Styles
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#fff',
  },
  
  // Phone Input Styles
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
  
  // Password Input Styles
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#000',
  },
  eyeIcon: {
    padding: 16,
  },
  
  // Button Styles
  loginButton: {
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  signUpButton: {
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  verifyButton: {
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Social Auth Styles
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  orText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: '#666',
  },
  socialContainer: {
    marginBottom: 30,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingVertical: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginLeft: 8,
  },
  
  // Sign Up/In Links
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  signUpText: {
    fontSize: 16,
    color: '#666',
  },
  signUpLink: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  signInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  signInText: {
    fontSize: 16,
    color: '#666',
  },
  signInLink: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  
  // OTP Styles
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  otpInput: {
    width: 45,
    height: 55,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    backgroundColor: '#fff',
  },
  otpInputFilled: {
    borderColor: '#000',
    backgroundColor: '#f8f8f8',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  timerText: {
    fontSize: 14,
    color: '#666',
  },
  resendText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  changeNumberButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  changeNumberText: {
    fontSize: 16,
    color: '#666',
    textDecorationLine: 'underline',
  },
  
  // Modal Styles
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
  
  // Main container
  mainContainer: {
    flex: 1,
  },
});

export default AuthenticationFlow;
