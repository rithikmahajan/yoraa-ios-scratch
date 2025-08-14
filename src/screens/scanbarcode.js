import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Modal,
  TextInput,
  Easing,
} from 'react-native';
import { Colors, FontSizes, FontWeights, Spacing, BorderRadius } from '../constants';
import BackButton from '../components/BackButton';

const { width, height } = Dimensions.get('window');

// Main Barcode Scanner Screen with instructions
const BarcodeInstructionScreen = ({ navigation }) => {
  const slideAnim = useRef(new Animated.Value(width)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  const handleGoBack = () => {
    Animated.timing(slideAnim, {
      toValue: width,
      duration: 300,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      navigation.goBack();
    });
  };

  const handleNextTip = () => {
    Animated.timing(slideAnim, {
      toValue: -width,
      duration: 300,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate('ManualProductNumber');
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <Animated.View 
        style={[
          styles.screenContainer,
          { transform: [{ translateX: slideAnim }] }
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <BackButton style={styles.backButton} onPress={handleGoBack} />
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>SCAN THE PRICE TAG TO{'\n'}EXPLORE AN ITEM</Text>
          
          <Text style={styles.description}>
            Align the price tag within the screen frame{'\n'}
            and make sure the code is legible. A{'\n'}
            successful scan gives you product{'\n'}
            information such as availability and{'\n'}
            customer reviews
          </Text>
        </View>

        {/* Next Tip Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.nextButton} onPress={handleNextTip}>
            <Text style={styles.nextButtonText}>Next Tip</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

// Manual Product Number Screen
const ManualProductNumberScreen = ({ navigation }) => {
  const slideAnim = useRef(new Animated.Value(width)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  const handleGoBack = () => {
    Animated.timing(slideAnim, {
      toValue: width,
      duration: 300,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      navigation.goBack();
    });
  };

  const handleStartScanning = () => {
    Animated.timing(slideAnim, {
      toValue: -width,
      duration: 300,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate('CameraScanning');
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <Animated.View 
        style={[
          styles.screenContainer,
          { transform: [{ translateX: slideAnim }] }
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <BackButton style={styles.backButton} onPress={handleGoBack} />
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>MANUALLY ADDING{'\n'}PRODUCT NUMBER</Text>
          
          <Text style={styles.description}>
            You'll find the 14 digit product number on{'\n'}
            the lower right side of the tag
          </Text>
        </View>

        {/* Start Scanning Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.startScanningButton} onPress={handleStartScanning}>
            <Text style={styles.startScanningButtonText}>Start Scanning</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

// Camera Scanning Screen
const CameraScanningScreen = ({ navigation }) => {
  const slideAnim = useRef(new Animated.Value(width)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  const handleGoBack = () => {
    Animated.timing(slideAnim, {
      toValue: width,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate('Search');
    });
  };

  const handleProductNumber = () => {
    Animated.timing(slideAnim, {
      toValue: -height,
      duration: 300,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate('EnterGTIN');
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      <Animated.View 
        style={[
          styles.cameraContainer,
          { transform: [{ translateX: slideAnim }] }
        ]}
      >
        {/* Header */}
        <View style={styles.cameraHeader}>
          <BackButton style={styles.cameraBackButton} onPress={handleGoBack} />
        </View>

        {/* Camera Frame */}
        <View style={styles.cameraContent}>
          <Text style={styles.cameraInstruction}>Fit the code within the frame of the screen</Text>
          
          <View style={styles.scanFrame}>
            <View style={styles.scanArea} />
            <View style={styles.zoomControls}>
              <Text style={styles.zoomText}>1X</Text>
              <Text style={styles.zoomText}>1.5X</Text>
              <Text style={styles.zoomText}>2X</Text>
            </View>
          </View>
          
          <Text style={styles.scanResult}>
            A successful scan will show the results on{'\n'}
            the screen
          </Text>
        </View>

        {/* Product Number Button */}
        <View style={styles.cameraButtonContainer}>
          <TouchableOpacity style={styles.productNumberButton} onPress={handleProductNumber}>
            <Text style={styles.productNumberButtonText}>Product Number</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

// Enter GTIN Screen
const EnterGTINScreen = ({ navigation }) => {
  const [gtinNumber, setGtinNumber] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const slideAnim = useRef(new Animated.Value(height)).current;
  const modalOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  const handleGoBack = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      navigation.goBack();
    });
  };

  const handleContinue = () => {
    if (gtinNumber.trim()) {
      setShowSuccessModal(true);
      Animated.timing(modalOpacity, {
        toValue: 1,
        duration: 250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  };

  const handleDone = () => {
    Animated.timing(modalOpacity, {
      toValue: 0,
      duration: 250,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      setShowSuccessModal(false);
      navigation.navigate('Search');
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <Animated.View 
        style={[
          styles.screenContainer,
          { transform: [{ translateY: slideAnim }] }
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <BackButton style={styles.backButton} onPress={handleGoBack} />
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>PLEASE ENTER EITHER 14 DIGIT GTIN</Text>
          
          <Text style={styles.description}>
            You will find it on the lower right{'\n'}
            side of the tag
          </Text>

          {/* GTIN Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.gtinInput}
              placeholder="GTIN Number"
              placeholderTextColor={Colors.textTertiary}
              value={gtinNumber}
              onChangeText={setGtinNumber}
              keyboardType="numeric"
              maxLength={14}
            />
          </View>
        </View>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[
              styles.continueButton, 
              gtinNumber.trim() ? styles.continueButtonEnabled : styles.continueButtonDisabled
            ]} 
            onPress={handleContinue}
            disabled={!gtinNumber.trim()}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        transparent={true}
        animationType="none"
      >
        <View style={styles.modalOverlay}>
          <Animated.View 
            style={[
              styles.successModal,
              { opacity: modalOpacity }
            ]}
          >
            <View style={styles.checkIcon}>
              <Text style={styles.checkMark}>✓</Text>
            </View>
            
            <Text style={styles.successTitle}>GTIN verified successfully</Text>
            <Text style={styles.successDescription}>Taking you to the product</Text>
            
            <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

// Main component that manages screen flow
const ScanBarcodeFlow = ({ navigation, route }) => {
  const [currentStep, setCurrentStep] = useState('instruction');

  const flowNavigation = {
    ...navigation,
    navigate: (screenName, params) => {
      switch (screenName) {
        case 'ManualProductNumber':
          setCurrentStep('manual');
          break;
        case 'CameraScanning':
          setCurrentStep('camera');
          break;
        case 'EnterGTIN':
          setCurrentStep('gtin');
          break;
        case 'Search':
          navigation.goBack();
          break;
        default:
          navigation.navigate(screenName, params);
      }
    },
    goBack: () => {
      switch (currentStep) {
        case 'manual':
          setCurrentStep('instruction');
          break;
        case 'camera':
          setCurrentStep('manual');
          break;
        case 'gtin':
          setCurrentStep('camera');
          break;
        default:
          navigation.goBack();
      }
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'instruction':
        return <BarcodeInstructionScreen navigation={flowNavigation} />;
      case 'manual':
        return <ManualProductNumberScreen navigation={flowNavigation} />;
      case 'camera':
        return <CameraScanningScreen navigation={flowNavigation} />;
      case 'gtin':
        return <EnterGTINScreen navigation={flowNavigation} />;
      default:
        return <BarcodeInstructionScreen navigation={flowNavigation} />;
    }
  };

  return renderCurrentStep();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    paddingTop: Spacing.xl,
  },
  cameraHeader: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    paddingTop: Spacing.xl,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  cameraBackButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  
  
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  cameraContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  title: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  description: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  cameraInstruction: {
    fontSize: FontSizes.md,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  scanFrame: {
    alignItems: 'center',
    marginVertical: Spacing.xl,
  },
  scanArea: {
    width: 200,
    height: 280,
    borderWidth: 2,
    borderColor: '#666666',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: Spacing.lg,
  },
  zoomControls: {
    flexDirection: 'row',
    gap: Spacing.lg,
  },
  zoomText: {
    color: '#FFFFFF',
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
  },
  scanResult: {
    fontSize: FontSizes.md,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: Spacing.xl,
  },
  buttonContainer: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  cameraButtonContainer: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  nextButton: {
    backgroundColor: Colors.background,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.xxl,
    borderWidth: 1,
    borderColor: Colors.textPrimary,
  },
  nextButtonText: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  startScanningButton: {
    backgroundColor: Colors.textPrimary,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.xxl,
  },
  startScanningButtonText: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
    color: Colors.background,
    textAlign: 'center',
  },
  productNumberButton: {
    backgroundColor: 'transparent',
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.xxl,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  productNumberButtonText: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginTop: Spacing.xl,
  },
  gtinInput: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.md,
    fontSize: FontSizes.md,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: Colors.background,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.xxl,
    borderWidth: 1,
    borderColor: Colors.textPrimary,
  },
  continueButtonEnabled: {
    opacity: 1,
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  continueButtonText: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successModal: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    marginHorizontal: Spacing.xl,
    minWidth: 300,
  },
  checkIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  checkMark: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: FontWeights.bold,
  },
  successTitle: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semiBold,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  successDescription: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  doneButton: {
    backgroundColor: Colors.textPrimary,
    paddingHorizontal: Spacing.xxl,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.xxl,
    minWidth: 200,
  },
  doneButtonText: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
    color: Colors.background,
    textAlign: 'center',
  },
});

export default ScanBarcodeFlow;
