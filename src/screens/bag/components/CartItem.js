import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  PanResponder,
} from 'react-native';
import { bagStyles } from '../styles/bagStyles';
import { 
  SWIPE_THRESHOLD, 
  SWIPE_DISTANCE, 
  DELETE_ANIMATION_DISTANCE,
  DELETE_ANIMATION_DURATION 
} from '../constants/bagConstants';

const CartItem = ({
  item,
  index,
  animation,
  swipeState,
  onQuantityPress,
  onSizePress,
  onDelete,
  swipeAnimations,
  swipeStates,
  resetSwipe,
}) => {
  const createSwipePanResponder = (itemId) => {
    return PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > 10 && Math.abs(gestureState.dy) < 50;
      },
      onPanResponderGrant: () => {
        // Reset other items when starting a new swipe
        Object.keys(swipeAnimations).forEach(id => {
          if (id !== itemId.toString() && swipeStates[id]?.isSwipedLeft) {
            resetSwipe(id);
          }
        });
      },
      onPanResponderMove: (evt, gestureState) => {
        const { dx } = gestureState;
        const itemAnimation = swipeAnimations[itemId];
        
        if (itemAnimation && dx < 0) { // Only allow left swipe
          const translateX = Math.max(dx, -SWIPE_DISTANCE);
          itemAnimation.translateX.setValue(translateX);
          
          // Fade the item as it's swiped
          const opacity = 1 - Math.abs(translateX) / SWIPE_DISTANCE * 0.3;
          itemAnimation.opacity.setValue(Math.max(opacity, 0.7));
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        const { dx } = gestureState;
        const itemAnimation = swipeAnimations[itemId];
        
        if (itemAnimation && dx < -SWIPE_THRESHOLD) {
          // Snap to delete position
          Animated.parallel([
            Animated.spring(itemAnimation.translateX, {
              toValue: -SWIPE_DISTANCE,
              useNativeDriver: true,
              tension: 150,
              friction: 8,
            }),
            Animated.spring(itemAnimation.opacity, {
              toValue: 0.7,
              useNativeDriver: true,
              tension: 150,
              friction: 8,
            })
          ]).start();
        } else {
          // Snap back to original position
          resetSwipe(itemId);
        }
      },
    });
  };

  const handleDelete = (itemId) => {
    const itemAnimation = swipeAnimations[itemId];
    if (itemAnimation) {
      // Animate item deletion
      Animated.parallel([
        Animated.timing(itemAnimation.translateX, {
          toValue: -DELETE_ANIMATION_DISTANCE,
          duration: DELETE_ANIMATION_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(itemAnimation.opacity, {
          toValue: 0,
          duration: DELETE_ANIMATION_DURATION,
          useNativeDriver: true,
        })
      ]).start(() => {
        onDelete(itemId);
      });
    }
  };

  if (!animation || !swipeState) {
    return null; // Item is being deleted or animations not ready
  }

  return (
    <View style={bagStyles.cartItemContainer}>
      {/* Delete Button Background */}
      <View style={bagStyles.deleteButtonContainer}>
        <TouchableOpacity 
          style={bagStyles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={bagStyles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
      
      {/* Cart Item */}
      <Animated.View 
        style={[
          bagStyles.cartItem,
          {
            transform: [{ translateX: animation.translateX }],
            opacity: animation.opacity,
          }
        ]}
        {...createSwipePanResponder(item.id).panHandlers}
      >
        {/* Product Row */}
        <View style={bagStyles.productRow}>
          <View style={bagStyles.itemImageContainer}>
            {item.image ? (
              <Image source={item.image} style={bagStyles.itemImage} />
            ) : (
              <View style={bagStyles.itemImagePlaceholder}>
                <Text style={bagStyles.placeholderText}>👟</Text>
              </View>
            )}
          </View>
          <View style={bagStyles.itemDetails}>
            <Text style={bagStyles.itemName}>{item.name}</Text>
            <Text style={bagStyles.itemDescription}>{item.description}</Text>
            <Text style={bagStyles.itemSize}>{item.size}</Text>
          </View>
        </View>
        
        {/* Controls Row */}
        <View style={bagStyles.itemControls}>
          <TouchableOpacity 
            style={bagStyles.quantityContainer}
            onPress={() => onQuantityPress(index)}
          >
            <Text style={bagStyles.quantityText}>Qty {item.quantity}</Text>
            <Text style={bagStyles.dropdownIcon}>▼</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={bagStyles.sizeContainer}
            onPress={() => onSizePress(index)}
          >
            <Text style={bagStyles.sizeText}>{item.size.split(' ')[0]}</Text>
            <Text style={bagStyles.dropdownIcon}>▼</Text>
          </TouchableOpacity>
          
          <Text style={bagStyles.itemPrice}>US${(Number(item.price) || 0).toFixed(2)}</Text>
        </View>
      </Animated.View>
    </View>
  );
};

export default CartItem;
