import React from 'react';
import Svg, { Rect, Circle } from 'react-native-svg';

const LifestyleImageSvg = ({ width = 70, height = 70 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 70 70" fill="none">
      <Rect width="70" height="70" rx="8" fill="#F5F5F5" />
      <Circle cx="35" cy="35" r="8" fill="#000000" />
    </Svg>
  );
};

export default LifestyleImageSvg;
