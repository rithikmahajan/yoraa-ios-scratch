import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { appleAuth } from '@invertase/react-native-apple-authentication';

const CreateAccountScreen = ({ navigation, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleBackPress = () => {
    if (onClose) {
      onClose();
    } else if (navigation?.goBack) {
      navigation.goBack();
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = () => {
    return password.length >= 6;
  };

  const handleSignUp = () => {
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
    
    Alert.alert('Account Created', 'Your account has been created successfully!', [
      {
        text: 'OK',
        onPress: () => {
          if (onClose) {
            onClose();
          } else if (navigation?.navigate) {
            navigation.navigate('Rewards');
          }
        }
      }
    ]);
  };

  const handleAppleSignUp = async () => {
    try {
      // Start the Apple sign-in request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      // Ensure Apple credential state is authorized
      const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

      if (credentialState === appleAuth.State.AUTHORIZED) {
        Alert.alert('Apple Sign-Up Successful', 'Your account has been created with Apple successfully');
        if (onClose) {
          onClose();
        }
      }
    } catch (error) {
      if (error.code === appleAuth.Error.CANCELED) {
        Alert.alert('Apple Sign-Up Cancelled', 'Apple Sign-Up was cancelled');
      } else {
        Alert.alert('Apple Sign-Up Error', error.message || 'An error occurred during Apple Sign-Up');
      }
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      // Configure Google Sign-In
      await GoogleSignin.configure({
        webClientId: 'YOUR_WEB_CLIENT_ID', // You'll need to add your actual web client ID
      });

      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      
      // Get the users ID token
      const userInfo = await GoogleSignin.signIn();
      
      Alert.alert('Google Sign-Up Successful', `Welcome ${userInfo.user.name}! Your account has been created.`);
      if (onClose) {
        onClose();
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Google Sign-Up Cancelled', 'Google Sign-Up was cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Google Sign-Up In Progress', 'Google Sign-Up is already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Google Sign-Up Error', 'Google Play Services is not available');
      } else {
        Alert.alert('Google Sign-Up Error', error.message || 'An error occurred during Google Sign-Up');
      }
    }
  };

  const handleSignIn = () => {
    if (navigation?.navigate) {
      navigation.navigate('EmailLoginScreen');
    }
  };

  const handleSkip = () => {
    if (onClose) {
      onClose();
    } else if (navigation?.goBack) {
      navigation.goBack();
    }
  };

  const isFormValid = () => {
    return name.trim() && validateEmail() && validatePassword() && password === confirmPassword;
  };

  return (
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
      <View style={styles.content}>
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
              onChangeText={setName}
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
              onChangeText={setEmail}
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

          {/* Sign Up Button */}
          <TouchableOpacity
            style={[styles.signUpButton, !isFormValid() && styles.disabledButton]}
            onPress={handleSignUp}
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
            <TouchableOpacity style={styles.socialButton} onPress={handleAppleSignUp}>
              <Icon name="apple" size={24} color="#000" />
              <Text style={styles.socialButtonText}>Sign up with Apple</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton} onPress={handleGoogleSignUp}>
              <Icon name="google" size={24} color="#000" />
              <Text style={styles.socialButtonText}>Sign up with Google</Text>
            </TouchableOpacity>
          </View>

          {/* Sign In Link */}
          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Already have an account? </Text>
            <TouchableOpacity onPress={handleSignIn}>
              <Text style={styles.signInLink}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    marginBottom: 30,
  },
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
  signUpButton: {
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
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
});

export default CreateAccountScreen;
