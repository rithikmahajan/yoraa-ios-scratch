import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

const ClearIcon = ({ width = 24, height = 24, color = '#000000' }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Circle
        cx="12"
        cy="12"
        r="10"
        fill={color}
        opacity="0.1"
      />
      <Path
        d="M15 9L9 15"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 9L15 15"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ClearIcon;
