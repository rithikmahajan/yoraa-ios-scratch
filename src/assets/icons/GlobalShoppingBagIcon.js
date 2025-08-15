// Global Shopping Bag Icon - Centralized component for all shopping bag/cart usages
import React from 'react';
import ShoppingBagIconSvg from './ShoppingBagIconSvg';

/**
 * Global Shopping Bag Icon Component
 * 
 * This is the centralized shopping bag icon used throughout the app.
 * It provides a consistent design based on the Figma specifications.
 * 
 * Usage Examples:
 * - Header navigation icons
 * - Floating action buttons
 * - Empty bag states
 * - Product detail pages
 * - Global cart components
 * 
 * @param {number} width - Icon width (default: 23)
 * @param {number} height - Icon height (default: 23) 
 * @param {string} color - Icon color (default: '#000000')
 */
const GlobalShoppingBagIcon = ({ 
  width = 23, 
  height = 23, 
  color = '#000000' 
}) => {
  return (
    <ShoppingBagIconSvg 
      width={width} 
      height={height} 
      color={color} 
    />
  );
};

export default GlobalShoppingBagIcon;
