import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

const ScanBarcodeIcon = ({ width = 24, height = 24, color = '#000000' }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      {/* Corner brackets for scanner frame */}
      <Path
        d="M9 3H6C4.89543 3 4 3.89543 4 5V8"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15 3H18C19.1046 3 20 3.89543 20 5V8"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 21H6C4.89543 21 4 20.1046 4 19V16"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15 21H18C19.1046 21 20 20.1046 20 19V16"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* QR code pattern */}
      <Rect x="8" y="8" width="2" height="2" fill={color} />
      <Rect x="8" y="11" width="2" height="2" fill={color} />
      <Rect x="8" y="14" width="2" height="2" fill={color} />
      <Rect x="11" y="8" width="2" height="2" fill={color} />
      <Rect x="14" y="8" width="2" height="2" fill={color} />
      <Rect x="11" y="11" width="2" height="2" fill={color} />
      <Rect x="14" y="11" width="2" height="2" fill={color} />
      <Rect x="11" y="14" width="2" height="2" fill={color} />
      <Rect x="14" y="14" width="2" height="2" fill={color} />
    </Svg>
  );
};

export default ScanBarcodeIcon;
