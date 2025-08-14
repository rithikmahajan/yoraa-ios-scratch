import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Linking,
  Alert,
  Modal,
  Dimensions,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const { height: screenHeight } = Dimensions.get('window');

// Back Arrow Icon Component
const BackArrowIcon = () => (
  <View style={styles.backArrowIcon}>
    <View style={styles.arrowPath}>
      <View style={styles.arrowLine1} />
      <View style={styles.arrowLine2} />
    </View>
  </View>
);

// Phone Icon Component
const PhoneIcon = () => (
  <View style={styles.phoneIcon}>
    <View style={styles.phoneBody} />
    <View style={styles.phoneEarpiece} />
  </View>
);

// Send Icon Component
const SendIcon = () => (
  <View style={styles.sendIcon}>
    <View style={styles.sendArrow} />
    <View style={styles.sendArrowHead1} />
    <View style={styles.sendArrowHead2} />
  </View>
);

// Photo Icon Component
const PhotoIcon = () => (
  <View style={styles.photoIcon}>
    <View style={styles.photoFrame} />
    <View style={styles.photoLens} />
  </View>
);

// Microphone Icon Component
const MicrophoneIcon = () => (
  <View style={styles.microphoneIcon}>
    <View style={styles.micBody} />
    <View style={styles.micBase} />
    <View style={styles.micStand} />
  </View>
);

// Location Pin Icon Component
const LocationIcon = () => (
  <View style={styles.locationIcon}>
    <View style={styles.locationPin}>
      <View style={styles.locationDot} />
    </View>
  </View>
);

// Star Rating Component
const StarIcon = ({ filled, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.starContainer}>
    <Text style={[styles.starText, filled && styles.filledStarText]}>
      ★
    </Text>
  </TouchableOpacity>
);

