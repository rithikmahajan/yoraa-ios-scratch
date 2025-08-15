import React from 'react';
import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg';

const HeartIcon = ({ size = 21, color = '#000000', filled = false }) => {
  const strokeColor = color;
  const fillColor = filled ? color : 'none';
  
  return (
    <Svg width={size} height={size} viewBox="0 0 21 21" fill="none">
      <G clipPath="url(#clip0_10150_70)">
        <Path 
          d="M10.4999 17.7793L17.2759 10.9063C17.987 10.1952 18.3865 9.23075 18.3865 8.22509C18.3865 7.21942 17.987 6.25495 17.2759 5.54384C16.5647 4.83273 15.6003 4.43323 14.5946 4.43323C13.5889 4.43323 12.6245 4.83273 11.9134 5.54384L10.4999 6.8602L9.08651 5.54384C8.3754 4.83273 7.41093 4.43323 6.40526 4.43323C5.3996 4.43323 4.43513 4.83273 3.72401 5.54384C3.0129 6.25495 2.6134 7.21942 2.6134 8.22509C2.6134 9.23075 3.0129 10.1952 3.72401 10.9063L10.4999 17.7793Z" 
          stroke={strokeColor} 
          fill={fillColor}
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_10150_70">
          <Rect width="19.4118" height="19.4118" fill="white" transform="translate(0.794067 0.794067)"/>
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default HeartIcon;
