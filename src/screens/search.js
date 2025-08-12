import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
  Alert,
  Animated,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { Colors, FontSizes, FontWeights, Spacing, BorderRadius } from '../constants';
import { MicrophoneIcon, CameraIcon, ScanBarcodeIcon, SearchIcon } from '../assets/icons';

// Sample search suggestions - moved outside component to prevent re-renders
const ALL_SUGGESTIONS = [
  'socks',
  'white socks',
  'mens socks',
  'crew socks',
  'womens socks',
  'ankle socks',
  'kids socks',
  'black socks',
  'sports socks',
  'cotton socks',
  'wool socks',
  'running socks',
  'dress socks',
  'tube socks',
  'no show socks'
];

const SearchScreen = ({ navigation, onClose }) => {
  const [searchText, setSearchText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  
  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').height)).current;
  const modalSlideAnim = useRef(new Animated.Value(Dimensions.get('window').height)).current;

  useEffect(() => {
    // Animate screen entrance
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  useEffect(() => {
    // Filter suggestions based on search text
    if (searchText.trim()) {
      const filtered = ALL_SUGGESTIONS.filter(suggestion =>
        suggestion.toLowerCase().includes(searchText.toLowerCase())
      );
      setSearchSuggestions(filtered);
    } else {
      setSearchSuggestions([]);
    }
  }, [searchText]);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: Dimensions.get('window').height,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      if (navigation && navigation.goBack) {
        navigation.goBack();
      } else if (onClose) {
        onClose();
      }
    });
  };

  const handleVoiceSearch = () => {
    setIsListening(!isListening);
    setIsRecording(!isRecording);
    
    // Mock voice recognition - in real app, integrate with speech-to-text
    if (!isListening) {
      setTimeout(() => {
        setSearchText('socks');
        setIsListening(false);
        setIsRecording(false);
      }, 2000);
    }
  };

  const handleCameraPress = () => {
    setShowCameraModal(true);
    Animated.timing(modalSlideAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const handleCloseCameraModal = () => {
    Animated.timing(modalSlideAnim, {
      toValue: Dimensions.get('window').height,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setShowCameraModal(false);
    });
  };

  const handleScanBarcode = () => {
    Alert.alert('Barcode Scanner', 'Barcode scanning functionality would be implemented here');
  };

  const handleSuggestionPress = (suggestion) => {
    setSearchText(suggestion);
    // Handle search action here
    Alert.alert('Search', `Searching for: ${suggestion}`);
  };

  const handleTakePhoto = () => {
    Alert.alert('Camera', 'Take photo functionality would be implemented here');
    handleCloseCameraModal();
  };

  const handleChooseFromLibrary = () => {
    Alert.alert('Photo Library', 'Choose from library functionality would be implemented here');
    handleCloseCameraModal();
  };

  const renderSuggestionItem = ({ item }) => (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => handleSuggestionPress(item)}
    >
      <Text style={styles.suggestionText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <Animated.View 
        style={[
          styles.searchContainer, 
          { transform: [{ translateY: slideAnim }] }
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.searchInputContainer}>
            <View style={styles.searchIcon}>
              <SearchIcon size={20} color={Colors.textTertiary} />
            </View>
            
            <TextInput
              style={styles.searchInput}
              placeholder="Search Product"
              placeholderTextColor={Colors.textTertiary}
              value={searchText}
              onChangeText={setSearchText}
              autoFocus={true}
              returnKeyType="search"
            />
            
            <TouchableOpacity 
              style={styles.micButton}
              onPress={handleVoiceSearch}
            >
              <MicrophoneIcon 
                color={isRecording ? Colors.primary : Colors.textSecondary} 
                width={20}
                height={20}
              />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={handleCameraPress}>
            <CameraIcon color={Colors.textPrimary} width={24} height={24} />
            <Text style={styles.actionButtonText}>Camera</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleScanBarcode}>
            <ScanBarcodeIcon color={Colors.textPrimary} width={24} height={24} />
            <Text style={styles.actionButtonText}>Scan Barcode</Text>
          </TouchableOpacity>
        </View>

        {/* Search Suggestions */}
        {searchSuggestions.length > 0 && (
          <FlatList
            data={searchSuggestions}
            renderItem={renderSuggestionItem}
            keyExtractor={(item, index) => index.toString()}
            style={styles.suggestionsList}
            showsVerticalScrollIndicator={false}
          />
        )}

        {/* Voice Recording Indicator */}
        {isRecording && (
          <View style={styles.recordingIndicator}>
            <View style={styles.recordingDot} />
            <Text style={styles.recordingText}>Listening...</Text>
          </View>
        )}
      </Animated.View>

      {/* Camera Modal */}
      <Modal
        visible={showCameraModal}
        transparent={true}
        animationType="none"
        onRequestClose={handleCloseCameraModal}
      >
        <View style={styles.modalOverlay}>
          <Animated.View 
            style={[
              styles.cameraModal,
              { transform: [{ translateY: modalSlideAnim }] }
            ]}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Search with an image</Text>
              <Text style={styles.modalDescription}>
                By confirming the photo, you confirm that you own the photo and have the right to send it to us. You also consent that we may use this image as it may contain personal information
              </Text>
              
              <TouchableOpacity style={styles.modalButton} onPress={handleTakePhoto}>
                <Text style={styles.modalButtonText}>Take Photo</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalButtonSecondary]} 
                onPress={handleChooseFromLibrary}
              >
                <Text style={[styles.modalButtonText, styles.modalButtonSecondaryText]}>
                  Choose From Library
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.modalCancelButton} onPress={handleCloseCameraModal}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    paddingTop: Spacing.xl,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: BorderRadius.xl,
    paddingHorizontal: Spacing.lg,
    marginRight: Spacing.lg,
    height: 48,
  },
  searchIcon: {
    marginRight: Spacing.md,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSizes.md,
    color: Colors.textPrimary,
    fontWeight: FontWeights.normal,
  },
  micButton: {
    padding: Spacing.xs,
    marginLeft: Spacing.sm,
  },
  cancelButton: {
    paddingVertical: Spacing.sm,
  },
  cancelText: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    fontWeight: FontWeights.normal,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
    gap: Spacing.lg,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.xxl,
    borderWidth: 1,
    borderColor: Colors.border,
    flex: 1,
    minHeight: 52,
  },
  actionButtonText: {
    fontSize: FontSizes.md,
    color: Colors.textPrimary,
    fontWeight: FontWeights.medium,
    marginLeft: Spacing.sm,
  },
  suggestionsList: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  suggestionItem: {
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  suggestionText: {
    fontSize: FontSizes.md,
    color: Colors.textPrimary,
    fontWeight: FontWeights.normal,
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.lg,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginRight: Spacing.sm,
  },
  recordingText: {
    fontSize: FontSizes.md,
    color: Colors.primary,
    fontWeight: FontWeights.medium,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  cameraModal: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    minHeight: 300,
  },
  modalContent: {
    padding: Spacing.xl,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semiBold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: Spacing.xl,
  },
  modalButton: {
    width: '100%',
    backgroundColor: Colors.info,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
  },
  modalButtonSecondary: {
    backgroundColor: Colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  modalButtonText: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
    color: Colors.background,
    textAlign: 'center',
  },
  modalButtonSecondaryText: {
    color: Colors.textPrimary,
  },
  modalCancelButton: {
    paddingVertical: Spacing.md,
    marginTop: Spacing.sm,
  },
  modalCancelText: {
    fontSize: FontSizes.md,
    color: Colors.info,
    fontWeight: FontWeights.medium,
  },
});

export default SearchScreen;
