import { Dimensions } from 'react-native';

export const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const SWIPE_THRESHOLD = 60;
export const SWIPE_DISTANCE = 120;
export const DELETE_ANIMATION_DISTANCE = 400;

export const MODAL_ANIMATION_DURATION = 250;
export const DELETE_ANIMATION_DURATION = 300;

export const VALID_PROMO_CODES = ['FIRST30', '30OFF', 'WELCOME'];

export const SIZES = ['XS', 'S', 'M', 'L', 'XL'];
export const QUANTITIES = [1, 2, 3, 4];

export const SIZE_CHART_DATA = [
  { size: 'S', waist: '71.1', inseam: '70.1' },
  { size: 'M', waist: '71.1', inseam: '70.1' },
  { size: 'L', waist: '71.1', inseam: '70.1' },
  { size: 'XL', waist: '71.1', inseam: '70.1' },
  { size: 'XXL', waist: '71.1', inseam: '70.1' },
];

export const DELIVERY_COST = 200;
export const POINTS_DISCOUNT = 5.00;
