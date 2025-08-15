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
import { QUANTITIES } from '../constants/bagConstants';
import { bagStyles } from '../styles/bagStyles';

// Create full options array with Remove at the beginning
const ALL_OPTIONS = ['Remove', ...QUANTITIES];

const QuantityModal = ({
  visible,
  selectedQuantity,
  setSelectedQuantity,
  onDone,
  onClose,
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
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94), // Nike-style easing
        useNativeDriver: true, // Use native driver for better performance
      }).start();

      // Set initial selection to Remove and center it when modal opens
      setSelectedQuantity(0); // Set to Remove by default
      
      setTimeout(() => {
        if (scrollViewRef.current) {
          // Always start with Remove option centered
          const itemHeight = 60;
          const modalViewHeight = 200;
          const centerOffset = (modalViewHeight / 2) - (itemHeight / 2);
          const scrollOffset = (0 * itemHeight) - centerOffset; // Remove is at index 0
          
          scrollViewRef.current.scrollTo({
            y: Math.max(0, scrollOffset),
            animated: true,
          });
        }
      }, 350); // Wait for modal animation to complete
    }
  }, [visible, highlightAnim, setSelectedQuantity]);

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

  const handleOptionSelect = (option) => {
    if (isScrolling) return; // Prevent selection during scroll

    // Nike-style interaction feedback
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

    // Set quantity based on option
    const quantity = option === 'Remove' ? 0 : option;
    setSelectedQuantity(quantity);

    // Smooth scroll to center the selected item in the modal
    const itemIndex = ALL_OPTIONS.indexOf(option);
    if (itemIndex !== -1 && scrollViewRef.current) {
      const itemHeight = 60; // Item height
      const modalViewHeight = 200; // Height of the scrollable area
      const centerOffset = (modalViewHeight / 2) - (itemHeight / 2); // Center position
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
    const modalViewHeight = 200; // Height of the scrollable area
    const centerOffset = (modalViewHeight / 2) - (itemHeight / 2); // Center position
    
    // Calculate which item is in the center of the modal view
    const centerScrollPosition = contentOffset.y + centerOffset;
    const currentIndex = Math.round(centerScrollPosition / itemHeight);
    const adjustedIndex = Math.max(0, Math.min(currentIndex, ALL_OPTIONS.length - 1));
    
    // Auto-select based on scroll position (centered item)
    const currentOption = ALL_OPTIONS[adjustedIndex];
    const quantity = currentOption === 'Remove' ? 0 : currentOption;
    
    if (quantity !== selectedQuantity) {
      setSelectedQuantity(quantity);
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
                
                {ALL_OPTIONS.map((option, index) => {
                  const isSelected = (option === 'Remove' && selectedQuantity === 0) || 
                                   (option !== 'Remove' && selectedQuantity === option);
                  const isRemoveOption = option === 'Remove';
                  
                  return (
                    <TouchableOpacity
                      key={option}
                      style={[bagStyles.quantityOption]}
                      onPress={() => handleOptionSelect(option)}
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
                            isRemoveOption ? bagStyles.removeOptionText : bagStyles.quantityOptionText,
                            isSelected && !isRemoveOption && bagStyles.selectedQuantityOptionText,
                            isSelected && isRemoveOption && bagStyles.selectedRemoveOptionText,
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
                          {option}
                        </Animated.Text>
                      </Animated.View>
                    </TouchableOpacity>
                  );
                })}
                
                {/* Bottom spacer for centering */}
                <View style={bagStyles.scrollSpacer} />
              </ScrollView>
              
              <TouchableOpacity style={bagStyles.doneButton} onPress={onDone} activeOpacity={0.8}>
                <Text style={bagStyles.doneButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default QuantityModal;
