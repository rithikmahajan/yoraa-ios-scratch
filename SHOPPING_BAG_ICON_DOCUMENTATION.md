# Global Shopping Bag Icon Usage

## Overview
The ShoppingBagIconSvg has been set as the global shopping bag icon throughout the Yoraa app, ensuring consistency across all shopping cart/bag related UI elements.

## Available Components

### 1. ShoppingBagIconSvg (Base Component)
- **Location**: `src/assets/icons/ShoppingBagIconSvg.js`
- **Purpose**: Core SVG component with exact Figma design
- **Default Size**: 23x23px
- **Usage**: Direct import when you need the raw SVG component

```javascript
import ShoppingBagIconSvg from '../assets/icons/ShoppingBagIconSvg';

<ShoppingBagIconSvg width={23} height={23} color="#000000" />
```

### 2. GlobalShoppingBagIcon (Recommended)
- **Location**: `src/assets/icons/GlobalShoppingBagIcon.js`
- **Purpose**: Centralized wrapper component for consistent usage
- **Default Size**: 23x23px
- **Usage**: Recommended for all new implementations

```javascript
import { GlobalShoppingBagIcon } from '../assets/icons';

<GlobalShoppingBagIcon width={23} height={23} color="#000000" />
```

### 3. GlobalCartIcon (Floating Action Button)
- **Location**: `src/components/GlobalCartIcon.js`
- **Purpose**: Floating cart button with shadow and background
- **Usage**: Product lists, collection screens

```javascript
import GlobalCartIcon from '../components/GlobalCartIcon';

<GlobalCartIcon size={20} color="#000000" onPress={handleCartPress} />
```

## Updated Components

The following components have been updated to use the new global shopping bag icon:

1. **HomeScreen** - Header navigation icon
2. **GlobalCartIcon** - Floating action button
3. **ProductDetail** - Cart icon in floating button
4. **EmptyBagIcon** - Consistent styling for empty states

## Icon Specifications

- **Viewbox**: 0 0 23 23
- **Stroke Width**: 1.5px
- **Style**: Outline/stroke design
- **Based on**: Figma design (node-id=533-7825)
- **Color**: Dynamic via props (default: #000000)

## Migration Notes

All existing cart/shopping bag icons have been updated to use the new unified design. The icon now provides:

- ✅ Consistent visual design across the app
- ✅ Figma-accurate specifications
- ✅ Proper SVG structure with clipPath
- ✅ Scalable and customizable
- ✅ Centralized maintenance point