const ContactUsScreen = ({ navigation, visible = true }) => {
  const slideAnim = useRef(new Animated.Value(300)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const chatSlideAnim = useRef(new Animated.Value(300)).current;
  const ratingModalAnim = useRef(new Animated.Value(0)).current;
  const thankYouModalAnim = useRef(new Animated.Value(0)).current;
  
  const [currentView, setCurrentView] = useState('modal'); // 'modal', 'chat', or 'rating'
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello, good morning.', sender: 'support', time: 'Today' },
    { id: 2, text: 'I am a Customer Service, is there anything I can help you with?', sender: 'support', time: '10:41 pm' },
  ]);
  const [messageText, setMessageText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);

  useEffect(() => {
    if (visible && currentView === 'modal') {
      // Animate in modal with 250ms ease in from bottom
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 250,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 250,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [slideAnim, opacityAnim, visible, currentView]);

  const handleClose = () => {
    if (currentView === 'chat') {
      // Animate chat out to the right with 300ms ease in
      Animated.timing(chatSlideAnim, {
        toValue: 300,
        duration: 300,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        setCurrentView('modal');
        chatSlideAnim.setValue(300);
      });
    } else {
      // Animate modal out with 250ms ease out to bottom
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 300,
          duration: 250,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 250,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        })
      ]).start(() => {
        navigation.goBack();
      });
    }
  };

  const handleBackdropPress = () => {
    handleClose();
  };

  const handleEmailPress = () => {
    const email = 'contact@yoraa.in';
    const subject = 'Contact Inquiry';
    const body = 'Hello Yoraa Team,\n\nI would like to inquire about...\n\nBest regards,';
    
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    Linking.canOpenURL(mailtoUrl).then((supported) => {
      if (supported) {
        Linking.openURL(mailtoUrl);
      } else {
        Alert.alert(
          'Email App Not Available',
          'Please send an email to contact@yoraa.in',
          [{ text: 'OK' }]
        );
      }
    });
  };

  const handleCustomerSupport = () => {
    // Navigate to chat screen with slide in from right animation
    setCurrentView('chat');
    chatSlideAnim.setValue(300);
    Animated.timing(chatSlideAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: messageText.trim(),
        sender: 'user',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setMessageText('');
    }
  };

  const handlePhotoUpload = () => {
    Alert.alert(
      'Upload Photo',
      'Choose an option',
      [
        { text: 'Camera', onPress: () => console.log('Open Camera') },
        { text: 'Gallery', onPress: () => console.log('Open Gallery') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleVoiceInput = () => {
    if (isRecording) {
      setIsRecording(false);
      // Stop recording and convert to text
      console.log('Stop recording');
    } else {
      setIsRecording(true);
      // Start recording
      console.log('Start recording');
    }
  };

  // Function to simulate admin ending the chat
  const handleChatEnded = () => {
    setShowRatingModal(true);
    // Animate rating modal in with dissolve ease in 250ms
    Animated.timing(ratingModalAnim, {
      toValue: 1,
      duration: 250,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const handleRatingSelect = (rating) => {
    setSelectedRating(rating);
  };

  const handleRatingSubmit = () => {
    // Animate rating modal out
    Animated.timing(ratingModalAnim, {
      toValue: 0,
      duration: 250,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      setShowRatingModal(false);
      setSelectedRating(0);
      
      // Show thank you modal with dissolve ease in 250ms
      setShowThankYouModal(true);
      Animated.timing(thankYouModalAnim, {
        toValue: 1,
        duration: 250,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start();
    });
  };

  const handleContinueShopping = () => {
    // Animate thank you modal out
    Animated.timing(thankYouModalAnim, {
      toValue: 0,
      duration: 250,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      setShowThankYouModal(false);
      // Close the ContactUs modal and return to Profile
      if (navigation && navigation.goBack) {
        navigation.goBack();
      }
    });
  };

  const handlePhoneCall = () => {
    const phoneNumber = 'tel:+911234567890';
    Linking.canOpenURL(phoneNumber).then((supported) => {
      if (supported) {
        Linking.openURL(phoneNumber);
      } else {
        Alert.alert(
          'Phone App Not Available',
          'Please call +91 123 456 7890',
          [{ text: 'OK' }]
        );
      }
    });
  };

  const renderChatScreen = () => (
    <Animated.View 
      style={[
        styles.chatContainer,
        {
          transform: [{ translateX: chatSlideAnim }]
        }
      ]}
    >
      {/* Chat Header */}
      <View style={styles.chatHeader}>
        <TouchableOpacity style={styles.backButton} onPress={handleClose}>
          <BackArrowIcon />
        </TouchableOpacity>
        <Text style={styles.chatHeaderTitle}>Customer Support</Text>
        <TouchableOpacity style={styles.phoneButton} onPress={handlePhoneCall}>
          <PhoneIcon />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
        {messages.map((message) => (
          <View key={message.id} style={styles.messageGroup}>
            {message.time && (
              <Text style={styles.messageTime}>{message.time}</Text>
            )}
            <View style={[
              styles.messageBubble,
              message.sender === 'user' ? styles.userMessage : styles.supportMessage
            ]}>
              <Text style={[
                styles.messageText,
                message.sender === 'user' ? styles.userMessageText : styles.supportMessageText
              ]}>
                {message.text}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Test Button to Simulate Admin Ending Chat */}
      <TouchableOpacity 
        style={styles.testEndChatButton}
        onPress={handleChatEnded}
      >
        <Text style={styles.testEndChatText}>End Chat (Admin)</Text>
      </TouchableOpacity>

      {/* Input Area */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <View style={styles.inputRow}>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              value={messageText}
              onChangeText={setMessageText}
              placeholder="Write your message..."
              placeholderTextColor="#999999"
              multiline
              onSubmitEditing={handleSendMessage}
            />
            <TouchableOpacity style={styles.photoButton} onPress={handlePhotoUpload}>
              <PhotoIcon />
            </TouchableOpacity>
          </View>
          <TouchableOpacity 
            style={[
              styles.micButton, 
              isRecording && styles.micButtonActive,
              messageText.trim() && styles.sendButton
            ]} 
            onPress={messageText.trim() ? handleSendMessage : handleVoiceInput}
          >
            {messageText.trim() ? <SendIcon /> : <MicrophoneIcon />}
          </TouchableOpacity>
        </View>
        <View style={styles.bottomIndicator} />
      </KeyboardAvoidingView>
    </Animated.View>
  );

  if (currentView === 'chat') {
    return (
      <Modal
        visible={visible}
        transparent={false}
        animationType="none"
        onRequestClose={handleClose}
      >
        {renderChatScreen()}
        {/* Rating Modal Overlay */}
        {showRatingModal && (
          <Animated.View 
            style={[
              styles.ratingModalOverlay,
              {
                opacity: ratingModalAnim,
              }
            ]}
          >
            <View style={styles.ratingModal}>
              <Text style={styles.ratingTitle}>How would you rate the support?</Text>
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    filled={star <= selectedRating}
                    onPress={() => handleRatingSelect(star)}
                  />
                ))}
              </View>
              <TouchableOpacity 
                style={styles.ratingSubmitButton}
                onPress={handleRatingSubmit}
              >
                <Text style={styles.ratingSubmitText}>Of course...</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
        {/* Thank You Modal Overlay */}
        {showThankYouModal && (
          <Animated.View 
            style={[
              styles.thankYouModalOverlay,
              {
                opacity: thankYouModalAnim,
              }
            ]}
          >
            <View style={styles.thankYouModal}>
              <Text style={styles.thankYouTitle}>Thanks for contacting support !</Text>
              <Text style={styles.thankYouSubtitle}>
                It should take 1-2 days to review your submission.
              </Text>
              <TouchableOpacity 
                style={styles.continueShoppingButton}
                onPress={handleContinueShopping}
              >
                <Text style={styles.continueShoppingText}>Continue Shopping</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
      </Modal>
    );
  }

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={handleClose}
    >
      <TouchableOpacity 
        style={styles.overlay} 
        activeOpacity={1}
        onPress={handleBackdropPress}
      >
        <Animated.View 
          style={[
            styles.backdrop,
            {
              opacity: opacityAnim
            }
          ]}
        />
        <Animated.View 
          style={[
            styles.modalContainer,
            {
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
            {/* Top Handle */}
            <View style={styles.handle} />

            {/* Location Icon */}
            <View style={styles.iconContainer}>
              <LocationIcon />
            </View>

            {/* Office Address */}
            <View style={styles.addressContainer}>
              <Text style={styles.addressLabel}>Office address :</Text>
              <Text style={styles.addressText}>
                FORUM DLF CYBER CITY, PHASE 3 , SECTOR 24, DLF QE, 
                Dlf Qe, Gurgaon- 122002, Haryana
              </Text>
            </View>

            {/* Email */}
            <View style={styles.emailContainer}>
              <Text style={styles.emailLabel}>Email: </Text>
              <TouchableOpacity onPress={handleEmailPress}>
                <Text style={styles.emailLink}>contact@yoraa.in</Text>
              </TouchableOpacity>
            </View>

            {/* Support Hours */}
            <Text style={styles.supportHours}>
              We're here to help Monday to friday 10 AM - 4 PM IST
            </Text>

            {/* Contact Customer Support Button */}
            <TouchableOpacity 
              style={styles.supportButton}
              onPress={handleCustomerSupport}
            >
              <Text style={styles.supportButtonText}>Contact Customer Support</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
    minHeight: 320,
    alignItems: 'center',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginBottom: 20,
  },
  iconContainer: {
    marginBottom: 30,
  },
  locationIcon: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationPin: {
    width: 40,
    height: 50,
    backgroundColor: '#000000',
    borderRadius: 20,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  locationDot: {
    width: 12,
    height: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    marginTop: -5,
  },
  addressContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  addressLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  addressText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 280,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  emailLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  emailLink: {
    fontSize: 16,
    color: '#000000',
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  supportHours: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
    marginBottom: 30,
    maxWidth: 250,
  },
  supportButton: {
    backgroundColor: '#000000',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 40,
    minWidth: 280,
    alignItems: 'center',
  },
  supportButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Chat Screen Styles
  chatContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatHeaderTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    marginHorizontal: 24,
  },
  phoneButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#F8F8F8',
  },
  messageGroup: {
    marginBottom: 20,
  },
  messageTime: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
    marginBottom: 10,
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    marginBottom: 5,
  },
  supportMessage: {
    backgroundColor: '#E8E8E8',
    alignSelf: 'flex-start',
  },
  userMessage: {
    backgroundColor: '#000000',
    alignSelf: 'flex-end',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  supportMessageText: {
    color: '#000000',
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 30,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 40,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    maxHeight: 100,
    paddingVertical: 8,
  },
  photoButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  micButton: {
    width: 44,
    height: 44,
    backgroundColor: '#000000',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  micButtonActive: {
    backgroundColor: '#FF3333',
  },
  sendButton: {
    backgroundColor: '#007AFF',
  },
  bottomIndicator: {
    width: 134,
    height: 5,
    backgroundColor: '#000000',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginTop: 15,
  },
  
  // Icon Styles
  backArrowIcon: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowPath: {
    position: 'relative',
  },
  arrowLine1: {
    position: 'absolute',
    width: 8,
    height: 1,
    backgroundColor: '#000000',
    transform: [{ rotate: '-45deg' }],
    top: -2,
    right: 2,
  },
  arrowLine2: {
    position: 'absolute',
    width: 8,
    height: 1,
    backgroundColor: '#000000',
    transform: [{ rotate: '45deg' }],
    top: 2,
    right: 2,
  },
  phoneIcon: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneBody: {
    width: 16,
    height: 16,
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 3,
    transform: [{ rotate: '15deg' }],
  },
  phoneEarpiece: {
    position: 'absolute',
    width: 8,
    height: 2,
    backgroundColor: '#000000',
    borderRadius: 1,
    top: 2,
    left: 6,
    transform: [{ rotate: '15deg' }],
  },
  sendIcon: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendArrow: {
    width: 14,
    height: 1,
    backgroundColor: '#FFFFFF',
    transform: [{ rotate: '45deg' }],
  },
  sendArrowHead1: {
    position: 'absolute',
    width: 6,
    height: 1,
    backgroundColor: '#FFFFFF',
    transform: [{ rotate: '20deg' }],
    top: 7,
    right: 2,
  },
  sendArrowHead2: {
    position: 'absolute',
    width: 6,
    height: 1,
    backgroundColor: '#FFFFFF',
    transform: [{ rotate: '70deg' }],
    top: 11,
    right: 2,
  },
  photoIcon: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoFrame: {
    width: 18,
    height: 14,
    borderWidth: 1.5,
    borderColor: '#666666',
    borderRadius: 2,
  },
  photoLens: {
    position: 'absolute',
    width: 6,
    height: 6,
    backgroundColor: '#666666',
    borderRadius: 3,
    top: 4,
    left: 7,
  },
  microphoneIcon: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  micBody: {
    width: 8,
    height: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  micBase: {
    position: 'absolute',
    width: 12,
    height: 8,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 6,
    top: 10,
  },
  micStand: {
    position: 'absolute',
    width: 1,
    height: 4,
    backgroundColor: '#FFFFFF',
    top: 16,
  },
  // Test button styles
  testEndChatButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  testEndChatText: {
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
  },
  // Rating Modal Styles
  ratingModalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 32,
    marginHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  ratingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 24,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  starContainer: {
    marginHorizontal: 4,
    padding: 4,
  },
  starText: {
    fontSize: 32,
    color: '#E0E0E0',
  },
  filledStarText: {
    color: '#FFD700', // Gold color for filled stars
  },
  ratingSubmitButton: {
    backgroundColor: '#E8E8E8',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  ratingSubmitText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
  },
  // Thank You Modal Styles
  thankYouModalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thankYouModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 40,
    marginHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
    minWidth: 300,
  },
  thankYouTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 16,
  },
  thankYouSubtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 32,
  },
  continueShoppingButton: {
    backgroundColor: '#000000',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
    minWidth: 200,
  },
  continueShoppingText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default ContactUsScreen;
