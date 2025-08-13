import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  PanResponder,
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const { height: screenHeight } = Dimensions.get('window');

// Sample cart items data (you can replace with actual data)
const sampleCartItems = [
  {
    id: 1,
    name: 'Nike Everyday Plus Cushioned',
    description: 'Training Ankle Socks',
    size: 'L (W 10-13 / M 8-12)',
    color: '(5 Pairs)',
    quantity: 1,
    price: 10.00,
    image: null, // Using placeholder instead
  },
  {
    id: 2,
    name: 'Nike Everyday Plus Cushioned',
    description: 'Training Ankle Socks',
    size: 'L (W 10-13 / M 8-12)',
    color: '(5 Pairs)',
    quantity: 1,
    price: 10.00,
    image: null, // Using placeholder instead
  },
];

const BagScreen = ({ navigation, route }) => {
  const [cartItems, setCartItems] = useState([]);
  const [quantityModalVisible, setQuantityModalVisible] = useState(false);
  const [sizeModalVisible, setSizeModalVisible] = useState(false);
  const [sizeChartModalVisible, setSizeChartModalVisible] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [sizeChartActiveTab, setSizeChartActiveTab] = useState('chart');
  const [selectedUnit, setSelectedUnit] = useState('cm');

  // Animation refs
  const quantitySlideAnim = useRef(new Animated.Value(screenHeight)).current;
  const sizeSlideAnim = useRef(new Animated.Value(screenHeight)).current;
  const sizeChartSlideAnim = useRef(new Animated.Value(screenHeight)).current;
  const quantityPanY = useRef(new Animated.Value(0)).current;
  const sizePanY = useRef(new Animated.Value(0)).current;
  const sizeChartPanY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Get data from route params if available
    const { selectedSize: routeSize, product } = route.params || {};
    
    if (product) {
      const newItem = {
        id: Date.now(),
        name: product.name || 'Nike Everyday Plus Cushioned',
        description: product.description || 'Training Ankle Socks',
        size: routeSize || 'M',
        color: product.color || '(5 Pairs)',
        quantity: 1,
        price: Number(product.price) || 10.00,
        image: product.image || null,
      };
      setCartItems([newItem, ...sampleCartItems]);
    } else {
      setCartItems(sampleCartItems);
    }
  }, [route.params]);

  // Quantity Modal PanResponder
  const quantityPanResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dy) > 10;
    },
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dy > 0) {
        quantityPanY.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dy > 100) {
        closeQuantityModal();
      } else {
        Animated.spring(quantityPanY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  // Size Modal PanResponder
  const sizePanResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dy) > 10;
    },
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dy > 0) {
        sizePanY.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dy > 100) {
        closeSizeModal();
      } else {
        Animated.spring(sizePanY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  // Size Chart Modal PanResponder
  const sizeChartPanResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dy) > 10;
    },
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dy > 0) {
        sizeChartPanY.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dy > 100) {
        closeSizeChartModal();
      } else {
        Animated.spring(sizeChartPanY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const openQuantityModal = (itemIndex) => {
    setSelectedItemIndex(itemIndex);
    setSelectedQuantity(cartItems[itemIndex].quantity);
    setQuantityModalVisible(true);
    Animated.timing(quantitySlideAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const closeQuantityModal = () => {
    Animated.timing(quantitySlideAnim, {
      toValue: screenHeight,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setQuantityModalVisible(false);
      quantityPanY.setValue(0);
    });
  };

  const openSizeModal = (itemIndex) => {
    setSelectedItemIndex(itemIndex);
    setSelectedSize(cartItems[itemIndex].size.split(' ')[0]);
    setSizeModalVisible(true);
    Animated.timing(sizeSlideAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const closeSizeModal = () => {
    Animated.timing(sizeSlideAnim, {
      toValue: screenHeight,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setSizeModalVisible(false);
      sizePanY.setValue(0);
    });
  };

  const openSizeChartModal = () => {
    setSizeChartModalVisible(true);
    setSizeChartActiveTab('chart');
    Animated.timing(sizeChartSlideAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const closeSizeChartModal = () => {
    Animated.timing(sizeChartSlideAnim, {
      toValue: screenHeight,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setSizeChartModalVisible(false);
      sizeChartPanY.setValue(0);
    });
  };

  const updateQuantity = (quantity) => {
    if (selectedItemIndex !== null) {
      const updatedItems = [...cartItems];
      updatedItems[selectedItemIndex].quantity = quantity;
      setCartItems(updatedItems);
      setSelectedQuantity(quantity);
    }
  };

  const updateSize = (size) => {
    if (selectedItemIndex !== null) {
      const updatedItems = [...cartItems];
      const currentItem = updatedItems[selectedItemIndex];
      // Update size while keeping the rest of the size description
      const sizeParts = currentItem.size.split(' ');
      sizeParts[0] = size;
      updatedItems[selectedItemIndex].size = sizeParts.join(' ');
      setCartItems(updatedItems);
      setSelectedSize(size);
    }
  };

  const handleDoneQuantity = () => {
    updateQuantity(selectedQuantity);
    closeQuantityModal();
  };

  const handleDoneSize = () => {
    updateSize(selectedSize);
    closeSizeModal();
  };

  const renderCartItem = (item, index) => (
    <View key={item.id} style={styles.cartItem}>
      <View style={styles.itemImageContainer}>
        {item.image ? (
          <Image source={item.image} style={styles.itemImage} />
        ) : (
          <View style={styles.itemImagePlaceholder}>
            <Text style={styles.placeholderText}>👟</Text>
          </View>
        )}
      </View>
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.itemSize}>{item.size}</Text>
        <Text style={styles.itemColor}>{item.color}</Text>
        
        <View style={styles.itemControls}>
          <TouchableOpacity 
            style={styles.quantityContainer}
            onPress={() => openQuantityModal(index)}
          >
            <Text style={styles.quantityText}>Qty {item.quantity}</Text>
            <Text style={styles.dropdownIcon}>▼</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.sizeContainer}
            onPress={() => openSizeModal(index)}
          >
            <Text style={styles.sizeText}>{item.size.split(' ')[0]}</Text>
            <Text style={styles.dropdownIcon}>▼</Text>
          </TouchableOpacity>
          
          <Text style={styles.itemPrice}>US${(Number(item.price) || 0).toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + ((Number(item.price) || 0) * item.quantity), 0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bag</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Cart Items */}
        <View style={styles.cartContainer}>
          {cartItems.map((item, index) => renderCartItem(item, index))}
        </View>

        {/* Delivery Section */}
        <View style={styles.deliverySection}>
          <Text style={styles.deliveryTitle}>Delivery</Text>
          <Text style={styles.deliveryText}>Arrives Wed, 11 May</Text>
          <Text style={styles.deliveryLocation}>📍 Pin to PM Location</Text>
        </View>

        {/* Points Section */}
        <View style={styles.pointsSection}>
          <TouchableOpacity style={styles.pointsContainer}>
            <Text style={styles.pointsIcon}>✓</Text>
            <Text style={styles.pointsText}>Apply ✓ Points</Text>
          </TouchableOpacity>
        </View>

        {/* Promo Code Section */}
        <View style={styles.promoSection}>
          <Text style={styles.promoTitle}>Have a Promo Code?</Text>
          <View style={styles.promoContainer}>
            <Text style={styles.promoDiscount}>30% OFF</Text>
            <Text style={styles.promoCode}>FIRST30</Text>
            <TouchableOpacity>
              <Text style={styles.promoApply}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Summary Section */}
        <View style={styles.summarySection}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery</Text>
            <Text style={styles.summaryValue}>Standard - Free</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>International Delivery</Text>
            <Text style={styles.summaryValue}>Standard - $200</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Promo</Text>
            <Text style={styles.summaryValue}>US$10</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Points Discount</Text>
            <Text style={styles.summaryValue}>-$5.00</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>US${calculateTotal().toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Checkout Button */}
      <View style={styles.checkoutContainer}>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>

      {/* Quantity Modal */}
      {quantityModalVisible && (
        <View style={styles.modalOverlay}>
          <Animated.View 
            style={[
              styles.modalContainer,
              {
                transform: [
                  { translateY: quantitySlideAnim },
                  { translateY: quantityPanY }
                ]
              }
            ]}
            {...quantityPanResponder.panHandlers}
          >
            <View style={styles.dragHandle} />
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Quantity</Text>
              <ScrollView style={styles.quantityList}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((qty) => (
                  <TouchableOpacity
                    key={qty}
                    style={[
                      styles.quantityOption,
                      selectedQuantity === qty && styles.selectedQuantityOption
                    ]}
                    onPress={() => setSelectedQuantity(qty)}
                  >
                    <Text style={[
                      styles.quantityOptionText,
                      selectedQuantity === qty && styles.selectedQuantityOptionText
                    ]}>
                      {qty}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity style={styles.doneButton} onPress={handleDoneQuantity}>
                <Text style={styles.doneButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      )}

      {/* Size Modal */}
      {sizeModalVisible && (
        <View style={styles.modalOverlay}>
          <Animated.View 
            style={[
              styles.modalContainer,
              {
                transform: [
                  { translateY: sizeSlideAnim },
                  { translateY: sizePanY }
                ]
              }
            ]}
            {...sizePanResponder.panHandlers}
          >
            <View style={styles.dragHandle} />
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Size</Text>
              <ScrollView style={styles.sizeList}>
                {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                  <TouchableOpacity
                    key={size}
                    style={[
                      styles.sizeOption,
                      selectedSize === size && styles.selectedSizeOption
                    ]}
                    onPress={() => setSelectedSize(size)}
                  >
                    <Text style={[
                      styles.sizeOptionText,
                      selectedSize === size && styles.selectedSizeOptionText
                    ]}>
                      {size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity 
                style={styles.sizeChartLink}
                onPress={openSizeChartModal}
              >
                <Text style={styles.sizeChartText}>Size Chart</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.doneButton} onPress={handleDoneSize}>
                <Text style={styles.doneButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      )}

      {/* Size Chart Modal */}
      {sizeChartModalVisible && (
        <View style={styles.modalOverlay}>
          <Animated.View 
            style={[
              styles.sizeChartModalContainer,
              {
                transform: [
                  { translateY: sizeChartSlideAnim },
                  { translateY: sizeChartPanY }
                ]
              }
            ]}
            {...sizeChartPanResponder.panHandlers}
          >
            <View style={styles.dragHandle} />
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>SIZE SELECTION</Text>
              
              {/* Tab Headers */}
              <View style={styles.tabContainer}>
                <TouchableOpacity 
                  style={[
                    styles.tabButton,
                    sizeChartActiveTab === 'chart' && styles.activeTab
                  ]}
                  onPress={() => setSizeChartActiveTab('chart')}
                >
                  <Text style={[
                    styles.tabText,
                    sizeChartActiveTab === 'chart' && styles.activeTabText
                  ]}>
                    Size Chart
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[
                    styles.tabButton,
                    sizeChartActiveTab === 'measure' && styles.activeTab
                  ]}
                  onPress={() => setSizeChartActiveTab('measure')}
                >
                  <Text style={[
                    styles.tabText,
                    sizeChartActiveTab === 'measure' && styles.activeTabText
                  ]}>
                    How To Measure
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Tab Content */}
              <ScrollView style={styles.tabContent}>
                {sizeChartActiveTab === 'chart' ? (
                  <View style={styles.sizeChartContent}>
                    <Text style={styles.sizeChartSubtitle}>Select size in</Text>
                    <View style={styles.unitSelector}>
                      <TouchableOpacity 
                        style={[
                          styles.unitButton,
                          selectedUnit === 'in' && styles.selectedUnitButton
                        ]}
                        onPress={() => setSelectedUnit('in')}
                      >
                        <Text style={[
                          styles.unitButtonText,
                          selectedUnit === 'in' && styles.selectedUnitButtonText
                        ]}>
                          in
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={[
                          styles.unitButton,
                          selectedUnit === 'cm' && styles.selectedUnitButton
                        ]}
                        onPress={() => setSelectedUnit('cm')}
                      >
                        <Text style={[
                          styles.unitButtonText,
                          selectedUnit === 'cm' && styles.selectedUnitButtonText
                        ]}>
                          cm
                        </Text>
                      </TouchableOpacity>
                    </View>
                    
                    {/* Size Chart Table */}
                    <View style={styles.sizeTable}>
                      {/* Table Header */}
                      <View style={styles.tableHeader}>
                        <Text style={styles.tableHeaderText}>Size</Text>
                        <Text style={styles.tableHeaderText}>To fit waist(cm)</Text>
                        <Text style={styles.tableHeaderText}>Inseam Length(cm)</Text>
                      </View>
                      
                      {/* Table Rows */}
                      {[
                        { size: 'S', waist: '71.1', inseam: '70.1' },
                        { size: 'M', waist: '71.1', inseam: '70.1' },
                        { size: 'L', waist: '71.1', inseam: '70.1' },
                        { size: 'XL', waist: '71.1', inseam: '70.1' },
                        { size: 'XXL', waist: '71.1', inseam: '70.1' },
                      ].map((item, index, array) => (
                        <View 
                          key={index} 
                          style={[
                            styles.tableRow,
                            index === array.length - 1 && styles.lastTableRow
                          ]}
                        >
                          <Text style={styles.tableCellText}>{item.size}</Text>
                          <Text style={styles.tableCellText}>{item.waist}</Text>
                          <Text style={styles.tableCellText}>{item.inseam}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                ) : (
                  <View style={styles.measureContent}>
                    <Text style={styles.measureText}>
                      Measuring instructions would go here...
                    </Text>
                  </View>
                )}
              </ScrollView>
            </View>
          </Animated.View>
        </View>
      )}
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F6F6F6',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: '#000000',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  cartContainer: {
    paddingHorizontal: 16,
  },
  cartItem: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F6F6F6',
  },
  itemImageContainer: {
    width: 80,
    height: 80,
    marginRight: 12,
  },
  itemImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    backgroundColor: '#F6F6F6',
  },
  itemImagePlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 32,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#767676',
    marginBottom: 4,
  },
  itemSize: {
    fontSize: 12,
    color: '#BABABA',
    marginBottom: 2,
  },
  itemColor: {
    fontSize: 12,
    color: '#BABABA',
    marginBottom: 12,
  },
  itemControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#F6F6F6',
    borderRadius: 6,
    marginRight: 12,
  },
  quantityText: {
    fontSize: 14,
    color: '#000000',
    marginRight: 4,
  },
  sizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#F6F6F6',
    borderRadius: 6,
    marginRight: 12,
  },
  sizeText: {
    fontSize: 14,
    color: '#000000',
    marginRight: 4,
  },
  dropdownIcon: {
    fontSize: 10,
    color: '#767676',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginLeft: 'auto',
  },
  deliverySection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F6F6F6',
  },
  deliveryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  deliveryText: {
    fontSize: 14,
    color: '#767676',
    marginBottom: 4,
  },
  deliveryLocation: {
    fontSize: 14,
    color: '#767676',
  },
  pointsSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F6F6F6',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsIcon: {
    fontSize: 16,
    color: '#000000',
    marginRight: 8,
  },
  pointsText: {
    fontSize: 14,
    color: '#000000',
  },
  promoSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F6F6F6',
  },
  promoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
  },
  promoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#BABABA',
  },
  promoDiscount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginRight: 8,
  },
  promoCode: {
    fontSize: 14,
    color: '#767676',
    flex: 1,
  },
  promoApply: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  summarySection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#767676',
  },
  summaryValue: {
    fontSize: 14,
    color: '#000000',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#F6F6F6',
    paddingTop: 12,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  checkoutContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F6F6F6',
  },
  checkoutButton: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(207, 207, 207, 0.5)',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    maxHeight: screenHeight * 0.6,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#767676',
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 14,
    marginBottom: 20,
  },
  modalContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 20,
  },
  quantityList: {
    maxHeight: 200,
  },
  quantityOption: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#F6F6F6',
    marginBottom: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedQuantityOption: {
    backgroundColor: '#F6F6F6',
    borderWidth: 2,
    borderColor: '#000000',
  },
  quantityOptionText: {
    fontSize: 16,
    color: '#BABABA',
  },
  selectedQuantityOptionText: {
    color: '#000000',
    fontWeight: '600',
  },
  sizeList: {
    maxHeight: 200,
  },
  sizeOption: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#F6F6F6',
    marginBottom: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedSizeOption: {
    backgroundColor: '#F6F6F6',
    borderWidth: 2,
    borderColor: '#000000',
  },
  sizeOptionText: {
    fontSize: 16,
    color: '#BABABA',
  },
  selectedSizeOptionText: {
    color: '#000000',
    fontWeight: '600',
  },
  sizeChartLink: {
    alignSelf: 'center',
    marginVertical: 16,
  },
  sizeChartText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    textDecorationLine: 'underline',
  },
  doneButton: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 100,
    alignItems: 'center',
    marginTop: 20,
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  // Size Chart Modal Styles
  sizeChartModalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    maxHeight: screenHeight * 0.8,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#000000',
  },
  tabText: {
    fontSize: 16,
    color: '#BABABA',
  },
  activeTabText: {
    color: '#000000',
    fontWeight: '600',
  },
  tabContent: {
    flex: 1,
  },
  sizeChartContent: {
    padding: 16,
  },
  sizeChartSubtitle: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 8,
  },
  unitSelector: {
    flexDirection: 'row',
    marginBottom: 20,
    alignSelf: 'flex-end',
  },
  unitButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    marginLeft: 8,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedUnitButton: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  unitButtonText: {
    fontSize: 12,
    color: '#767676',
    fontWeight: '600',
  },
  selectedUnitButtonText: {
    color: '#FFFFFF',
  },
  sizeTable: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F6F6F6',
  },
  tableCellText: {
    flex: 1,
    fontSize: 14,
    color: '#000000',
    textAlign: 'center',
    fontWeight: '400',
  },
  lastTableRow: {
    borderBottomWidth: 0,
  },
  measureContent: {
    padding: 16,
  },
  measureText: {
    fontSize: 14,
    color: '#767676',
    lineHeight: 20,
  },
});

export default BagScreen;
