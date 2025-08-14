import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

const GlobalShippingIcon = ({ width = 80, height = 80, color = '#000000' }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 80 80" fill="none">
      <G>
        {/* Package box */}
        <Path
          d="M20 35L40 25L60 35L60 55C60 57 58 58 56 58L24 58C22 58 20 57 20 55L20 35Z"
          stroke={color}
          strokeWidth="2"
          fill="none"
        />
        {/* Box top lines */}
        <Path
          d="M20 35L40 45L60 35"
          stroke={color}
          strokeWidth="2"
          fill="none"
        />
        <Path
          d="M40 45L40 58"
          stroke={color}
          strokeWidth="2"
          fill="none"
        />
        {/* Globe lines */}
        <Path
          d="M40 15C47 15 52 20 52 27C52 34 47 39 40 39C33 39 28 34 28 27C28 20 33 15 40 15Z"
          stroke={color}
          strokeWidth="2"
          fill="none"
        />
        <Path
          d="M40 15L40 39"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
        />
        <Path
          d="M28 27L52 27"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
        />
        <Path
          d="M32 20C35 22 37 25 37 27C37 29 35 32 32 34"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
        />
        <Path
          d="M48 20C45 22 43 25 43 27C43 29 45 32 48 34"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
        />
      </G>
    </Svg>
  );
};

export default GlobalShippingIcon;
