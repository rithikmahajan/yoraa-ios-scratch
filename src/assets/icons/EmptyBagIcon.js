import React from 'react';
import Svg, { Path } from 'react-native-svg';

const EmptyBagIcon = ({ width = 40, height = 40, color = '#000000' }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      {/* Shopping bag body */}
      <Path 
        d="M5 7H19L18 19H6L5 7Z" 
        stroke={color} 
        strokeWidth="1.5" 
        fill="none" 
        strokeLinejoin="round"
      />
      
      {/* Shopping bag handles */}
      <Path 
        d="M9 7V5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7" 
        stroke={color} 
        strokeWidth="1.5" 
        fill="none" 
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default EmptyBagIcon;
