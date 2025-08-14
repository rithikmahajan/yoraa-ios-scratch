import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

const RiskFreePurchaseIcon = ({ width = 80, height = 80, color = '#000000' }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 80 80" fill="none">
      <G>
        {/* Arrow circle */}
        <Path
          d="M40 58C50 58 58 50 58 40C58 30 50 22 40 22C30 22 22 30 22 40C22 50 30 58 40 58Z"
          stroke={color}
          strokeWidth="2"
          fill="none"
        />
        {/* Return arrow */}
        <Path
          d="M32 35L27 40L32 45"
          stroke={color}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M27 40L48 40"
          stroke={color}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M48 35L53 40L48 45"
          stroke={color}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Shield outline */}
        <Path
          d="M40 15L35 18C35 18 35 25 35 30C35 35 40 40 40 40C40 40 45 35 45 30C45 25 45 18 45 18L40 15Z"
          stroke={color}
          strokeWidth="2"
          fill="none"
        />
      </G>
    </Svg>
  );
};

export default RiskFreePurchaseIcon;
