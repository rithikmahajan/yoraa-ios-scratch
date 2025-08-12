import React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

const RunningImageSvg = ({ width = 70, height = 70 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 70 70" fill="none">
      <Rect width="70" height="70" rx="8" fill="#F5F5F5" />
      <Path
        d="M25 30 L35 25 L45 30 L40 40 L30 40 Z"
        fill="#000000"
      />
    </Svg>
  );
};

export default RunningImageSvg;
