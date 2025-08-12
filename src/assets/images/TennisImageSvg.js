import React from 'react';
import Svg, { Rect, Ellipse, Line } from 'react-native-svg';

const TennisImageSvg = ({ width = 70, height = 70 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 70 70" fill="none">
      <Rect width="70" height="70" rx="8" fill="#F5F5F5" />
      <Ellipse cx="35" cy="35" rx="8" ry="4" fill="none" stroke="#000000" strokeWidth="2" />
      <Line x1="25" y1="35" x2="45" y2="35" stroke="#000000" strokeWidth="2" />
    </Svg>
  );
};

export default TennisImageSvg;
