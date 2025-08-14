import React from 'react';
import Svg, { Rect } from 'react-native-svg';

const SaleImageSvg = ({ width = 70, height = 70 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 70 70" fill="none">
      <Rect width="70" height="70" rx="8" fill="#F5F5F5" />
      <Rect x="20" y="28" width="30" height="14" rx="2" fill="#CA3327" />
    </Svg>
  );
};

export default SaleImageSvg;
