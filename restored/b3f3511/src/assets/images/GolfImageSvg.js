import React from 'react';
import Svg, { Rect, Circle, Line } from 'react-native-svg';

const GolfImageSvg = ({ width = 70, height = 70 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 70 70" fill="none">
      <Rect width="70" height="70" rx="8" fill="#F5F5F5" />
      <Circle cx="30" cy="40" r="3" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
      <Line x1="40" y1="25" x2="40" y2="45" stroke="#000000" strokeWidth="2" />
    </Svg>
  );
};

export default GolfImageSvg;
