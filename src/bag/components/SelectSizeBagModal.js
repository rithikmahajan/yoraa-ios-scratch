import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  PanResponder,
  TouchableWithoutFeedback,
  Easing,
} from 'react-native';
import { SIZES } from '../constants/bagConstants';
import { bagStyles } from '../styles/bagStyles';

const SelectSizeBagModal = ({
  visible,
  selectedSize,
  setSelectedSize,
  onDone,
  onClose,
  onOpenSizeChart,
  slideAnim,
  panY,
}) => {
  const highlightAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const scrollViewRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    if (visible) {
      // Reset and start highlight animation
      highlightAnim.setValue(0);
      Animated.timing(highlightAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
        useNativeDriver: true, // Use native driver for better performance
      }).start();

      // Ensure at least one size is selected (default to first size if none selected)
      if (!selectedSize || !SIZES.includes(selectedSize)) {
        setSelectedSize(SIZES[0]); // Default to first available size
      }
      
      setTimeout(() => {
        if (scrollViewRef.current && selectedSize) {
          // Center the selected size
          const itemHeight = 60;
          const modalViewHeight = 200;
          const centerOffset = (modalViewHeight / 2) - (itemHeight / 2);
          const selectedIndex = SIZES.indexOf(selectedSize);
          const scrollOffset = (selectedIndex * itemHeight) - centerOffset;
          
          scrollViewRef.current.scrollTo({
            y: Math.max(0, scrollOffset),
            animated: true,
          });
        }
      }, 350);
    }
  }, [visible, highlightAnim, selectedSize, setSelectedSize]);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dy) > 10;
    },
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dy > 0) {
        panY.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dy > 100) {
        onClose();
      } else {
        Animated.spring(panY, {
          toValue: 0,
          tension: 120,
          friction: 8,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const handleSizeSelect = (size) => {
    if (isScrolling) return; // Prevent selection during scroll

    // Interaction feedback
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
        useNativeDriver: true,
      }),
    ]).start();

    setSelectedSize(size);

    // Smooth scroll to center the selected item in the modal
    const itemIndex = SIZES.indexOf(size);
    if (itemIndex !== -1 && scrollViewRef.current) {
      const itemHeight = 60;
      const modalViewHeight = 200;
      const centerOffset = (modalViewHeight / 2) - (itemHeight / 2);
      const scrollOffset = (itemIndex * itemHeight) - centerOffset;
      
      scrollViewRef.current.scrollTo({
        y: Math.max(0, scrollOffset),
        animated: true,
      });
    }
  };

  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    const itemHeight = 60;
    const modalViewHeight = 200;
    const centerOffset = (modalViewHeight / 2) - (itemHeight / 2);
    
    // Calculate which item is in the center of the modal view
    const centerScrollPosition = contentOffset.y + centerOffset;
    const currentIndex = Math.round(centerScrollPosition / itemHeight);
    const adjustedIndex = Math.max(0, Math.min(currentIndex, SIZES.length - 1));
    
    // Auto-select based on scroll position (centered item)
    const currentSize = SIZES[adjustedIndex];
    
    if (currentSize !== selectedSize) {
      setSelectedSize(currentSize);
    }
  };

  const handleScrollBegin = () => {
    setIsScrolling(true);
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
  };

  const handleScrollEnd = () => {
    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false);
    }, 150);
  };

  const handleOverlayPress = () => {
    onClose();
  };

  const handleDone = () => {
    // Ensure a size is selected before closing
    if (!selectedSize || !SIZES.includes(selectedSize)) {
      setSelectedSize(SIZES[0]); // Force select first size if none selected
    }
    onDone();
  };

  if (!visible) return null;

  return (
    <TouchableWithoutFeedback onPress={handleOverlayPress}>
      <View style={bagStyles.modalOverlay}>
        <TouchableWithoutFeedback onPress={() => {}}>
          <Animated.View 
            style={[
              bagStyles.modalContainer,
              {
                transform: [
                  { translateY: slideAnim },
                  { translateY: panY },
                  { scale: scaleAnim }
                ]
              }
            ]}
            {...panResponder.panHandlers}
          >
            <View style={bagStyles.dragHandle} />
            <View style={bagStyles.modalContentNoTitle}>
              
              <ScrollView 
                ref={scrollViewRef}
                style={bagStyles.quantityList} 
                contentContainerStyle={bagStyles.quantityListContent}
                showsVerticalScrollIndicator={false}
                decelerationRate="fast"
                scrollEventThrottle={16}
                bounces={true}
                bouncesZoom={false}
                onScroll={handleScroll}
                onScrollBeginDrag={handleScrollBegin}
                onScrollEndDrag={handleScrollEnd}
                onMomentumScrollBegin={handleScrollBegin}
                onMomentumScrollEnd={handleScrollEnd}
              >
                {/* Top spacer for centering */}
                <View style={bagStyles.scrollSpacer} />
                
                {SIZES.map((size, index) => {
                  const isSelected = selectedSize === size;
                  
                  return (
                    <TouchableOpacity
                      key={size}
                      style={[bagStyles.quantityOption]}
                      onPress={() => handleSizeSelect(size)}
                      activeOpacity={0.7}
                    >
                      <Animated.View
                        style={[
                          isSelected 
                            ? bagStyles.quantityOptionInnerFullWidthSelected 
                            : bagStyles.quantityOptionInnerFullWidth
                        ]}
                      >
                        <Animated.Text 
                          style={[
                            bagStyles.quantityOptionText,
                            isSelected && bagStyles.selectedQuantityOptionText,
                            isSelected && {
                              transform: [{
                                scale: highlightAnim.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: [1, 1.05], // Reduced scale for smoother animation
                                })
                              }]
                            }
                          ]}
                        >
                          {size}
                        </Animated.Text>
                      </Animated.View>
                    </TouchableOpacity>
                  );
                })}
                
                {/* Bottom spacer for centering */}
                <View style={bagStyles.scrollSpacer} />
              </ScrollView>
              
              {/* Size Chart Button */}
              <TouchableOpacity 
                style={bagStyles.sizeChartLink}
                onPress={onOpenSizeChart}
                activeOpacity={0.7}
              >
                <Text style={bagStyles.sizeChartText}>Size Chart</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={bagStyles.doneButton} 
                onPress={handleDone} 
                activeOpacity={0.8}
              >
                <Text style={bagStyles.doneButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SelectSizeBagModal;
