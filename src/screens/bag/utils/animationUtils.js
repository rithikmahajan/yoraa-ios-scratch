import { Animated, Easing } from 'react-native';
import { 
  MODAL_ANIMATION_DURATION, 
  SCREEN_HEIGHT 
} from '../constants/bagConstants';

// Nike-style easing curves
export const NIKE_EASE_OUT = Easing.bezier(0.25, 0.46, 0.45, 0.94);
export const NIKE_EASE_IN_OUT = Easing.bezier(0.42, 0, 0.58, 1);
export const NIKE_BOUNCE = Easing.bezier(0.68, -0.55, 0.265, 1.55);

export const createModalAnimations = () => {
  return {
    quantitySlideAnim: new Animated.Value(SCREEN_HEIGHT),
    sizeSlideAnim: new Animated.Value(SCREEN_HEIGHT),
    sizeChartSlideAnim: new Animated.Value(SCREEN_HEIGHT),
    promoSuccessSlideAnim: new Animated.Value(SCREEN_HEIGHT),
    promoSuccessOpacityAnim: new Animated.Value(0),
    quantityPanY: new Animated.Value(0),
    sizePanY: new Animated.Value(0),
    sizeChartPanY: new Animated.Value(0),
  };
};

export const animateModalOpen = (slideAnim, opacityAnim = null) => {
  const animations = [
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: MODAL_ANIMATION_DURATION + 50, // Slightly longer for smoothness
      easing: NIKE_EASE_OUT,
      useNativeDriver: true,
    })
  ];

  if (opacityAnim) {
    animations.push(
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: MODAL_ANIMATION_DURATION,
        easing: NIKE_EASE_IN_OUT,
        useNativeDriver: true,
      })
    );
  }

  return Animated.parallel(animations);
};

export const animateModalClose = (slideAnim, opacityAnim = null) => {
  const animations = [
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT,
      duration: MODAL_ANIMATION_DURATION,
      easing: NIKE_EASE_IN_OUT,
      useNativeDriver: true,
    })
  ];

  if (opacityAnim) {
    animations.push(
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: MODAL_ANIMATION_DURATION,
        useNativeDriver: true,
      })
    );
  }

  return Animated.parallel(animations);
};

export const createSwipeAnimations = (items) => {
  const animations = {};
  const states = {};
  
  items.forEach(item => {
    animations[item.id] = {
      translateX: new Animated.Value(0),
      opacity: new Animated.Value(1),
    };
    states[item.id] = {
      isSwipedLeft: false,
      isDeleting: false,
    };
  });
  
  return { animations, states };
};
