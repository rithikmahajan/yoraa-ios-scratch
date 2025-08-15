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
  ScrollView,
  Image,
} from 'react-native';
import { Colors, FontSizes, FontWeights, Spacing, BorderRadius } from '../constants';
import { MicrophoneIcon, CameraIcon, ScanBarcodeIcon, SearchIcon } from '../assets/icons';

// Sample search suggestions
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
  'no show socks',
  't-shirt',
  'cropped orange tee',
  'cotton blend shirt',
  'nike everyday',
  'adidas',
  'running shoes',
  'sneakers',
  'hoodies',
  'pants',
  'shorts'
];

// Mock product data for search results
const SEARCH_PRODUCTS = [
  {
    id: '1',
    name: 'Cropped Orange Tee',
    subtitle: 'Cotton Blend Shirt',
    price: 'US$35',
    originalPrice: 'US$45',
    discount: '22% off',
    rating: 4.5,
    reviewCount: 89,
    inStock: true,
    mainImage: { id: 1, type: 'image' },
    images: [
      { id: 1, type: 'image' },
      { id: 2, type: 'image' },
      { id: 3, type: 'image' },
      { id: 4, type: 'image' },
      { id: 5, type: 'image' },
    ],
    variants: [
      { id: 1, color: '#FF8C00', name: 'Orange', inStock: true, quantity: 5 },
      { id: 2, color: '#FFFFFF', name: 'White', inStock: true, quantity: 3 },
      { id: 3, color: '#000000', name: 'Black', inStock: true, quantity: 2 },
      { id: 4, color: '#FF69B4', name: 'Pink', inStock: true, quantity: 4 },
      { id: 5, color: '#0000FF', name: 'Blue', inStock: true, quantity: 1 },
    ],
  },
  {
    id: '2',
    name: 'Nike Everyday Plus',
    subtitle: 'Cushioned Training Socks',
    price: 'US$22',
    originalPrice: 'US$28',
    discount: '21% off',
    rating: 4.7,
    reviewCount: 234,
    inStock: true,
    mainImage: { id: 1, type: 'image' },
    images: [
      { id: 1, type: 'image' },
      { id: 2, type: 'image' },
      { id: 3, type: 'video' },
      { id: 4, type: 'image' },
    ],
    variants: [
      { id: 1, color: '#000000', name: 'Black', inStock: true, quantity: 8 },
      { id: 2, color: '#FFFFFF', name: 'White', inStock: true, quantity: 6 },
      { id: 3, color: '#808080', name: 'Gray', inStock: true, quantity: 4 },
    ],
  },
  {
    id: '3',
    name: 'Adidas Classic Tee',
    subtitle: 'Cotton Performance Shirt',
    price: 'US$29',
    rating: 4.3,
    reviewCount: 156,
    inStock: true,
    mainImage: { id: 1, type: 'image' },
    images: [
      { id: 1, type: 'image' },
      { id: 2, type: 'image' },
      { id: 3, type: 'image' },
    ],
    variants: [
      { id: 1, color: '#000000', name: 'Black', inStock: true, quantity: 3 },
      { id: 2, color: '#FFFFFF', name: 'White', inStock: true, quantity: 5 },
      { id: 3, color: '#FF0000', name: 'Red', inStock: true, quantity: 2 },
    ],
  },
  // Add more products as needed
];

