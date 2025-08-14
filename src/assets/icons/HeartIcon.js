import React from 'react';
import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg';

const HeartIcon = ({ size = 34, color = '#000000', filled = false }) => {
  const strokeColor = color;
  const fillColor = filled ? color : 'none';
  
  return (
    <Svg width={size} height={size} viewBox="0 0 34 34" fill="none">
      <G clipPath="url(#clip0_6844_10168)">
        <Path 
          d="M16.9995 24.5L23.9808 17.4188C24.7134 16.6861 25.1251 15.6924 25.1251 14.6563C25.1251 13.6201 24.7134 12.6264 23.9808 11.8938C23.2481 11.1611 22.2544 10.7495 21.2183 10.7495C20.1821 10.7495 19.1884 11.1611 18.4558 11.8938L16.9995 13.25L15.5433 11.8938C14.8106 11.1611 13.8169 10.7495 12.7808 10.7495C11.7446 10.7495 10.7509 11.1611 10.0183 11.8938C9.28563 12.6264 8.87402 13.6201 8.87402 14.6563C8.87402 15.6924 9.28563 16.6861 10.0183 17.4188L16.9995 24.5Z" 
          stroke={strokeColor} 
          fill={fillColor}
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_6844_10168">
          <Rect width="20" height="20" fill="white" transform="translate(7 7)"/>
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default HeartIcon;
