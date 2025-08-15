import { useState, useRef, useCallback } from 'react';
import { Animated } from 'react-native';
import { 
  calculateItemTotal, 
  validatePromoCode, 
  createPromoCodeObject,
  createCartItem 
} from '../utils/bagUtils';
import { 
  createModalAnimations, 
  animateModalOpen, 
  animateModalClose,
  createSwipeAnimations 
} from '../utils/animationUtils';

export const useBagState = (route) => {
  const [cartItems, setCartItems] = useState([]);
  const [quantityModalVisible, setQuantityModalVisible] = useState(false);
  const [sizeModalVisible, setSizeModalVisible] = useState(false);
  const [sizeChartModalVisible, setSizeChartModalVisible] = useState(false);
  const [promoSuccessModalVisible, setPromoSuccessModalVisible] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [sizeChartActiveTab, setSizeChartActiveTab] = useState('chart');
  const [selectedUnit, setSelectedUnit] = useState('cm');
  const [pointsApplied, setPointsApplied] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromoCode, setAppliedPromoCode] = useState(null);
  const [swipeAnimations, setSwipeAnimations] = useState({});
  const [swipeStates, setSwipeStates] = useState({});

  // Animation refs
  const animations = useRef(createModalAnimations()).current;

  const initializeCart = useCallback(() => {
    const { selectedSize: routeSize, product } = route.params || {};
    
    let initialItems = [];
    if (product) {
      const newItem = createCartItem(product, routeSize);
      initialItems = [newItem];
    }
    
    setCartItems(initialItems);
    
    // Initialize swipe animations
    const { animations: swipeAnims, states: swipeStatesData } = createSwipeAnimations(initialItems);
    setSwipeAnimations(swipeAnims);
    setSwipeStates(swipeStatesData);
  }, [route.params]);

  const resetSwipe = useCallback((itemId) => {
    const animation = swipeAnimations[itemId];
    if (animation) {
      Animated.parallel([
        Animated.spring(animation.translateX, {
          toValue: 0,
          useNativeDriver: true,
          tension: 150,
          friction: 8,
        }),
        Animated.spring(animation.opacity, {
          toValue: 1,
          useNativeDriver: true,
          tension: 150,
          friction: 8,
        })
      ]).start();
      
      setSwipeStates(prev => ({
        ...prev,
        [itemId]: { ...prev[itemId], isSwipedLeft: false }
      }));
    }
  }, [swipeAnimations]);

  const deleteItem = useCallback((itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
    
    // Clean up animations
    setSwipeAnimations(prev => {
      const newAnimations = { ...prev };
      delete newAnimations[itemId];
      return newAnimations;
    });
    
    setSwipeStates(prev => {
      const newStates = { ...prev };
      delete newStates[itemId];
      return newStates;
    });
  }, []);

  const openQuantityModal = useCallback((itemIndex) => {
    setSelectedItemIndex(itemIndex);
    setSelectedQuantity(cartItems[itemIndex].quantity);
    setQuantityModalVisible(true);
    animateModalOpen(animations.quantitySlideAnim).start();
  }, [cartItems, animations.quantitySlideAnim]);

  const closeQuantityModal = useCallback(() => {
    animateModalClose(animations.quantitySlideAnim).start(() => {
      setQuantityModalVisible(false);
      animations.quantityPanY.setValue(0);
    });
  }, [animations.quantitySlideAnim, animations.quantityPanY]);

  const openSizeModal = useCallback((itemIndex) => {
    setSelectedItemIndex(itemIndex);
    setSelectedSize(cartItems[itemIndex].size.split(' ')[0]);
    setSizeModalVisible(true);
    animateModalOpen(animations.sizeSlideAnim).start();
  }, [cartItems, animations.sizeSlideAnim]);

  const closeSizeModal = useCallback(() => {
    animateModalClose(animations.sizeSlideAnim).start(() => {
      setSizeModalVisible(false);
      animations.sizePanY.setValue(0);
    });
  }, [animations.sizeSlideAnim, animations.sizePanY]);

  const openSizeChartModal = useCallback(() => {
    setSizeChartModalVisible(true);
    setSizeChartActiveTab('chart');
    animateModalOpen(animations.sizeChartSlideAnim).start();
  }, [animations.sizeChartSlideAnim]);

  const closeSizeChartModal = useCallback(() => {
    animateModalClose(animations.sizeChartSlideAnim).start(() => {
      setSizeChartModalVisible(false);
      animations.sizeChartPanY.setValue(0);
    });
  }, [animations.sizeChartSlideAnim, animations.sizeChartPanY]);

  const openPromoSuccessModal = useCallback(() => {
    setPromoSuccessModalVisible(true);
    animateModalOpen(
      animations.promoSuccessSlideAnim, 
      animations.promoSuccessOpacityAnim
    ).start();
  }, [animations.promoSuccessSlideAnim, animations.promoSuccessOpacityAnim]);

  const closePromoSuccessModal = useCallback(() => {
    animateModalClose(
      animations.promoSuccessSlideAnim, 
      animations.promoSuccessOpacityAnim
    ).start(() => {
      setPromoSuccessModalVisible(false);
    });
  }, [animations.promoSuccessSlideAnim, animations.promoSuccessOpacityAnim]);

  const applyPromoCode = useCallback(() => {
    if (promoCode.trim() === '') return;
    
    if (validatePromoCode(promoCode)) {
      const itemTotal = calculateItemTotal(cartItems);
      setAppliedPromoCode(createPromoCodeObject(promoCode, itemTotal));
      openPromoSuccessModal();
      setPromoCode('');
    } else {
      setPromoCode('');
    }
  }, [promoCode, cartItems, openPromoSuccessModal]);

  const updateQuantity = useCallback((quantity) => {
    if (selectedItemIndex !== null) {
      const updatedItems = [...cartItems];
      updatedItems[selectedItemIndex].quantity = quantity;
      setCartItems(updatedItems);
      setSelectedQuantity(quantity);
    }
  }, [selectedItemIndex, cartItems]);

  const updateSize = useCallback((size) => {
    if (selectedItemIndex !== null) {
      const updatedItems = [...cartItems];
      const currentItem = updatedItems[selectedItemIndex];
      const sizeParts = currentItem.size.split(' ');
      sizeParts[0] = size;
      updatedItems[selectedItemIndex].size = sizeParts.join(' ');
      setCartItems(updatedItems);
      setSelectedSize(size);
    }
  }, [selectedItemIndex, cartItems]);

  const handleDoneQuantity = useCallback(() => {
    updateQuantity(selectedQuantity);
    closeQuantityModal();
  }, [selectedQuantity, updateQuantity, closeQuantityModal]);

  const handleDoneSize = useCallback(() => {
    updateSize(selectedSize);
    closeSizeModal();
  }, [selectedSize, updateSize, closeSizeModal]);

  const togglePoints = useCallback(() => {
    setPointsApplied(!pointsApplied);
  }, [pointsApplied]);

  return {
    // State
    cartItems,
    quantityModalVisible,
    sizeModalVisible,
    sizeChartModalVisible,
    promoSuccessModalVisible,
    selectedItemIndex,
    selectedQuantity,
    selectedSize,
    sizeChartActiveTab,
    selectedUnit,
    pointsApplied,
    promoCode,
    appliedPromoCode,
    swipeAnimations,
    swipeStates,
    
    // Setters
    setSelectedQuantity,
    setSelectedSize,
    setSizeChartActiveTab,
    setSelectedUnit,
    setPromoCode,
    setAppliedPromoCode,
    setSwipeStates,
    
    // Actions
    initializeCart,
    resetSwipe,
    deleteItem,
    openQuantityModal,
    closeQuantityModal,
    openSizeModal,
    closeSizeModal,
    openSizeChartModal,
    closeSizeChartModal,
    openPromoSuccessModal,
    closePromoSuccessModal,
    applyPromoCode,
    handleDoneQuantity,
    handleDoneSize,
    togglePoints,
    
    // Animation refs
    animations,
  };
};