const SearchScreen = ({ navigation, onClose }) => {
  const [searchText, setSearchText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  
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
    // Filter suggestions and search products based on search text
    if (searchText.trim()) {
      const filtered = ALL_SUGGESTIONS.filter(suggestion =>
        suggestion.toLowerCase().includes(searchText.toLowerCase())
      );
      setSearchSuggestions(filtered);

      // Search products
      const productResults = SEARCH_PRODUCTS.filter(product =>
        product.name.toLowerCase().includes(searchText.toLowerCase()) ||
        product.subtitle.toLowerCase().includes(searchText.toLowerCase())
      );
      setSearchResults(productResults);
    } else {
      setSearchSuggestions([]);
      setSearchResults([]);
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
        setSearchText('cropped orange tee');
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
    if (navigation && navigation.navigate) {
      navigation.navigate('ScanBarcode');
    }
  };

  const handleSuggestionPress = (suggestion) => {
    setSearchText(suggestion);
  };

  const handleProductPress = (product) => {
    if (navigation && navigation.navigate) {
      navigation.navigate('ProductDetail', { product });
    }
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

  const renderVariantSelector = (product, productIndex) => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.variantScrollContent}
      style={styles.variantContainer}
    >
      {product.variants.map((variant, index) => (
        <TouchableOpacity
          key={variant.id}
          style={[
            styles.variantItem,
            selectedProductIndex === productIndex && selectedVariantIndex === index && styles.selectedVariantItem
          ]}
          onPress={() => {
            setSelectedProductIndex(productIndex);
            setSelectedVariantIndex(index);
          }}
        >
          <View
            style={[
              styles.variantColor,
              { backgroundColor: variant.color },
              variant.color === '#FFFFFF' && styles.whiteBorder,
              selectedProductIndex === productIndex && selectedVariantIndex === index && styles.selectedVariantColor,
              !variant.inStock && styles.outOfStockVariant
            ]}
          >
            {!variant.inStock && <View style={styles.strikeThrough} />}
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderProductItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => handleProductPress(item)}
    >
      {/* Main Product Image */}
      <View style={styles.productImageContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.productImageScroll}
        >
          {item.images.map((image) => (
            <View key={image.id} style={styles.productImage}>
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imageText}>✓</Text>
                {image.type === 'video' && (
                  <View style={styles.videoIndicator}>
                    <Text style={styles.videoText}>▶</Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Product Info */}
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productSubtitle}>{item.subtitle}</Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>{item.price}</Text>
          {item.originalPrice && (
            <Text style={styles.originalPrice}>{item.originalPrice}</Text>
          )}
          {item.discount && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{item.discount}</Text>
            </View>
          )}
        </View>

        {/* Rating */}
        <View style={styles.ratingContainer}>
          <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Text key={star} style={styles.star}>
                {star <= Math.floor(item.rating) ? '★' : '☆'}
              </Text>
            ))}
          </View>
          <Text style={styles.reviewCount}>({item.reviewCount})</Text>
        </View>
      </View>

      {/* Variant Selector */}
      {renderVariantSelector(item, index)}
    </TouchableOpacity>
  );

  const renderSearchResults = () => (
    <View style={styles.searchResultsContainer}>
      <Text style={styles.resultsHeader}>
        {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchText}"
      </Text>
      <FlatList
        data={searchResults}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.resultsList}
      />
    </View>
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

        {/* Action Buttons - only show when no search results */}
        {!searchResults.length && (
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
        )}

        {/* Search Results */}
        {searchResults.length > 0 && renderSearchResults()}

        {/* Search Suggestions - only show when no search results */}
        {searchSuggestions.length > 0 && !searchResults.length && (
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
  // Search Results Styles
  searchResultsContainer: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  resultsHeader: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semiBold,
    color: Colors.textPrimary,
    marginBottom: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  resultsList: {
    paddingBottom: Spacing.xxl,
  },
  productItem: {
    backgroundColor: Colors.background,
    marginBottom: Spacing.xl,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  productImageContainer: {
    height: 300,
    backgroundColor: '#F8F8F8',
  },
  productImageScroll: {
    flex: 1,
  },
  productImage: {
    width: Dimensions.get('window').width - (Spacing.lg * 2),
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    width: '100%',
    height: '100%',
  },
  imageText: {
    fontSize: 48,
    color: '#888',
    fontWeight: 'bold',
  },
  videoIndicator: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    padding: 8,
  },
  videoText: {
    color: 'white',
    fontSize: 12,
  },
  productInfo: {
    padding: Spacing.lg,
  },
  productName: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  productSubtitle: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  currentPrice: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
    color: Colors.textPrimary,
    marginRight: Spacing.sm,
  },
  originalPrice: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    textDecorationLine: 'line-through',
    marginRight: Spacing.sm,
  },
  discountBadge: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  discountText: {
    fontSize: FontSizes.sm,
    color: '#2E7D32',
    fontWeight: FontWeights.medium,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  stars: {
    flexDirection: 'row',
    marginRight: Spacing.sm,
  },
  star: {
    fontSize: FontSizes.md,
    color: '#FFD700',
  },
  reviewCount: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  variantContainer: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  variantScrollContent: {
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  variantItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  variantColor: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  whiteBorder: {
    borderColor: '#DDD',
    borderWidth: 1,
  },
  selectedVariantItem: {
    // Additional styling for selected variant container
  },
  selectedVariantColor: {
    borderColor: '#000',
    borderWidth: 3,
  },
  outOfStockVariant: {
    opacity: 0.5,
  },
  strikeThrough: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#FF0000',
    transform: [{ rotate: '45deg' }],
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
