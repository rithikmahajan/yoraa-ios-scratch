import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Easing,
  ScrollView,
  TextInput,
  Image,
  Modal,
  Alert,
} from 'react-native';
import BackButton from '../components/BackButton';

// Dynamic import for image picker to handle cases where it might not be available
let ImagePicker;
try {
  ImagePicker = require('react-native-image-picker');
} catch (e) {
  console.warn('react-native-image-picker not available');
}

// Back arrow uses global BackButton component

// Star Rating Component
const StarRating = ({ rating, onRatingPress }) => {
  const stars = [1, 2, 3, 4, 5];
  
  return (
    <View style={styles.starContainer}>
      {stars.map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => onRatingPress(star)}
          style={styles.starButton}
        >
          <Text style={[
            styles.starText,
            star <= rating ? styles.starFilled : styles.starEmpty
          ]}>
            ★
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Camera Icon Component
const CameraIcon = () => (
  <View style={styles.cameraIconContainer}>
    <View style={styles.cameraBody} />
    <View style={styles.cameraLens} />
    <View style={styles.cameraFlash} />
  </View>
);

// Success Modal Component
const SuccessModal = ({ visible, onClose }) => (
  <Modal
    visible={visible}
    transparent={true}
    animationType="fade"
    onRequestClose={onClose}
  >
    <View style={styles.modalOverlay}>
      <View style={styles.successModalContainer}>
        <View style={styles.successIcon}>
          <Text style={styles.checkmark}>✓</Text>
        </View>
        <Text style={styles.successTitle}>Thank you for your feedback!</Text>
        <Text style={styles.successMessage}>
          Your feedback helps us improve our service and provide you with a better experience.
        </Text>
        <TouchableOpacity style={styles.doneButton} onPress={onClose}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const LoveUsRateUs = ({ navigation }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const slideAnim = useRef(new Animated.Value(300)).current;

  React.useEffect(() => {
    // Animate in with 300ms ease out
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  const handleBack = () => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 300,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      navigation.goBack();
    });
  };

  const handleImagePicker = () => {
    if (!ImagePicker) {
      Alert.alert('Feature Unavailable', 'Image picker is not available on this device.');
      return;
    }

    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel || response.error) {
        return;
      }

      if (response.assets && response.assets[0]) {
        const newImage = response.assets[0];
        setUploadedImages(prev => [...prev, newImage]);
      }
    });
  };

  const handleSubmitFeedback = () => {
    if (rating === 0) {
      Alert.alert('Rating Required', 'Please provide a rating before submitting.');
      return;
    }

    // Here you would typically send the data to your backend
    console.log('Submitting feedback:', {
      rating,
      feedback,
      images: uploadedImages.length
    });

    setShowSuccessModal(true);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    // Navigate back to ProfileScreen
    navigation.navigate('ProfileScreen');
  };

  const removeImage = (indexToRemove) => {
    setUploadedImages(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View 
        style={[
          styles.content,
          {
            transform: [{ translateX: slideAnim }]
          }
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <BackButton style={styles.backButton} onPress={handleBack} />
          <Text style={styles.headerTitle}>Submit your feedback</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Rating Section */}
          <View style={styles.ratingSection}>
            <Text style={styles.ratingTitle}>How would you rate your experience?</Text>
            <StarRating rating={rating} onRatingPress={setRating} />
            {rating > 0 && (
              <Text style={styles.ratingText}>
                {rating === 1 && "Poor"}
                {rating === 2 && "Fair"}
                {rating === 3 && "Good"}
                {rating === 4 && "Very Good"}
                {rating === 5 && "Excellent"}
              </Text>
            )}
          </View>

          {/* Feedback Input Section */}
          <View style={styles.feedbackSection}>
            <Text style={styles.feedbackTitle}>Tell us more about your experience</Text>
            <TextInput
              style={styles.feedbackInput}
              multiline={true}
              numberOfLines={6}
              placeholder="Share your thoughts, suggestions, or any issues you encountered..."
              value={feedback}
              onChangeText={setFeedback}
              placeholderTextColor="#999999"
              textAlignVertical="top"
            />
          </View>

          {/* Photo Upload Section */}
          <View style={styles.photoSection}>
            <Text style={styles.photoTitle}>Add photos (optional)</Text>
            
            {/* Uploaded Images Stack */}
            <View style={styles.imageStackContainer}>
              {uploadedImages.length > 0 ? (
                <View style={styles.imageStack}>
                  {uploadedImages.map((image, index) => (
                    <View 
                      key={index} 
                      style={[
                        styles.imageItem,
                        { 
                          zIndex: uploadedImages.length - index,
                          transform: [
                            { translateX: index * 5 },
                            { translateY: index * 5 },
                            { rotate: `${(index % 2 === 0 ? 1 : -1) * index * 2}deg` }
                          ]
                        }
                      ]}
                    >
                      <Image source={{ uri: image.uri }} style={styles.uploadedImage} />
                      <TouchableOpacity 
                        style={styles.removeImageButton}
                        onPress={() => removeImage(index)}
                      >
                        <Text style={styles.removeImageText}>×</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              ) : null}
              
              {/* Camera Button */}
              <TouchableOpacity 
                style={[
                  styles.cameraButton,
                  uploadedImages.length > 0 && styles.cameraButtonWithImages
                ]} 
                onPress={handleImagePicker}
              >
                <CameraIcon />
                <Text style={styles.cameraButtonText}>Add Photo</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmitFeedback}>
            <Text style={styles.submitButtonText}>Submit Feedback</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>

      {/* Success Modal */}
      <SuccessModal 
        visible={showSuccessModal} 
        onClose={handleSuccessModalClose} 
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  
  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
  },
  headerSpacer: {
    width: 40,
  },
  backArrowIcon: {
    width: 24,
    height: 24,
  },

  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },

  // Rating Section
  ratingSection: {
    alignItems: 'center',
    marginBottom: 32,
    paddingVertical: 20,
  },
  ratingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 20,
    textAlign: 'center',
  },
  starContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  starButton: {
    padding: 4,
    marginHorizontal: 8,
  },
  starText: {
    fontSize: 32,
  },
  starFilled: {
    color: '#FFD700',
  },
  starEmpty: {
    color: '#E0E0E0',
  },
  ratingText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
  },

  // Feedback Section
  feedbackSection: {
    marginBottom: 32,
  },
  feedbackTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
  },
  feedbackInput: {
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#000000',
    backgroundColor: '#FFFFFF',
    minHeight: 120,
  },

  // Photo Section
  photoSection: {
    marginBottom: 40,
  },
  photoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
  },
  imageStackContainer: {
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  imageStack: {
    position: 'relative',
    width: 100,
    height: 100,
  },
  imageItem: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
  },
  removeImageButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeImageText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cameraButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    borderRadius: 12,
    backgroundColor: '#F8F8F8',
    minWidth: 120,
  },
  cameraButtonWithImages: {
    position: 'absolute',
    bottom: -20,
    right: -20,
    minWidth: 80,
    padding: 12,
    borderStyle: 'solid',
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  cameraIconContainer: {
    width: 32,
    height: 24,
    marginBottom: 8,
    position: 'relative',
  },
  cameraBody: {
    width: 28,
    height: 20,
    backgroundColor: '#666666',
    borderRadius: 4,
    position: 'absolute',
    top: 4,
  },
  cameraLens: {
    width: 12,
    height: 12,
    backgroundColor: '#333333',
    borderRadius: 6,
    position: 'absolute',
    top: 8,
    left: 8,
  },
  cameraFlash: {
    width: 4,
    height: 4,
    backgroundColor: '#999999',
    borderRadius: 2,
    position: 'absolute',
    top: 0,
    left: 4,
  },
  cameraButtonText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },

  // Submit Button
  submitButton: {
    backgroundColor: '#000000',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 40,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successModalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    marginHorizontal: 32,
    maxWidth: 320,
  },
  successIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkmark: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  doneButton: {
    backgroundColor: '#000000',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 32,
    minWidth: 120,
    alignItems: 'center',
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default LoveUsRateUs;
