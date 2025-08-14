import React from 'react';
import Svg, { Path, G, Defs, ClipPath, Rect } from 'react-native-svg';

// Global Forward Arrow Icon component based on the provided SVG design
// Props:
// - width: icon width (defaults to 14)
// - height: icon height (defaults to 14)
// - color: stroke color (defaults to black)
// - strokeWidth: stroke width (defaults to 2)
const ForwardArrowIcon = ({ 
  width = 14, 
  height = 14, 
  color = "black", 
  strokeWidth = 2 
}) => {
  return (
    <Svg 
      width={width} 
      height={height} 
      viewBox="0 0 14 14" 
      fill="none"
    >
      <G clipPath="url(#clip0_7049_14151)">
        <Path 
          d="M5.25 2.625L9.625 7L5.25 11.375" 
          stroke={color} 
          strokeWidth={strokeWidth} 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_7049_14151">
          <Rect width="14" height="14" fill="white"/>
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default ForwardArrowIcon;
