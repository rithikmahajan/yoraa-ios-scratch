import { VALID_PROMO_CODES, DELIVERY_COST, POINTS_DISCOUNT } from '../constants/bagConstants';

export const calculateItemTotal = (items) => {
  return items.reduce((total, item) => total + ((Number(item.price) || 0) * item.quantity), 0);
};

export const calculateFinalTotal = (items, appliedPromoCode, pointsApplied) => {
  const itemTotal = calculateItemTotal(items);
  const promoDiscount = appliedPromoCode ? appliedPromoCode.discountAmount : 0;
  const pointsDiscount = pointsApplied ? POINTS_DISCOUNT : 0;
  
  return itemTotal + DELIVERY_COST - promoDiscount - pointsDiscount;
};

export const validatePromoCode = (code) => {
  return VALID_PROMO_CODES.includes(code.toUpperCase());
};

export const createPromoCodeObject = (code, itemTotal) => {
  const discountPercent = 30; // Could be configurable based on code
  return {
    code: code.toUpperCase(),
    discount: discountPercent,
    discountAmount: itemTotal * (discountPercent / 100)
  };
};

export const createCartItem = (product, routeSize) => {
  return {
    id: Date.now(),
    name: product?.name || 'Nike Everyday Plus Cushioned',
    description: product?.description || 'Training Ankle Socks',
    size: routeSize || 'M',
    color: product?.color || '(5 Pairs)',
    quantity: 1,
    price: Number(product?.price) || 10.00,
    image: product?.image || null,
  };
};
