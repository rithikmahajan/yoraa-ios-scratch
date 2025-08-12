import React from 'react';
import Svg, { Path } from 'react-native-svg';

const CartIconSvg = ({ width = 24, height = 24, color = '#000000' }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 19 17" fill="none">
      <Path
        d="M16.6934 0.75L17.4482 16.0771H0.788086L1.54297 0.75H16.6934Z"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      <Path
        d="M1 9.55073L1 5.14463C1 4.0454 1.43666 2.9912 2.21393 2.21393C2.9912 1.43666 4.04541 1 5.14463 1C6.24385 1 7.29806 1.43666 8.07533 2.21393C8.85259 2.9912 9.28926 4.0454 9.28926 5.14463V9.55073"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
    </Svg>
  );
};

export default CartIconSvg;
