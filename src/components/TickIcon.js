import React from 'react';
import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg';

const TickIcon = ({ 
  size = 10, 
  color = '#111111',
  style
}) => {
  return (
    <Svg 
      width={size} 
      height={(size * 8) / 10} 
      viewBox="0 0 10 8" 
      fill="none"
      style={style}
    >
      <G clipPath="url(#clip0_7406_16495)">
        <Path 
          fillRule="evenodd" 
          clipRule="evenodd" 
          d="M3.63121 4.68626L1.67606 2.73415L0.111328 4.2959L3.63128 7.81037L9.88911 1.56229L8.32437 0L3.63121 4.68626Z" 
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_7406_16495">
          <Rect width="9.77778" height="8" fill="white" transform="translate(0.111328)"/>
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default TickIcon;
