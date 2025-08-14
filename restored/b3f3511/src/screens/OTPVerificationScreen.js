import React, { useState, useEffect, useRef } from 'react';
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

const OTPVerificationScreen = ({ navigation, route, onClose }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);
  const phoneNumber = route?.params?.phoneNumber || '+91XXXXXXXXXX';

  useEffect(() => {
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
  }, []);

  const handleBackPress = () => {
    if (onClose) {
      onClose();
    } else if (navigation?.goBack) {
      navigation.goBack();
    }
  };

  const handleOtpChange = (value, index) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const isOtpComplete = () => {
    return otp.every(digit => digit.length === 1);
  };

  const handleVerify = () => {
    if (!isOtpComplete()) {
      Alert.alert('Incomplete OTP', 'Please enter the complete OTP');
      return;
    }

    const otpString = otp.join('');
    console.log('Verifying OTP:', otpString);
    
    // Simulate OTP verification
    Alert.alert('Success', 'Phone number verified successfully!', [
      {
        text: 'OK',
        onPress: () => {
          if (onClose) {
            onClose();
          } else if (navigation?.navigate) {
            navigation.navigate('Rewards'); // Or wherever you want to navigate after successful login
          }
        }
      }
    ]);
  };

  const handleResendOtp = () => {
    if (canResend) {
      setTimer(30);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      Alert.alert('OTP Sent', 'A new OTP has been sent to your phone number');
      
      // Reset timer
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
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
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
          We've sent a 6-digit code to {phoneNumber}
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
          onPress={handleVerify}
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
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
  verifyButton: {
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
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
});

export default OTPVerificationScreen;
