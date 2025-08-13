import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  ScrollView,
  Alert,
  Animated,
} from 'react-native';
import { FontWeights, Spacing, BorderRadius } from '../constants';
import { HeartIconSvg } from '../assets/icons';
import { useFavorites } from '../contexts/FavoritesContext';

const Favourites = ({ navigation }) => {
  const [editMode, setEditMode] = useState(false);
  const { favorites, removeFromFavorites, clearAllFavorites } = useFavorites();
  
  const [moveToBagModalVisible, setMoveToBagModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('L (W 10-13 / M 8-12)');
  const [sizeChartModalVisible, setSizeChartModalVisible] = useState(false);
  const [sizeChartTab, setSizeChartTab] = useState('size-chart'); // 'size-chart' or 'how-to-measure'
  const [addedToBagModalVisible, setAddedToBagModalVisible] = useState(false);
  
  const modalTranslateY = useRef(new Animated.Value(300)).current;
  const sizeChartTranslateY = useRef(new Animated.Value(300)).current;
  const addedToBagScale = useRef(new Animated.Value(0)).current;

  const quantities = [1, 2, 3, 4, 5, 6, 7, 8];
  const sizes = [
    'XS (M 6-8)',
    'S (M 8-10)',
    'M (W 8-10 / M 6-8)',
    'L (W 10-13 / M 8-12)',
    'XL (M 12-15)',
    'XXL (M 15+)'
  ];

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleDeleteItem = (itemId) => {
    // Animate deletion
    const fadeAnim = new Animated.Value(1);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      removeFromFavorites(itemId);
    });
  };

  const handleClearAll = () => {
    Alert.alert(
      'Clear All Favourites',
      'Are you sure you want to remove all items from your favourites?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => {
            clearAllFavorites();
            setEditMode(false);
          }
        }
      ]
    );
  };

  const handleMoveToBag = (product) => {
    setSelectedProduct(product);
    setMoveToBagModalVisible(true);
    
    // Animate modal in from bottom
    Animated.timing(modalTranslateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeMoveToBagModal = () => {
    Animated.timing(modalTranslateY, {
      toValue: 300,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setMoveToBagModalVisible(false);
      setSelectedProduct(null);
      modalTranslateY.setValue(300);
    });
  };

  const handleSizeChart = () => {
    console.log('Size Chart button pressed');
    // Close the move to bag modal first to avoid conflict
    setMoveToBagModalVisible(false);
    
    // Small delay to ensure first modal is closed
    setTimeout(() => {
      setSizeChartModalVisible(true);
      
      // Animate in from bottom with ease in
      Animated.timing(sizeChartTranslateY, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        console.log('Size Chart animation completed');
      });
    }, 100);
  };

  const closeSizeChartModal = () => {
    console.log('Closing Size Chart modal');
    // Animate out to bottom with ease in
    Animated.timing(sizeChartTranslateY, {
      toValue: 300,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setSizeChartModalVisible(false);
      sizeChartTranslateY.setValue(300);
      console.log('Size Chart modal closed');
      
      // Reopen the move to bag modal
      setMoveToBagModalVisible(true);
      Animated.timing(modalTranslateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleAddToBag = () => {
    closeMoveToBagModal();
    
    // Show success modal with scale animation
    setAddedToBagModalVisible(true);
    Animated.spring(addedToBagScale, {
      toValue: 1,
      useNativeDriver: true,
      tension: 150,
      friction: 8,
    }).start();
    
    // Auto close after 3 seconds
    setTimeout(() => {
      Animated.timing(addedToBagScale, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setAddedToBagModalVisible(false);
        addedToBagScale.setValue(0);
      });
    }, 3000);
  };

  const handleAddFavoritesNow = () => {
    // Navigate back to home screen
    navigation.navigate('Home');
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <View style={styles.heartCircle}>
          <HeartIconSvg width={35} height={31} color="#14142B" />
        </View>
      </View>
      <Text style={styles.emptyTitle}>Your Favourites is empty.</Text>
      <Text style={styles.emptySubtitle}>
        When you add products, they'll{'\n'}appear here.
      </Text>
      <TouchableOpacity style={styles.addFavoritesButton} onPress={handleAddFavoritesNow}>
        <Text style={styles.addFavoritesButtonText}>Add Favourites Now</Text>
      </TouchableOpacity>
    </View>
  );

  const renderProductItem = ({ item, index }) => (
    <View style={[styles.productContainer, index % 2 === 1 && styles.productContainerRight]}>
      {editMode && (
        <TouchableOpacity
          style={styles.deleteIcon}
          onPress={() => handleDeleteItem(item.id)}
        >
          <View style={styles.deleteIconCircle}>
            <Text style={styles.deleteIconText}>✕</Text>
          </View>
        </TouchableOpacity>
      )}
      
      <TouchableOpacity onPress={() => !editMode && handleMoveToBag(item)}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>{item.price}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderQuantitySelector = () => (
    <View style={styles.quantityContainer}>
      <TouchableOpacity style={styles.removeButton}>
        <Text style={styles.removeText}>Remove</Text>
      </TouchableOpacity>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.quantityScrollView}
        contentContainerStyle={styles.quantityScrollContent}
      >
        {quantities.map((quantity) => (
          <TouchableOpacity
            key={quantity}
            style={[
              styles.quantityOption,
              selectedQuantity === quantity && styles.selectedQuantityOption
            ]}
            onPress={() => setSelectedQuantity(quantity)}
          >
            <Text style={[
              styles.quantityText,
              selectedQuantity === quantity && styles.selectedQuantityText
            ]}>
              {quantity}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderSizeSelector = () => (
    <View style={styles.sizeContainer}>
      <Text style={styles.sizeTitle}>Size</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.sizeScrollView}
        contentContainerStyle={styles.sizeScrollContent}
      >
        {sizes.map((size) => (
          <TouchableOpacity
            key={size}
            style={[
              styles.sizeOption,
              selectedSize === size && styles.selectedSizeOption
            ]}
            onPress={() => setSelectedSize(size)}
          >
            <Text style={[
              styles.sizeText,
              selectedSize === size && styles.selectedSizeText
            ]}>
              {size}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <TouchableOpacity style={styles.sizeChartButton} onPress={handleSizeChart}>
        <Text style={styles.sizeChartText}>Size Chart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Favourites</Text>
        
        {favorites.length > 0 && (
          <TouchableOpacity onPress={handleEditToggle}>
            <Text style={styles.editText}>
              {editMode ? 'Save' : 'Edit'}
            </Text>
          </TouchableOpacity>
        )}
        
        {favorites.length === 0 && <View style={styles.headerSpacer} />}
      </View>

      {/* Clear All Button - only show in edit mode */}
      {editMode && favorites.length > 0 && (
        <View style={styles.clearAllContainer}>
          <TouchableOpacity onPress={handleClearAll}>
            <Text style={styles.clearAllText}>Clear All</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Content */}
      {favorites.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.productList}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Move to Bag Modal */}
      <Modal
        visible={moveToBagModalVisible}
        transparent
        animationType="none"
        onRequestClose={closeMoveToBagModal}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity 
            style={styles.modalBackground} 
            onPress={closeMoveToBagModal}
            activeOpacity={1}
          />
          
          <Animated.View 
            style={[
              styles.modalContent,
              { transform: [{ translateY: modalTranslateY }] }
            ]}
          >
            {selectedProduct && (
              <>
                <View style={styles.modalProductInfo}>
                  <Image source={{ uri: selectedProduct.image }} style={styles.modalProductImage} />
                  <View style={styles.modalProductDetails}>
                    <Text style={styles.modalProductName}>{selectedProduct.name}</Text>
                    <Text style={styles.modalProductCategory}>{selectedProduct.category}</Text>
                    <Text style={styles.modalProductPrice}>{selectedProduct.price}</Text>
                  </View>
                </View>

                {renderQuantitySelector()}
                {renderSizeSelector()}

                <TouchableOpacity style={styles.addToBagButton} onPress={handleAddToBag}>
                  <Text style={styles.addToBagButtonText}>Add to Bag</Text>
                </TouchableOpacity>
              </>
            )}
          </Animated.View>
        </View>
      </Modal>

      {/* Size Chart Modal */}
      <Modal
        visible={sizeChartModalVisible}
        transparent
        animationType="none"
        onRequestClose={closeSizeChartModal}
      >
        <View style={styles.sizeChartModalOverlay}>
          <TouchableOpacity 
            style={styles.modalBackground} 
            onPress={closeSizeChartModal}
            activeOpacity={1}
          />
          
          <Animated.View 
            style={[
              styles.sizeChartModal,
              { transform: [{ translateY: sizeChartTranslateY }] }
            ]}
          >
            <View style={styles.sizeChartHeader}>
              <View style={styles.modalHandle} />
              <Text style={styles.sizeChartTitle}>SIZE SELECTION</Text>
              
              <View style={styles.sizeChartTabs}>
                <TouchableOpacity
                  style={[
                    styles.sizeChartTab,
                    sizeChartTab === 'size-chart' && styles.activeSizeChartTab
                  ]}
                  onPress={() => setSizeChartTab('size-chart')}
                >
                  <Text style={[
                    styles.sizeChartTabText,
                    sizeChartTab === 'size-chart' && styles.activeSizeChartTabText
                  ]}>
                    Size Chart
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    styles.sizeChartTab,
                    sizeChartTab === 'how-to-measure' && styles.activeSizeChartTab
                  ]}
                  onPress={() => setSizeChartTab('how-to-measure')}
                >
                  <Text style={[
                    styles.sizeChartTabText,
                    sizeChartTab === 'how-to-measure' && styles.activeSizeChartTabText
                  ]}>
                    How To Measure
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView style={styles.sizeChartContent}>
              {sizeChartTab === 'size-chart' ? (
                <View style={styles.sizeChartTable}>
                  <Text style={styles.sizeChartTableText}>Size Chart (inches and cm)</Text>
                  <View style={styles.placeholder}>
                    <Text style={styles.placeholderText}>Size chart table would go here</Text>
                  </View>
                </View>
              ) : (
                <View style={styles.howToMeasure}>
                  <View style={styles.measureImagePlaceholder}>
                    <Image 
                      source={{ uri: 'https://via.placeholder.com/300x400/EEE/666?text=How+to+Measure+Guide' }}
                      style={styles.measureImage}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              )}
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>

      {/* Added to Bag Success Modal */}
      <Modal
        visible={addedToBagModalVisible}
        transparent
        animationType="none"
      >
        <View style={styles.successModalOverlay}>
          <Animated.View 
            style={[
              styles.successModalContent,
              { transform: [{ scale: addedToBagScale }] }
            ]}
          >
            <View style={styles.successIcon}>
              <Text style={styles.successCheckmark}>✓</Text>
            </View>
            <Text style={styles.successText}>Added to Bag</Text>
            
            <TouchableOpacity style={styles.viewBagButton}>
              <Text style={styles.viewBagButtonText}>View Bag</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  
  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: 60,
    paddingBottom: Spacing.md,
  },
  backButton: {
    padding: Spacing.xs,
    width: 68,
  },
  backIcon: {
    fontSize: 24,
    color: '#000000',
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: FontWeights.medium,
    color: '#000000',
    letterSpacing: -0.4,
  },
  editText: {
    fontSize: 16,
    fontWeight: FontWeights.normal,
    color: '#000000',
    letterSpacing: -0.4,
    width: 68,
    textAlign: 'right',
  },
  headerSpacer: {
    width: 68,
  },

  // Clear All
  clearAllContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.sm,
    alignItems: 'flex-end',
  },
  clearAllText: {
    fontSize: 16,
    fontWeight: FontWeights.normal,
    color: '#CA3327',
    letterSpacing: -0.4,
  },

  // Empty State
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
  },
  emptyIconContainer: {
    marginBottom: Spacing.xl,
  },
  heartCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: FontWeights.normal,
    color: '#000000',
    textAlign: 'center',
    marginBottom: Spacing.sm,
    letterSpacing: -0.384,
  },
  emptySubtitle: {
    fontSize: 16,
    fontWeight: FontWeights.normal,
    color: '#000000',
    textAlign: 'center',
    marginBottom: Spacing.xl * 2,
    lineHeight: 24,
    letterSpacing: -0.384,
  },
  addFavoritesButton: {
    backgroundColor: '#000000',
    paddingHorizontal: 51,
    paddingVertical: 16,
    borderRadius: 100,
    width: 327,
  },
  addFavoritesButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: FontWeights.medium,
    textAlign: 'center',
  },

  // Product List
  productList: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
  },
  productContainer: {
    width: 184,
    position: 'relative',
  },
  productContainerRight: {
    marginLeft: 7,
  },
  deleteIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
  },
  deleteIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  deleteIconText: {
    fontSize: 14,
    color: '#CA3327',
    fontWeight: 'bold',
  },
  productImage: {
    width: 184,
    height: 184,
    backgroundColor: '#EEE',
    borderRadius: BorderRadius.sm,
  },
  productInfo: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
  },
  productName: {
    fontSize: 14,
    fontWeight: FontWeights.medium,
    color: '#000000',
    letterSpacing: -0.14,
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: FontWeights.medium,
    color: '#000000',
    letterSpacing: -0.14,
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  sizeChartModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
    zIndex: 1000,
  },
  modalBackground: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
    minHeight: 400,
  },
  modalProductInfo: {
    flexDirection: 'row',
    marginBottom: Spacing.xl,
  },
  modalProductImage: {
    width: 100,
    height: 100,
    backgroundColor: '#EEE',
    borderRadius: BorderRadius.sm,
    marginRight: Spacing.lg,
  },
  modalProductDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  modalProductName: {
    fontSize: 18,
    fontWeight: FontWeights.medium,
    color: '#000000',
    marginBottom: Spacing.xs,
  },
  modalProductCategory: {
    fontSize: 14,
    fontWeight: FontWeights.normal,
    color: '#666666',
    marginBottom: Spacing.sm,
  },
  modalProductPrice: {
    fontSize: 16,
    fontWeight: FontWeights.medium,
    color: '#000000',
  },

  // Quantity Selector
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  removeButton: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    marginRight: Spacing.md,
  },
  removeText: {
    fontSize: 16,
    fontWeight: FontWeights.normal,
    color: '#000000',
  },
  quantityScrollView: {
    flex: 1,
  },
  quantityScrollContent: {
    paddingRight: Spacing.lg,
  },
  quantityOption: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E4E4E4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  selectedQuantityOption: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: FontWeights.normal,
    color: '#000000',
  },
  selectedQuantityText: {
    color: '#FFFFFF',
  },

  // Size Selector
  sizeContainer: {
    marginBottom: Spacing.xl,
  },
  sizeTitle: {
    fontSize: 16,
    fontWeight: FontWeights.medium,
    color: '#000000',
    marginBottom: Spacing.md,
  },
  sizeScrollView: {
    marginBottom: Spacing.md,
  },
  sizeScrollContent: {
    paddingRight: Spacing.lg,
  },
  sizeOption: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E4E4E4',
    marginRight: Spacing.sm,
  },
  selectedSizeOption: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  sizeText: {
    fontSize: 14,
    fontWeight: FontWeights.normal,
    color: '#000000',
  },
  selectedSizeText: {
    color: '#FFFFFF',
  },
  sizeChartButton: {
    alignSelf: 'flex-end',
  },
  sizeChartText: {
    fontSize: 14,
    fontWeight: FontWeights.normal,
    color: '#000000',
    textDecorationLine: 'underline',
  },

  // Add to Bag Button
  addToBagButton: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 100,
    alignItems: 'center',
  },
  addToBagButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: FontWeights.medium,
  },

  // Size Chart Modal
  sizeChartModal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  sizeChartHeader: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E4',
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E4E4E4',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: Spacing.md,
  },
  sizeChartTitle: {
    fontSize: 14,
    fontWeight: FontWeights.medium,
    color: '#000000',
    textAlign: 'center',
    marginBottom: Spacing.lg,
    letterSpacing: 0.5,
  },
  sizeChartTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  sizeChartTab: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    flex: 1,
    alignItems: 'center',
  },
  activeSizeChartTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
  },
  sizeChartTabText: {
    fontSize: 16,
    fontWeight: FontWeights.normal,
    color: '#666666',
  },
  activeSizeChartTabText: {
    color: '#000000',
    fontWeight: FontWeights.medium,
  },
  sizeChartContent: {
    padding: Spacing.lg,
    minHeight: 300,
  },
  sizeChartTable: {
    alignItems: 'center',
  },
  sizeChartTableText: {
    fontSize: 16,
    fontWeight: FontWeights.medium,
    color: '#000000',
    marginBottom: Spacing.lg,
  },
  howToMeasure: {
    alignItems: 'center',
  },
  measureImagePlaceholder: {
    width: '100%',
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  measureImage: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: 250,
    height: 200,
    backgroundColor: '#EEE',
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#666666',
    fontSize: 14,
  },

  // Success Modal
  successModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successModalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.xl * 2,
    alignItems: 'center',
    width: 300,
  },
  successIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6DB33F',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  successCheckmark: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  successText: {
    fontSize: 18,
    fontWeight: FontWeights.medium,
    color: '#000000',
    marginBottom: Spacing.xl,
  },
  viewBagButton: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    paddingHorizontal: 51,
    borderRadius: 100,
    width: '100%',
  },
  viewBagButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: FontWeights.medium,
    textAlign: 'center',
  },
});

export default Favourites;
