import { Animated } from 'react-native';
import { 
  MODAL_ANIMATION_DURATION, 
  SCREEN_HEIGHT 
} from '../constants/bagConstants';

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
      duration: MODAL_ANIMATION_DURATION,
      useNativeDriver: true,
    })
  ];

  if (opacityAnim) {
    animations.push(
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: MODAL_ANIMATION_DURATION,
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
