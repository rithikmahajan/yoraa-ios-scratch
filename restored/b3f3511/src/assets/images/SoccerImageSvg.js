import React from 'react';
import Svg, { Rect, Circle } from 'react-native-svg';

const SoccerImageSvg = ({ width = 70, height = 70 }) => {
  return (
    <Svg width={width} height={width} viewBox="0 0 70 70" fill="none">
      <Rect width="70" height="70" rx="8" fill="#F5F5F5" />
      <Circle cx="35" cy="35" r="10" fill="none" stroke="#000000" strokeWidth="2" />
      <Circle cx="35" cy="35" r="3" fill="#000000" />
    </Svg>
  );
};

export default SoccerImageSvg;
